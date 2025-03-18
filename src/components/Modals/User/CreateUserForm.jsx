import { Dialog, Transition } from '@headlessui/react';
import { Edit } from 'iconsax-react';
import { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAdmin, createSuperAdmin, individualUserDetailsUpdate } from '../../../api';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';


export default function CreateUserModal(props) {
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
                    individualUserDetailsUpdate(props?.data?.id, formattedPayload).then((res) => {
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
                        ...formData,
                        'created_by': user?.id
                    }
                    if (formattedPayload.role == 'SUPER_ADMIN') {
                        createSuperAdmin(formattedPayload).then((res) => {
                            if (res?.status === 'success') {
                                refreshList()
                                toggle();
                                reset();
                                toast.success(res?.message);
                            }
                        })
                    } else if (formattedPayload.role == 'ADMIN') {
                        createAdmin(formattedPayload).then((res) => {
                            if (res?.status === 'success') {
                                refreshList()
                                toggle();
                                reset();
                                toast.success(res?.message);
                            }
                        })
                    }
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

    // =========================== Reset data into the form  ==============================
    //useEffect(() => {
    //    reset({})
    //}, [])

    useMemo(() => {
        reset({
            'first_name': props?.data?.first_name,
            "last_name": props?.data?.last_name,
            "gender": props?.data?.gender,
            "address": props?.data?.address,
            "city": props?.data?.city,
            "country": props?.data?.country,
            "country_code": props?.data?.country_code,
            "phone": props?.data?.phone,
            "role": props?.data?.role,
            "pin_code": props?.data?.pin_code,
            "email": props?.data?.email,
            "state": props?.data?.state,
        })
    }, [props.data])

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Create User
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
                                                            First Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='First Name'
                                                            className={inputClass}
                                                            {...register('first_name', { required: true })}
                                                        />
                                                        {errors.first_name && <Error title='First Name is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Last Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('last_name', { required: true })}
                                                        />
                                                        {errors.last_name && <Error title='Last Name is required*' />}
                                                    </div>
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            Country Code*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Country Code'
                                                            className={inputClass}
                                                            {...register('country_code', { required: true })}
                                                        />
                                                        {errors.country_code && <Error title='Country Code is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            Phone*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Phone'
                                                            className={inputClass}
                                                            {...register('phone', { required: true })}
                                                        />
                                                        {errors.phone && <Error title='Phone is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
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
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('city', { required: true })}
                                                        />
                                                        {errors.city && <Error title='City is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='State'
                                                            className={inputClass}
                                                            {...register('state', { required: true })}
                                                        />
                                                        {errors.state && <Error title='State is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            Pin Code*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Pin Code'
                                                            className={inputClass}
                                                            {...register('pin_code', { required: true })}
                                                        />
                                                        {errors.pin_code && <Error title='Pin Code is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            Country*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Country'
                                                            className={inputClass}
                                                            {...register('country', { required: true })}
                                                        />
                                                        {errors.country && <Error title='Country is required*' />}
                                                    </div>}
                                                    {props.button == "edit" && <div className="">
                                                        <label className={labelClass}>
                                                            Gender*
                                                        </label>
                                                        <select
                                                            name="gender"
                                                            className={inputClass}
                                                            {...register("gender", { required: true })}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="MALE">Male</option>
                                                            <option value="FEMALE">Female</option>
                                                            <option value="OTHER">Other</option>
                                                        </select>
                                                        {errors.gender && <Error title='Gender is required*' />}
                                                    </div>}
                                                    {user.role == 'SUPER_ADMIN' &&<div className="">
                                                        <label className={labelClass}>
                                                            Role*
                                                        </label>
                                                        <select
                                                            name="role"
                                                            className={inputClass}
                                                            {...register("role", { required: true })}
                                                        >
                                                            <option value="">Select Role</option>
                                                            <option value="ADMIN">Admin</option>
                                                            <option value="SUPER_ADMIN">Super Admin</option>
                                                        </select>
                                                        {errors.role && <Error title='Role is required*' />}
                                                    </div>}
                                                    {props.button != 'edit' && user.role == 'SUPER_ADMIN' && <div className="">
                                                        <label className={labelClass}>
                                                            Password*
                                                        </label>
                                                        <input
                                                            type="password"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password', { required: true })}
                                                        />
                                                        {errors.password && <Error title='Password is required*' />}
                                                    </div>}
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