import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createMovablePrice, editMovablePrice, getAllMovablePrice } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import { setMovablePrice } from '../../../redux/PartnerSlices/storeMoveSlice';


export default function MovablePriceForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    // ================= Store Product data  ===============================
    const movablePriceList = () => {
        getAllMovablePrice().then(res => {
            dispatch(setMovablePrice(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        setLoader(true)
        try {
            if (props.button == 'edit') {
                editMovablePrice(props?.data?.id, data).then((res) => {
                    if (res?.message === 'Data edited successfully') {
                        movablePriceList()
                        toggle();
                        reset();
                        toast.success(res?.message);
                        setLoader(false);
                    }
                })
            } else {
                if (user.role == 'partner') {
                    data.user = user?.userid
                    createMovablePrice(data).then((res) => {
                        if (res?.message === 'Data added successfully') {
                            movablePriceList()
                            toggle();
                            reset();
                            toast.success(res?.message);
                            setLoader(false);
                        }
                    })
                }
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }

    }

    // ================= close modal  ===============
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }

    // =========================== Reset data into the form  ==============================
    useMemo(() => {
        reset({
            'product_name': props?.data?.product_name,
            "price": props?.data?.price,
            "empty_weight": props?.data?.empty_weight,
            "capacity": props?.data?.capacity,
            "width": props?.data?.width,
            "length": props?.data?.length,
            "height": props?.data?.height,
        })
    }, [props.data])

    useEffect(() => {
        reset({
            "product_name": "",
            "price": "",
            "empty_weight": "",
            "capacity": "",
            "width": "",
            "length": "",
            "height": ""
        })
    }, [])
    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Movable Price
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
                    <div className="fixed inset-0 ">
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
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-orange-500 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className=" py-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Product Name'
                                                            className={inputClass}
                                                            {...register('product_name', { required: true })}
                                                        />
                                                        {errors.product_name && <Error title='Product Name is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Price*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Price'
                                                            className={inputClass}
                                                            {...register('price', { required: true })}
                                                        />
                                                        {errors.price && <Error title='Price is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Empty Weight *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Empty Weight'
                                                            className={inputClass}
                                                            {...register('empty_weight', { required: true })}
                                                            step={0.01}
                                                        />
                                                        {errors.empty_weight && <Error title='Empty Weight is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            capacity *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Capacity (Ltr)'
                                                            className={inputClass}
                                                            {...register('capacity', { required: true })}
                                                        />
                                                        {errors.capacity && <Error title='capacity is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Width *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Width'
                                                            className={inputClass}
                                                            {...register('width', { required: true })}
                                                        />
                                                        {errors.width && <Error title='Width is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Height *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Height'
                                                            className={inputClass}
                                                            {...register('height', { required: true })}
                                                        />
                                                        {errors.height && <Error title='Height is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Length *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Length'
                                                            className={inputClass}
                                                            {...register('length', { required: true })}
                                                        />
                                                        {errors.length && <Error title='length is required*' />}
                                                    </div>
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