import { CloseSquare } from "iconsax-react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass, labelClass } from "../../utils/CustomClass";
import Error from "../Errors/Error";
import LoadBox from "../Loader/LoadBox";


export default function CreateUserModal({ isOpen,onUserCreated, toggle, props = {} }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loader, setLoader] = useState(false)
    const onSubmit = (data) => {
        const newUser = { id: data.length + 1, ...data };
        onUserCreated(newUser);
        reset(); 
        toggle();
    };
    return (
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
                                    as="div"
                                    className="flex items-center justify-between bg-blue-500 text-white p-4"
                                >
                                    <h3 className="text-lg font-medium">Create User</h3>
                                    <CloseSquare
                                        size={24}
                                        color="white"
                                        className="cursor-pointer"
                                        onClick={toggle}
                                    />
                                </Dialog.Title>
                                <div className=" bg-gray-200/70 ">
                                    {/* React Hook Form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="py-4 overflow-y-scroll scrollbars " >
                                            <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Email Address*
                                                    </label>
                                                    <input
                                                        type="email"
                                                        disabled={props?.button === 'edit'}
                                                        placeholder='Email Address'
                                                        className={`${inputClass} ${props?.button === 'edit' ? 'text-gray-300' : ''}`}
                                                        {...register('email', { required: true })}
                                                    />
                                                    {errors.email && <Error title='Email is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Name'
                                                        className={inputClass}
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && <Error title='Name is required*' />}
                                                </div>
                                            
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Phone Number*
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder='Phone Number'
                                                        className={inputClass}
                                                        {...register('phoneNumber', { required: true })}
                                                    />
                                                    {errors.phoneNumber && <Error title='Phone Number is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Address*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Address'
                                                        className={inputClass}
                                                        {...register('address', { required: true })}
                                                    />
                                                    {errors.address && <Error title='Address is required*' />}
                                                </div>
                                            </div>
                                        </div>
                                        <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                            {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-orange-500 hover:bg-orange-500 capitalize" title='Submitting' /> : <button type='submit' className={formBtn1}>Submit</button>}
                                        </footer>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    );
}
