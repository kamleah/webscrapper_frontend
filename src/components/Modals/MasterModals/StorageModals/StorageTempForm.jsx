import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { useForm, } from "react-hook-form";
import { Edit } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { createTemperature, editTemperature, getTemperature } from '../../../../api';
import { useDispatch } from 'react-redux';
import { setTempRange } from '../../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import LoadBox from '../../../Loader/LoadBox';
import Error from '../../../Errors/Error';


export default function StorageTempForm(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // ============================= fetch data  ===================================
    const TempRangeList = () => {
        getTemperature().then(res => {
            dispatch(setTempRange(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ============================= submit data  ====================================
    const onSubmit = async (data) => {
        if (props.button !== 'edit') {
            try {
                setLoader(true)
                createTemperature(data).then((res) => {
                    if (res.message === "Data added successfully") {
                        setTimeout(() => {
                            dispatch(setTempRange(res))
                            setLoader(false);
                            reset();
                            toggle();
                            toast.success(res.message);
                            TempRangeList();
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
                editTemperature(props?.data?.id, data).then((res) => {
                    if (res.message === "Data edited successfully") {
                        setTimeout(() => {
                            dispatch(setTempRange(res))
                            setLoader(false);
                            reset();
                            toggle();
                            toast.success(res.message);
                            TempRangeList();
                        }, 1000);
                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        }
    }

    // ============================= close modal  =====================================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }
    // ============================= Reset data into the form  =========================
    useMemo(() => {
        reset({
            'name': props?.data?.name
        })
    }, [props.data])
    return (
        <>

            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Temperature Capability
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
                                            <div className="py-4 mx-4 grid grid-cols-1  gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Temperature Capability*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Temperature Name'
                                                        className={inputClass}
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && <Error title='Temperature Capability is required*' />}
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
