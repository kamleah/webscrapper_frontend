import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';
import { createUser, editUser, getUser } from '../../../api';
import { Edit } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { setUserList } from '../../../redux/Slices/userSlice';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { ImageUpload, link } from '../../../env';
import { toast } from 'react-toastify';
import query from 'india-pincode-search';

function CreateUserForm(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();


    // ============================ file uplaod watch ===============================
    // const buscard_watch = watch('bus_card_url')
    // const cheque_watch = watch('cheque_url')
    const role = watch('role')
    const fssai_watch = watch('fssai_url')
    const gst_watch = watch('gst_url')
    const odoc_watch = watch('odoc_url')
    const pan_watch = watch('pan_url')
    const pincodeWatch = watch('pincode')

    // ===================== Custom validation function for a 6-digit PIN code ================
    const validatePIN = (value) => {
        const pattern = /^[0-9]{6}$/;
        if (pattern.test(value)) {
            return true;
        }
        return 'Pincode must be 6-digit';
    };

    // =================== Custom validation function for a 10-digit US phone number ============
    const validatePhoneNumber = (value) => {
        const pattern = /^\d{10}$/;
        if (pattern.test(value)) {
            return true;
        }
        return 'Phone Number must be 10-digit';
    };
    // ==================== Custom validation function for email ========================
    const validateEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (emailPattern.test(value)) {
            return true;
        }
        return 'Invalid email address';
    };
    const validateGST = (value) => {
        // GST pattern for India
        const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

        if (gstPattern.test(value)) {
            return true;
        }

        return 'Invalid GST number*';
    };
    // ============================= fetching data api ==================================
    const fetchData = () => {
        try {
            getUser().then((res) => {
                dispatch(setUserList(res))
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        if (props.button != 'edit') {                 // for create
            if (data?.pan_url.length != 0) {
                await ImageUpload(data?.pan_url[0], "doc", "panImage", data?.name)
                data.pan_url = `${link}${data?.name}_panImage_${data?.pan_url[0].name}`
            } else {
                data.pan_url = ''
            }
            // if (data?.cheque_url.length != 0) {
            //     await ImageUpload(data?.cheque_url[0], "doc", "chequeImage", data?.name)
            //     data.cheque_url = `${link}${data?.name}_chequeImage_${data?.cheque_url[0].name}`
            // } else {
            //     data.cheque_url = ''
            // }
            if (data?.gst_url.length != 0) {
                await ImageUpload(data?.gst_url[0], "doc", "gstImage", data?.name)
                data.gst_url = `${link}${data?.name}_gstImage_${data?.gst_url[0].name}`
            } else {
                data.gst_url = ''
            }
            if (data?.fssai_url.length != 0) {
                await ImageUpload(data?.fssai_url[0], "doc", "fssaiImage", data?.name)
                data.fssai_url = `${link}${data?.name}_fssaiImage_${data?.fssai_url[0].name}`
            } else {
                data.fssai_url = ''
            }
            // if (data?.bus_card_url.length != 0) {
            //     await ImageUpload(data?.bus_card_url[0], "doc", "businessImage", data?.name)
            //     data.bus_card_url = `${link}${data?.name}_businessImage_${data?.bus_card_url[0].name}`
            // } else {
            //     data.bus_card_url = ''
            // }
            if (data?.odoc_url.length != 0) {
                await ImageUpload(data?.odoc_url[0], "doc", "otherImage", data?.name)
                data.odoc_url = `${link}${data?.name}_otherImage_${data?.odoc_url[0].name}`
            } else {
                data.odoc_url = ''
            }
        }
        else {                                        // for edit
            if (data?.pan_url.length != 0) {
                ImageUpload(data?.pan_url[0], "doc", "panImage", data?.name)
                data.pan_url = `${link}${data?.name}_panImage_${data?.pan_url[0].name}`
            } else {
                data.pan_url = props?.data?.pan_url
            }
            // if (data?.cheque_url.length != 0) {
            //     await ImageUpload(data?.cheque_url[0], "doc", "chequeImage", data?.name)
            //     data.cheque_url = `${link}${data?.name}_chequeImage_${data?.cheque_url[0].name}`
            // } else {
            //     data.cheque_url = props?.data?.cheque_url
            // }
            if (data?.gst_url.length != 0) {
                await ImageUpload(data?.gst_url[0], "doc", "gstImage", data?.name)
                data.gst_url = `${link}${data?.name}_gstImage_${data?.gst_url[0].name}`
            } else {
                data.gst_url = props?.data?.gst_url
            }
            if (data?.fssai_url.length != 0) {
                await ImageUpload(data?.fssai_url[0], "doc", "fssaiImage", data?.name)
                data.fssai_url = `${link}${data?.name}_fssaiImage_${data?.fssai_url[0].name}`
            } else {
                data.fssai_url = props?.data?.fssai_url
            }
            // if (data?.bus_card_url.length != 0) {
            //     await ImageUpload(data?.bus_card_url[0], "doc", "businessImage", data?.name)
            //     data.bus_card_url = `${link}${data?.name}_businessImage_${data?.bus_card_url[0].name}`
            // } else {
            //     data.bus_card_url = props?.data?.bus_card_url
            // }
            if (data?.odoc_url.length != 0) {
                await ImageUpload(data?.odoc_url[0], "doc", "otherImage", data?.name)
                data.odoc_url = `${link}${data?.name}_otherImage_${data?.odoc_url[0].name}`
            } else {
                data.odoc_url = props?.data?.odoc_url
            }
        }
        if (props.button !== 'edit') {   // for create
            try {
                setLoader(true)
                const response = await createUser(data);
                if (response?.code == 2002) {
                    setTimeout(() => {
                        reset();
                        setLoader(false)
                        toggle();
                        fetchData()
                        toast.success(response?.Message);
                    }, 1000);
                } else {
                    setLoader(false)
                    toast.error(response?.Message);
                    console.log('failed to create user')
                }
            } catch (error) {
                setLoader(false)
                console.log('error', error);
            }
        } else {                         // for edit
            setLoader(true)
            const response = await editUser(props?.data?.id, data)
            if (response) {
                setTimeout(() => {
                    toggle();
                    setLoader(false)
                    fetchData()
                    toast.success(response?.message);
                }, 1000);
            } else {
                console.log('failed to update user')
            }
        }
    }

    // ============================== close modals ======================================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }
    // ============================== Reseting data ======================================
    const fillData = () => {
        reset({
            "address": props?.data?.address,
            "address2": props?.data?.address2,
            "alt_phone": props?.data?.alt_phone,
            "bus_card": props?.data?.bus_card,
            "bus_type": props?.data?.bus_type,
            "service": props?.data?.service,
            "cheque": props?.data?.cheque,
            "city": props?.data?.city,
            "comp_name": props?.data?.comp_name,
            "comp_type": props?.data?.comp_type,
            "designation": props?.data?.designation,
            "email": props?.data?.email,
            "first_name": props?.data?.first_name,
            "fssai": props?.data?.fssai,
            "gst": props?.data?.gst,
            "landmark": props?.data?.landmark,
            "last_name": props?.data?.last_name,
            "odoc": props?.data?.odoc,
            "pan": props?.data?.pan,
            "phone_no": props?.data?.phone_no,
            "pincode": props?.data?.pincode,
            "role": props?.data?.role,
            "state": props?.data?.state
        })
    }

    useMemo(() => {
        if (pincodeWatch != undefined && pincodeWatch?.length == 6) {
            const pincode = query?.search(pincodeWatch);
            if (pincode.length > 0) {
                setValue('city', pincode[0]?.city)
                setValue('state', pincode[0]?.state)
            } else {
                setValue('city', '')
                setValue('state', '');
            }

        } else (
            setValue('city', ''),
            setValue('state', '')
        )
    }, [pincodeWatch])

    useEffect(() => {
        if (props.button == "edit") {
            fillData()
        }
    }, [])

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add User
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
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-orange-500 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="">
                                                <div className="py-4 mx-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-x-3 gap-y-3 ">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Company Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Company Name'
                                                            className={inputClass}
                                                            {...register('comp_name', { required: true })}
                                                        />
                                                        {errors.comp_name && <Error title="Company Name is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Company Type*
                                                        </label>
                                                        <select
                                                            name="Company Type"
                                                            className={inputClass}
                                                            {...register("comp_type", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Type
                                                            </option>
                                                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                                                            <option value="General Partnerships">General Partnerships</option>
                                                            <option value="Limited Liability Partnerships (LLP)">Limited Liability Partnerships (LLP)</option>
                                                            <option value="C Corporation">C Corporation</option>
                                                            <option value="B Corporation">B Corporation</option>
                                                            <option value="S Corporation">S Corporation</option>
                                                            <option value="Non-Profit Corporation">Non-Profit Corporation</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors.comp_type && <Error title="Company Type is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Business Type*
                                                        </label>
                                                        <select
                                                            name="Business Type"
                                                            className={inputClass}
                                                            {...register("bus_type", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Type
                                                            </option>
                                                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                                                            <option value="General Partnerships">General Partnerships</option>
                                                            <option value="Limited Liability Partnerships (LLP)">Limited Liability Partnerships (LLP)</option>
                                                            <option value="C Corporation">C Corporation</option>
                                                            <option value="B Corporation">B Corporation</option>
                                                            <option value="S Corporation">S Corporation</option>
                                                            <option value="Non-Profit Corporation">Non-Profit Corporation</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors.bus_type && <Error title="Business Type is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Role*
                                                        </label>
                                                        <select
                                                            name="role"
                                                            className={inputClass}
                                                            {...register("role", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Role
                                                            </option>
                                                            <option value="user">User</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="partner">Partner</option>
                                                        </select>
                                                        {errors.role && <Error title="Role is required*" />}
                                                    </div>

                                                    {role != 'admin' && <div className="">
                                                        <label className={labelClass}>
                                                            Service*
                                                        </label>
                                                        <select
                                                            name="service"
                                                            className={inputClass}
                                                            {...register("service", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Service
                                                            </option>
                                                            <option value="FlexiStore">Flexi Store</option>
                                                            <option value="Store&Move">Store&Move</option>
                                                        </select>
                                                        {errors.service && <Error title="Service is required*" />}
                                                    </div>}                                                 <div className="">
                                                        <label className={labelClass}>
                                                            First Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='First Name'
                                                            className={inputClass}
                                                            {...register('first_name', { required: true })}
                                                        />
                                                        {errors.first_name && <Error title="First Name is required*" />}
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
                                                        {errors.last_name && <Error title="Last Name is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Phone Number*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Enter Phone Number'
                                                            className={inputClass}
                                                            {...register('phone_no', { required: true, validate: validatePhoneNumber })}
                                                        />
                                                        {errors.phone_no && <Error title={errors?.phone_no?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Alternate Phone Number
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Enter Alternate Number'
                                                            className={inputClass}
                                                            {...register('alt_phone', { required: true, validate: validatePhoneNumber })}
                                                        />
                                                        {errors.alt_phone && <Error title={errors?.alt_phone?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Email'
                                                            className={inputClass}
                                                            {...register('email', { required: true, validate: validateEmail })}
                                                        />
                                                        {errors.email && <Error title={errors?.email?.message} />}
                                                    </div>
                                                    {props.button !== 'edit' && <div className="">
                                                        <label className={labelClass}>
                                                            Password*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password', { required: true })}
                                                        />
                                                        {errors.password && <Error title="Email is required*" />}
                                                    </div>}
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
                                                        {errors.address && <Error title="Address is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Address 2
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Alternate Address'
                                                            className={inputClass}
                                                            {...register('address2')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Landmark
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='landmark'
                                                            className={inputClass}
                                                            {...register('landmark')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pin Code*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Pin Code'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true, validate: validatePIN })}
                                                        />
                                                        {errors.pincode && <Error title={errors?.pincode?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('city', { required: true })}
                                                        />
                                                        {errors.city && <Error title="City is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='State'
                                                            className={inputClass}
                                                            {...register('state', { required: true })}
                                                        />
                                                        {errors.state && <Error title="State is required*" />}
                                                    </div>

                                                    {/* --------------- kyc details ------------ */}

                                                </div>
                                                <h1 className='mx-4 font-tbPop text-xl font-semibold text-gray-900 '>KYC Details:</h1>
                                                <div className="py-4 mx-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3  gap-x-3 gap-y-3">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pan Card
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='PAN'
                                                                className={inputClass}
                                                                {...register('pan')}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='pan' className={`${pan_watch?.length || props?.data?.pan_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="pan"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("pan_url")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Cheque
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='cheque'
                                                                className={inputClass}
                                                                {...register('cheque')}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='cheque' className={`${cheque_watch?.length || props?.data?.cheque_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="cheque"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("cheque_url")} />
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            GST Number*
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='GST Number*'
                                                                className={inputClass}
                                                                {...register('gst', {
                                                                    required: 'GST is required*',
                                                                    validate: validateGST
                                                                })}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='gst' className={`${gst_watch?.length || props?.data?.gst_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="gst"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("gst_url")} />
                                                            </div>
                                                        </div>
                                                        {errors?.gst && <Error title={errors?.gst?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            FSSAI
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='FSSAI'
                                                                className={inputClass}
                                                                {...register('fssai')}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='fssai' className={`${fssai_watch?.length || props?.data?.fssai_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="fssai"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("fssai_url")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Business Card
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='Business Card'
                                                                className={inputClass}
                                                                {...register('bus_card')}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='bus_card' className={`${buscard_watch?.length || props?.data?.bus_card_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="bus_card"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("bus_card_url")} />
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Other Document
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='Other Document'
                                                                className={inputClass}
                                                                {...register('odoc')}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='odoc' className={`${odoc_watch?.length || props?.data?.odoc_url ? "bg-orange-500 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-orange-500 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="odoc"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("odoc_url")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* =============== footer section ==================== */}
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

export default CreateUserForm