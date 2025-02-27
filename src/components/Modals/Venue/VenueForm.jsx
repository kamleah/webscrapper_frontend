import { Dialog, Transition } from '@headlessui/react';
import { Edit } from 'iconsax-react';
import { Fragment, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import moment from 'moment';
import { formatTimeRange } from '../../../utils/Functions/reuseFunction';

export default function VenueForm(props) {
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

    const activeFieldHandler = (formObject, field, value) => {
        return {
            ...formObject,
            [field]: (value == "YES" || value == true) ? true : false
        }
    }

    const openAndClosingTimeFieldHandler = (formObject) => {
        const formatTime = (time) => {
          if (!time) return null; // Handle null or undefined input
          const format = time.length === 5 ? 'HH:mm' : 'HH:mm:ss';
          return moment(time, format).format("HH:mm:ss");
        };
      
        return {
          ...formObject,
          'booking_opening_time': formatTime(formObject?.booking_opening_time),
          'booking_closing_time': formatTime(formObject?.booking_closing_time),
        };
      };

    // ================= submit data  ===============================
    const onSubmit = async (formData) => {
        console.log('formData', formData);
        formData = await activeFieldHandler(formData, 'active', formData.active)
        formData = await openAndClosingTimeFieldHandler(formData)
        formData.working_hours = formatTimeRange(formData.booking_opening_time, formData.booking_closing_time)
        console.log('formData final: ', formData);
        try {
            if (props.button == 'edit') {
                const formattedPayload = {
                    ...props?.data, ...formData, created_by: props?.data?.created_by
                }
                console.log('formattedPayload: ', formattedPayload);
                editVenue(props?.data?.id, formattedPayload).then((res) => {
                    if (res?.status === 'success') {
                        refreshList()
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            } else {
                const formattedPayload = {
                    ...formData, created_by: user?.id
                }
                createVenue(formattedPayload).then((res) => {
                    if (res?.status === 'success') {
                        refreshList()
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
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
            'name': props?.data?.name,
            'address': props?.data?.address,
            'active': props?.data?.active ? 'YES' : 'NO',
            'booking_opening_time': props?.data?.booking_opening_time,
            'booking_closing_time': props?.data?.booking_closing_time,
            'city': props?.data?.city,
            'country': props?.data?.country,
            'features': props?.data?.features,
            'price': props?.data?.price,
            'contact_number': props?.data?.contact_number,
            'longitude': props?.data?.longitude,
            'latitude': props?.data?.latitude,
            'video_url': props?.data?.video_url
        })
    }, [props.data])

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Create Venue
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
                                                            Venue Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Venue Name'
                                                            className={inputClass}
                                                            {...register('name', { required: true })}
                                                        />
                                                        {errors.name && <Error title='Venue Name is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Features*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Features'
                                                            className={inputClass}
                                                            {...register('features', { required: true })}
                                                        />
                                                        {errors.features && <Error title='Features is required*' />}
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
                                                            Contact Number*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Contact Number'
                                                            className={inputClass}
                                                            {...register('contact_number', { required: true })}
                                                        />
                                                        {errors.contact_number && <Error title='Contact Number is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Longitude
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Longitude'
                                                            className={inputClass}
                                                            {...register('longitude', { required: false })}
                                                        />
                                                        {errors.longitude && <Error title='Longitude is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Latitude
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Latitude'
                                                            className={inputClass}
                                                            {...register('latitude', { required: false })}
                                                        />
                                                        {errors.latitude && <Error title='Latitude is required*' />}
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
                                                        {errors.city && <Error title='City is required*' />}
                                                    </div>
                                                
                                                    <div className="">
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
                                                    </div>
                                                
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Opening Time*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Opening Time'
                                                            className={inputClass}
                                                            {...register('booking_opening_time', { required: true })}
                                                        />
                                                        {errors.booking_opening_time && <Error title='Opening Time is required*' />}
                                                    </div>
                                                
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Closing Time*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Closing Time'
                                                            className={inputClass}
                                                            {...register('booking_closing_time', { required: true })}
                                                        />
                                                        {errors.booking_closing_time && <Error title='Closing Time is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Active*
                                                        </label>
                                                        <select
                                                            name="Active"
                                                            className={inputClass}
                                                            {...register("active", { required: true })}
                                                        >
                                                            <option value="">Select Active</option>
                                                            <option value="YES">Yes</option>
                                                            <option value="NO">No</option>
                                                        </select>
                                                        {errors.active && <Error title='Active is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Video URL
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Video URL'
                                                            className={inputClass}
                                                            {...register('video_url', { required: false })}
                                                        />
                                                        {errors.video_url && <Error title='Video URL is required*' />}
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