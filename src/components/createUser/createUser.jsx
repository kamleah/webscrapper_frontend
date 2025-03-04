import { CloseSquare } from "iconsax-react";
import { Dialog, Transition } from '@headlessui/react';
import { Eye, EyeSlash } from 'iconsax-react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { formBtn1, inputClass, labelClass } from "../../utils/CustomClass";
import Error from "../Errors/Error";
import LoadBox from "../Loader/LoadBox";
import { baseURL } from "../../constants";
import { useSelector } from "react-redux";
import { authEndPoints } from "../../endPoints/AuthEndPoint";

export default function CreateUserModal({ isOpen, onUserCreated, closeOnSuccess = true, toggle, props = {}, formType, data }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [loader, setLoader] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleLoading, setRoleLoading] = useState(false);
    const { rolesList } = useSelector((state) => state.history);

    // const onSubmit = async (formData) => {
    //     try {
    //         if (formType == "create") {
    //             setLoader(true);
    //             const isSuccess = await onUserCreated(formData);
    //             setLoader(false);
    //             if (isSuccess && closeOnSuccess) {
    //                 reset();
    //                 toggle();
    //             }
    //         } else if (formType == "edit") {
    //             axios.put(`${authEndPoints.update_user}${data?.id}/`, formData).then((response) => {
    //                 reset();
    //                 toggle();
    //             })
                
    //         } else {
    //             alert("Please resubmit your form again")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    const onSubmit = async (formData) => {
        try {
            if (formType === "create") {
                setLoader(true);
                const isSuccess = await onUserCreated(formData);
                setLoader(false);
                if (isSuccess && closeOnSuccess) {
                    reset();
                    toggle();
                }
            } else if (formType === "edit") {
                setLoader(true);
                const response = await axios.put(`${authEndPoints.update_user}${data?.id}/`, formData);
                setLoader(false);
                await onUserCreated(response.data); // Pass updated data back to parent
                reset();
                toggle();
            } else {
                alert("Please resubmit your form again");
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    };
    
    useEffect(() => {
        if (data) {
            setValue('email', data.email);
            setValue('first_name', data.first_name);
            setValue('last_name', data.last_name);
            setValue('user_role', data.user_role.id);
            setValue('process_type', data.process_type);
        }
    }, [data]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={toggle}>
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
                <div className="fixed inset-0">
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
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="div" className="flex items-center justify-between bg-blue-500 text-white p-4">
                                    <h3 className="text-lg font-medium">{formType == "edit" ? "Edit User" : "Create User"}</h3>
                                    <CloseSquare size={24} color="white" className="cursor-pointer" onClick={toggle} />
                                </Dialog.Title>
                                <div className="bg-gray-200/70">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="py-4 overflow-y-scroll scrollbars">
                                            <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                                <div>
                                                    <label className={labelClass}>Email Address*</label>
                                                    <input
                                                        type="email"
                                                        disabled={formType === 'edit'}
                                                        placeholder="Email Address"
                                                        className={`${inputClass} ${props?.button === 'edit' ? 'text-gray-300' : ''}`}
                                                        {...register('email', { required: true })}
                                                    />
                                                    {errors.email && <Error title="Email is required*" />}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>First Name*</label>
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        className={inputClass}
                                                        {...register('first_name', { required: true })}
                                                    />
                                                    {errors.first_name && <Error title="First Name is required*" />}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Last Name*</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        className={inputClass}
                                                        {...register('last_name', { required: true })}
                                                    />
                                                    {errors.last_name && <Error title="Last Name is required*" />}
                                                </div>
                                                <div>
                                                    <label htmlFor="user_role" className={`${labelClass}`}>
                                                        Role
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            id="user_role"
                                                            name="user_role"
                                                            className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                                            {...register('user_role', { required: 'Please select a role' })}
                                                            disabled={roleLoading}
                                                        >
                                                            <option value="" disabled>
                                                                {roleLoading ? "Loading Roles..." : "-- Select Role --"}
                                                            </option>
                                                            {rolesList.map((role) => (
                                                                <option key={role.id} value={role.id}>
                                                                    {role.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.selectRole && <p className="text-red-500 text-xs">{errors.selectRole.message}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="process_type" className={`${labelClass}`}>
                                                        Select Process Type
                                                    </label>
                                                    <div className="mt-1">
                                                        <select
                                                            id="process_type"
                                                            name="process_type"
                                                            className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                                            {...register('process_type', { required: 'Please select an option' })}
                                                        >
                                                            <option value="" disabled>
                                                                -- Select an Option --
                                                            </option>
                                                            <option value="single">Single</option>
                                                            <option value="batch">Batch</option>
                                                        </select>
                                                        {errors.selectOption && <p className="text-red-500 text-xs">{errors.selectOption.message}</p>}
                                                    </div>
                                                </div>
                                                {formType == "create" && <div>
                                                    <label className={labelClass}>Password*</label>
                                                    <div className="mt-1 relative flex items-center">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            type={!eyeIcon ? "password" : "text"}
                                                            className={`${inputClass} bg-neutral-100 border border-gray-200/50`}
                                                            {...register("password", {
                                                                required: "Password is required",
                                                                pattern: {
                                                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                                    message: "Password must have at least one uppercase letter, one number, and one special character."
                                                                }
                                                            })}
                                                        />
                                                        <span className="absolute right-2 z-10 bg-neutral-100" onClick={() => setEyeIcon(!eyeIcon)}>
                                                            {eyeIcon ? (
                                                                <Eye size={24} className="text-gray-400 cursor-pointer" />
                                                            ) : (
                                                                <EyeSlash size={24} className="text-gray-400 cursor-pointer" />
                                                            )}
                                                        </span>
                                                    </div>
                                                    {errors.password && <Error title={errors.password.message} />}
                                                </div>}
                                            </div>
                                        </div>
                                        <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                            {loader ? (
                                                <LoadBox
                                                    className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-orange-500 hover:bg-orange-500 capitalize"
                                                    title="Submitting"
                                                />
                                            ) : (
                                                <button type="submit" className={formBtn1}>
                                                    Submit
                                                </button>
                                            )}
                                        </footer>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
