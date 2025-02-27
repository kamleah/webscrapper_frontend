import { Dialog, Transition } from '@headlessui/react';
import { Edit } from 'iconsax-react';
import { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAdmin, createSport, createSuperAdmin, editSport, individualUserDetailsUpdate } from '../../../api';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';


export default function SportsForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);

    const refreshList = () => {
        if(props.refreshHandler){
            props.refreshHandler()
        }
    }


    // ================= submit data  ===============================
    const onSubmit = async (formData) => {
        try {
            if (props.button == 'edit') {
                const formattedPayload = {
                    ...props?.data, ...formData
                    }
                    editSport(props?.data?.id, formattedPayload).then((res) => {
                    if (res?.status === 'success') {
                        refreshList()
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            } else {
                if (user.role == 'SUPER_ADMIN') {
                    const formattedPayload = {
                        ...formData
                    }
                    createSport(formattedPayload).then((res) => {
                            if (res?.status === 'success') {
                                refreshList()
                                toggle();
                                reset();
                                toast.success(res?.message);
                            }
                        })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ================= close modal  ===============
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }

    useMemo(() => {
        reset({
            'sport_name': props?.data?.sport_name,
        })
    }, [props.data])

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Create Sport
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
                                            <div className="py-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Sport Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Sport Name'
                                                            className={inputClass}
                                                            {...register('sport_name', { required: true })}
                                                        />
                                                        {errors.sport_name && <Error title='Sport Name is required*' />}
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