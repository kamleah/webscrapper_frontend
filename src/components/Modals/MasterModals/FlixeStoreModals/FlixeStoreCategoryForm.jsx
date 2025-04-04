import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { useForm } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createStoreCategory, editStoreCategory, getStoreCategory } from '../../../../api';
import { useDispatch } from 'react-redux';
import { setStoreCategory } from '../../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import LoadBox from '../../../Loader/LoadBox';
import Error from '../../../Errors/Error';
import { ImageUpload, storeproductLink } from '../../../../env';


export default function FlixeStoreCategoryForm(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // ========================= fetch data from api ==============================
    const StoreCategoryList = () => {
        getStoreCategory().then(res => {
            dispatch(setStoreCategory(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ============================ submit data  =====================================
    const onSubmit = async (data) => {
        if (props?.button !== 'edit') {
            try {
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "storeproduct", "product", data.name)
                    data.image = `${storeproductLink}${data.name}_product_${data.image[0].name}`
                } else {
                    data.image = ''
                }
                setLoader(true)
                createStoreCategory(data).then((res) => {
                    if (res?.message === "Data added successfully") {
                        setTimeout(() => {
                            dispatch(setStoreCategory(res));
                            reset();
                            toggle(),
                                setLoader(false),
                                StoreCategoryList()
                            toast.success(res.message);
                        }, 1000)
                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        } else {
            try {
                if (data.image.length != 0) {
                    ImageUpload(data.image[0], "storecategory", "cat", data.name)
                    data.image = `${storeproductLink}${data.name}_product_${data.image[0].name}`
                } else {
                    data.image = props.data.image
                }
                setLoader(true);
                editStoreCategory(props?.data?.id, data).then((res) => {
                    if (res?.message === "Data edited successfully") {
                        setTimeout(() => {
                            dispatch(setStoreCategory(res));
                            reset();
                            toggle(),
                                setLoader(false),
                                StoreCategoryList()
                            toast.success(res.message);
                        }, 1000)

                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        }

    }

    // ============================ close modals ==========================================
    const closeBtn = () => {
        toggle();
        setLoader(false);
    }

    // =========================== Reset data into the form  ==============================
    useMemo(() => {
        reset({
            'name': props?.data?.name
        })
    }, [props.data])


    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Store Category
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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-orange-500 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 mx-4 grid grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Name'
                                                        autoComplete='off'
                                                        className={inputClass}
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && <Error title='Name is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} htmlFor="main_input">Image*</label>
                                                    <input className={fileinput}
                                                        id="main_input"
                                                        type='file'
                                                        multiple
                                                        accept='image/jpeg,image/jpg,image/png'
                                                        placeholder='Upload Images...'
                                                        {...register("image", { required: props.button == 'edit' ? false : true })} />
                                                    {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary'>
                                                        {props?.data?.image?.split('/').pop()}
                                                    </label>}
                                                    {errors.image && <Error title='Main Image is required*' />}
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
