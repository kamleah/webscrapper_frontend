import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { useForm, } from "react-hook-form";
import { Edit } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { createProduct, editProduct, getProduct } from '../../../../api';
import { useDispatch } from 'react-redux';
import { setProductNames } from '../../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import LoadBox from '../../../Loader/LoadBox';
import Error from '../../../Errors/Error';


export default function StorageProductForm(props) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // ============================== fetch data  ===============================
    const ProductList = () => {
        getProduct().then(res => {
            dispatch(setProductNames(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ============================== submit data  ==============================
    const onSubmit = async (data) => {
        if (props?.button !== 'edit') {
            try {
                setLoader(true)
                createProduct(data).then((res) => {
                    if (res.message === "Data added successfully") {
                        setTimeout(() => {
                            dispatch(setProductNames(res))
                            setLoader(false);
                            toggle();
                            reset();
                            toast.success(res.message);
                            ProductList()
                        }, 1000);
                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        } else {
            try {
                setLoader(true);
                editProduct(props?.data?.id, data).then((res) => {
                    if (res.message === "Data edited successfully") {
                        setTimeout(() => {
                            dispatch(setProductNames(res))
                            setLoader(false);
                            toggle();
                            reset();
                            toast.success(res.message);
                            ProductList()
                        }, 1000);
                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        }
    }
    // ============================== close modal  ==============================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }
    // ============================= Reset data into the form  ===================
    useMemo(() => {
        reset({
            'name': props?.data?.name,
            'type': props?.data?.type,
        })
    }, [props.data])
    return (
        <>

            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Product
                </button>
            ) : (
                <button
                    onClick={toggle}
                    className="bg-yellow-100 px-1.5 py-2 rounded-sm"><Edit size="20" className='text-yellow-500' />
                </button>
            )}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={() => toggle}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto scrollbars">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-orange-500 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 mx-4 grid grid-cols-2  gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Product Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Product Name'
                                                        className={inputClass}
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && <Error title='Product Name is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Product Type*
                                                    </label>
                                                    <select
                                                        name="Product Type"
                                                        className={inputClass}
                                                        {...register("type", { required: true })}
                                                    >
                                                        <option value="" >
                                                            Select Product Type
                                                        </option>
                                                        <option value="Both">Both</option>
                                                        <option value="Veg">Veg</option>
                                                        <option value="Non-Veg">Non-Veg</option>
                                                    </select>
                                                    {errors.type && <Error title='Product Type is required*' />}
                                                </div>
                                            </div>
                                            <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-orange-500 hover:bg-orange-500 capitalize" title='Submitting' /> : <button type='submit' className={formBtn1}>submit</button>}
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
