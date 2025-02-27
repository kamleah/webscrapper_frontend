import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { editMovableCustomized, editStoreProduct, getMovableCustomized, getStoreProduct, getUserStoreProduct } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import { setFlexiStoreList } from '../../../redux/PartnerSlices/flexiStoreSlice';
import { setMovableCustomized } from '../../../redux/PartnerSlices/storeMoveSlice';


export default function StoreMoveCustomizedModal(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    // =================== Fetch Store Product List =========================
    const movableCustomizedList = () => {
        getMovableCustomized().then(res => {
            dispatch(setMovableCustomized(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        setLoader(true);
        try {
            editMovableCustomized(props?.data?.id, data).then((res) => {
                if (res?.message === 'Data edited successfully') {
                    movableCustomizedList()
                    setLoader(false);
                    toggle();
                    reset();
                    toast.success(res?.message);
                }
            })
        } catch (error) {
            setLoader(false);
            console.log(error);
        }

    }

    // ================= close modal  ===============
    const closeBtn = () => {
        setLoader(false);
        toggle();
    }

    // ================ Reset data into the form  =====================
    useMemo(() => {
        reset({
            'status': props?.data?.status,
        })
    }, [props.data])

    useEffect(() => {
        if (props.button == "edit") {
            movableCustomizedList()
        }
    }, [])

    return (
        <>
            <button
                onClick={toggle}
                className="bg-yellow-100 px-1.5 py-2 rounded-sm"><Edit size="20" className='text-yellow-500' />
            </button>
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
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-orange-500 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 overflow-y-scroll scrollbars " >
                                                <div className="mx-4 grid grid-cols-1  customBox">
                                                    <div className="">
                                                        <select
                                                            name="status"
                                                            className={inputClass}
                                                            {...register("status", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Status
                                                            </option>
                                                            <option value="Accept">Accept</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Denied">Denied</option>
                                                        </select>
                                                        {errors.status && <Error title='Status is required*' />}
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