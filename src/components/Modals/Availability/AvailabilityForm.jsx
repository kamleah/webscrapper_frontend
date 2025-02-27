import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createAvailabalStorage, editAvailabelStorage, getAvailabelStorage, getSingleAvailabel } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import { setAvailabalStorage } from '../../../redux/slices/storageSlice';


export default function AvailabilityForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const storages = useSelector((state) => state?.storage?.list)
    const tempretureRangeList = useSelector(state => state?.master?.temperatureRange)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    const AvailabilityList = () => {
        try {
            if (user.role == 'admin') {
                getAvailabelStorage().then(res => {
                    dispatch(setAvailabalStorage(res))
                }).catch(err => {
                    console.error('Error', err);
                })
            } else {
                getSingleAvailabel(user?.userid).then(res => {
                    dispatch(setAvailabalStorage(res))
                }).catch(err => {
                    console.error('Error', err);
                })
            }
        } catch (error) {
            console.error('Error', err);
        }
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        try {
            if (props.button == 'edit') {
                editAvailabelStorage(props?.data?.id, data).then((res) => {
                    if (res?.message === 'Data edited successfully') {
                        AvailabilityList()
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            } else {
                if (user.role == 'partner') {
                    data.user = user?.userid
                    createAvailabalStorage(data).then((res) => {
                        if (res?.message === 'Data added successfully') {
                            AvailabilityList()
                            toggle();
                            reset();
                            toast.success(res?.message);
                        }
                    })
                } else {
                    createAvailabalStorage(data).then((res) => {
                        if (res?.message === 'Data added successfully') {
                            AvailabilityList()
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

    // =========================== Reset data into the form  ==============================
    useMemo(() => {
        reset({
            'name': props?.data?.name,
            "available": props?.data?.available,
            "capacity": props?.data?.capacity,
            "storage": props?.data?.storage?.id,
            "measure_unit": props?.data?.measure_unit,
            "occupied": props?.data?.occupied,
            "price": props?.data?.price,
            "temp": props?.data?.temp,
            "total_chambers": props?.data?.total_chambers,
            "type": props?.data?.type
        })
    }, [props.data])

    useEffect(() => {
        reset({
            "available": "",
            "capacity": "",
            "storage": "",
            "measure_unit": "",
            "occupied": "",
            "price": "",
            "temp": "",
            "total_chambers": "",
            "type": ""
        })
    }, [])
    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Storage
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
                                                            Storage Name*
                                                        </label>
                                                        <select
                                                            name="storage"
                                                            className={inputClass}
                                                            {...register("storage", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Storage Name
                                                            </option>
                                                            {storages?.map((item) => <option value={item?.id} key={item?.id}>{item?.name}</option>)}
                                                        </select>
                                                        {errors.storage && <Error title='Storage Name is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Allowed*
                                                        </label>
                                                        <select
                                                            name="Product allowed"
                                                            className={inputClass}
                                                            {...register("type", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Product Allowed
                                                            </option>
                                                            <option value="Both">Both</option>
                                                            <option value="Veg">Veg</option>
                                                            <option value="Non-Veg">Non-Veg</option>
                                                        </select>
                                                        {errors.type && <Error title='Product allowed is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            No. of Chambers*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='No. of Chambers'
                                                            className={inputClass}
                                                            {...register('total_chambers', { required: true })}
                                                        />
                                                        {errors.total_chambers && <Error title='No. of chamber is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Unit of Measurement*
                                                        </label>
                                                        <select
                                                            name="measure_unit"
                                                            className={inputClass}
                                                            {...register("measure_unit", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Unit of Measurement
                                                            </option>
                                                            <option value="Pallet Positions">Pallet positions</option>
                                                            <option value="Tonnage">Tonnage</option>
                                                        </select>
                                                        {errors.measure_unit && <Error title='Unit Measurement is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Total Capacity*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Total Capacity'
                                                            className={inputClass}
                                                            {...register('capacity', { required: true })}
                                                        />
                                                        {errors.capacity && <Error title='Capcity is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Current Occupied*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Current Occupied '
                                                            className={inputClass}
                                                            {...register('occupied', { required: true })}
                                                        />
                                                        {errors.occupied && <Error title='Occupied is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Availability*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Availablity'
                                                            className={inputClass}
                                                            {...register('available', { required: true })}
                                                        />
                                                        {errors.available && <Error title='Availability is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Temperature Capability*
                                                        </label>
                                                        <select
                                                            name="Temperature Capability"
                                                            className={inputClass}
                                                            {...register("temp", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Temperature Capability
                                                            </option>
                                                            {tempretureRangeList?.map((temp) => <option value={temp?.name} key={temp?.name}>{temp?.name}</option>)}
                                                        </select>
                                                        {errors.temp && <Error title='Temperature capability is required*' />}
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