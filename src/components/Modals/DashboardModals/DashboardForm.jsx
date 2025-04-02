import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Switch from 'react-switch'
import { Edit } from 'iconsax-react';
import { createStorage, getPartnerStorage, getStorages, updateStorage } from '../../../api';
import { setStorageList } from '../../../redux/slices/storageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUpload, link, demovideoLink } from '../../../env';
import { toast } from 'react-toastify';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';


// =================== form steps 1 =================

const Step1 = () => {
    const { register, control, formState: { errors }, } = useFormContext()
    const cityNames = useSelector((state) => state?.master?.city)
    const tempretureRangeList = useSelector(state => state?.master?.temperatureRange)
    return (
        <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
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
                    Operational Year*
                </label>
                <input
                    type="month"
                    placeholder='year'
                    className={inputClass}
                    {...register('operational_year', { required: true })}
                />
                {errors.operational_year && <Error title='Year is required*' />}
            </div>

            <div className="">
                <label className={labelClass}>
                    City Name*
                </label>
                <select
                    name="City"
                    className={inputClass}
                    {...register("location", { required: true })}
                >
                    <option value="" >
                        Select City*
                    </option>
                    {cityNames?.map((city) => <option value={city?.name} key={city?.name}>{city?.name}</option>)}
                </select>
                {errors.location && <Error title='City is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Storage Type*
                </label>
                <select
                    name="Storage Type"
                    className={inputClass}
                    {...register("storage_type", { required: true })}
                >
                    <option value="" >
                        Select Storage Type
                    </option>
                    <option value="Mezzanine">Mezzanine</option>
                    <option value="Palletized - Racks">Palletized - Racks</option>
                </select>
                {errors.storage_type && <Error title='Storage type is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Temperature Compliance*
                </label>
                <select
                    name="Temperature Compliance"
                    className={inputClass}
                    {...register("temp_compliance", { required: true })}
                >
                    <option value="" >
                        Select Temperature Compliance
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.temp_compliance && <Error title='Temperature compliance is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Type of Chambar*
                </label>
                <select
                    name="type of chambar"
                    className={inputClass}
                    {...register("chamber_type", { required: true })}
                >
                    <option value="" >
                        Select Chamber Type
                    </option>
                    <option value="Fixed Temperature">Fixed Temperature</option>
                    <option value="Convertible">Convertible</option>
                </select>
                {errors.chamber_type && <Error title='Chamber Type is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Rating*
                </label>
                <select
                    name="Rating"
                    className={inputClass}
                    {...register("rating", { required: true })}
                >
                    <option value="" >
                        Select Rating
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {errors.rating && <Error title='Rating is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Warehouse Management Software*
                </label>
                <input
                    type="text"
                    placeholder='Manual / Excel / Software Name'
                    className={inputClass}
                    {...register('manage_software', { required: true })}
                />
                {errors.manage_software && <Error title='Management software is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Operating Hours*
                </label>
                <input
                    type="text"
                    placeholder='Operating Hours'
                    className={inputClass}
                    {...register('operating_hrs', { required: true })}
                />
                {errors.operating_hrs && <Error title='Operating hours is required*' />}
            </div>

            <div className="">
                <label className={labelClass}>
                    Address*
                </label>
                <textarea placeholder='Please enter address'
                    className={inputClass}
                    maxLength={980}
                    {...register('address', { required: true })}></textarea>
                {errors.address && <Error title='Address is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Description*
                </label>
                <textarea
                    placeholder='Plase enter description'
                    className={inputClass}
                    maxLength={1980}
                    {...register('description', { required: true })}>
                </textarea>
                {errors.description && <Error title='Description is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Door sensor
                </label>
                <Controller
                    name="door_sensor"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    Temperature Display System
                </label>
                <Controller
                    name="temp_system"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    Remote Temperature Monitoring System
                </label>
                <Controller
                    name="remote_temp_sys"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    Electricity back Up
                </label>
                <Controller
                    name="electricity_bckup"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    Surveillance CCTV
                </label>
                <Controller
                    name="cctv"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    Blast Frezzing
                </label>
                <Controller
                    name="blast_frezzing"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <Switch
                            onChange={(checked) => field.onChange(checked)}
                            checked={field.value}
                        />
                    )}
                />
            </div>

        </div>
    )
}
// =================== form steps 2 =================

const Step2 = () => {
    const { register, formState: { errors }, } = useFormContext()
    const designationList = useSelector(state => state?.master?.designation)
    return (
        <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <div className="">
                <label className={labelClass}>
                    Contact person name*
                </label>
                <input
                    type="text"
                    placeholder='Contact Person Name'
                    className={inputClass}
                    {...register('spoc_name', { required: true })}
                />
                {errors.spoc_name && <Error title='Name is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Desgination*
                </label>
                <select
                    placeholder='Desgination'
                    className={inputClass}
                    {...register('spoc_desgination', { required: true })}
                >
                    <option value=''>Select Desgination</option>
                    {designationList?.map((curElm) => <option value={curElm?.name} key={curElm?.name}>{curElm?.name}</option>)}

                </select>
                {errors.spoc_desgination && <Error title='Desgination is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Contact no*
                </label>
                <input
                    type="text"
                    placeholder='Contact no'
                    className={inputClass}
                    {...register('spoc_contact', { required: true })}
                />
                {errors.spoc_contact && <Error title='Contact is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Email id
                </label>
                <input
                    type="email"
                    placeholder='Email id'
                    className={inputClass}
                    {...register('spoc_email', {
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Enter Valid Email"
                        }
                    })}
                />
                {errors.spoc_email && <Error title={`${errors?.spoc_email?.message}`} />}
            </div>
        </div>
    );
}
// =================== form steps 3 =================

const Step3 = () => {
    const { register, formState: { errors }, } = useFormContext()
    const designationList = useSelector(state => state?.master?.designation)
    return (
        <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <div className="">
                <label className={labelClass}>
                    Contact Person Name*
                </label>
                <input
                    type="text"
                    placeholder='Contact person Name'
                    className={inputClass}
                    {...register('dm_name', { required: true })}
                />
                {errors.dm_name && <Error title='Contact is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Desgination*
                </label>
                <select
                    placeholder='Desgination'
                    className={inputClass}
                    {...register('dm_desgination', { required: true })}
                >
                    <option value=''>Select Desgination</option>
                    {designationList?.map((curElm) => <option value={curElm?.name} key={curElm?.name}>{curElm?.name}</option>)}
                </select>
                {errors.dm_desgination && <Error title='Desgination is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Contact No*
                </label>
                <input
                    type="text"
                    placeholder='Contact No'
                    className={inputClass}
                    {...register('dm_contact', { required: true })}
                />
                {errors.dm_contact && <Error title='Contact No is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Email id
                </label>
                <input
                    type="email"
                    placeholder='Email id'
                    className={inputClass}
                    {...register('dm_email', {
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Enter Valid Email"
                        }
                    })}
                />
                {errors.dm_email && <Error title={`${errors?.dm_email?.message}`} />}
            </div>
        </div>
    );
}
// =================== form steps 4 =================

const Step4 = (props) => {
    const { register, formState: { errors }, setError } = useFormContext()
    const validateVideoSize = (file) => {
        if (file[0].size > 30 * 1024 * 1024) {
            setError('video', {
                type: 'manual',
                message: 'Video file size should be less than 10MB',
            });
        } else {
            return true;
        }
    };
    return (
        <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <div className="">
                <label className={labelClass} htmlFor="main_input">Main Image*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("image", { required: props.button == 'edit' ? false : true })} />
                {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data.image.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.image && <Error title='Main Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="Outside">Outside Image*</label>
                <input className={fileinput}
                    id="Outside"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("outside_img", { required: props.button == 'edit' ? false : true })} />
                {props?.button == 'edit' && props?.data.outside_img != '' && props?.data.outside_img != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data.outside_img.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.outside_img && <Error title=' Outside Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="Other">Other Images</label>
                <input className={fileinput}
                    id="Other"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("other_img")} />
                {props?.button == 'edit' && props?.data.other_img != '' && props?.data.other_img != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data.other_img.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="Loading">Loading / Unloading Bays</label>
                <input className={fileinput}
                    id="Loading"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("loading_img")} />
                {props?.button == 'edit' && props?.data.loading_img != '' && props?.data.loading_img != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.loading_img.split('storage')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
            </div>
            <div className="">
                <label className={labelClass} htmlFor="Staging">Staging Area / Ante Room</label>
                <input className={fileinput}
                    id="Staging"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("staging_img")} />
                {props?.button == 'edit' && props?.data.staging_img != '' && props?.data.staging_img != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.staging_img.split('storage')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
            </div>
            <div className="">
                <label className={labelClass} htmlFor="Storage">Storage Area</label>
                <input className={fileinput}
                    id="Storage"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("storage_img")} />
                {props?.button == 'edit' && props?.data.storage_img != '' && props?.data.storage_img != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.storage_img.split('storage')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
            </div>
            <div className="">
                <label className={labelClass} htmlFor="evideo">E-Demo Video*</label>
                <input className={fileinput}
                    id="evideo"
                    type='file'
                    multiple
                    accept='video/mp4,video/x-m4v,video/*,video/quicktime,video/x-ms-wmv,video/x-msvideo'
                    placeholder='Upload Video...'
                    {...register("video_url", {
                        required: props.button == 'edit' ? false : 'Video is required*',
                        onChange: (e) => {
                            validateVideoSize(e.target.files);
                        }
                    })} />
                {props?.button == 'edit' && props?.data.video_url != '' && props?.data.video_url != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.video_url.split('demovideo')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
                {errors.video_url && <Error title={`${errors.video_url.message}`} />}
            </div>
        </div>
    )
}
// =================== form steps 5 =================

const Step5 = (props) => {
    const { register, formState: { errors }, } = useFormContext()
    return (
        <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <div className="">
                <label className={labelClass}>
                    Fassai license*
                </label>
                <input
                    type="text"
                    placeholder='Fassai License'
                    className={inputClass}
                    {...register('fassai_license', { required: true })}
                />
                {errors.fassai_license && <Error title=' License is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    GST No*
                </label>
                <input
                    type="text"
                    placeholder='GST No'
                    className={inputClass}
                    {...register('gst_no', { required: true })}
                />
                {errors.gst_no && <Error title='GST No is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Any Other licenses
                </label>
                <input
                    type="text"
                    placeholder='Any Other Licenses'
                    className={inputClass}
                    {...register('other_license')}
                />
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Fassai license  Doc*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("fassai_doc", { required: props.button == 'edit' ? false : true })} />
                {props?.button == 'edit' && props?.data?.fassai_doc != '' && props?.data?.fassai_doc != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data?.fassai_doc.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.fassai_doc && <Error title='Fassai license Docx*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Gst Doc*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("gst_doc", { required: props.button == 'edit' ? false : true })} />
                {props?.button == 'edit' && props?.data?.gst_doc != '' && props?.data?.gst_doc != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data?.gst_doc.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.gst_doc && <Error title='Gst Image docx is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="other_lic_doc">Other licenses Doc</label>
                <input className={fileinput}
                    id="other_lic_doc"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("other_lic_doc")} />
                {props?.button == 'edit' && props?.data?.other_lic_doc != '' && props?.data?.other_lic_doc != undefined && <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                    {props?.data?.other_lic_doc.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.other_lic_doc && <Error title='Other licenses Docx is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="electricity_url">Electricity Doc</label>
                <input className={fileinput}
                    id="electricity_url"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Doc...'
                    {...register("electricity_url")} />
                {props?.button == 'edit' && props?.data.electricity_url != '' && props?.data.electricity_url != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.electricity_url.split('storage')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
            </div>
            <div className="">
                <label className={labelClass} htmlFor="noc_url">NOC Doc</label>
                <input className={fileinput}
                    id="noc_url"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Doc...'
                    {...register("noc_url")} />
                {props?.button == 'edit' && props?.data.noc_url != '' && props?.data.noc_url != undefined &&
                    <>
                        <label className='block mb-1 text-md font-tb font-medium text-primary capitalize'>
                            {props?.data.noc_url.split('storage')[1].split('/')[1].split('_')[2]}
                        </label>
                    </>
                }
            </div>
        </div>
    )
}

export default function DashboardForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();
    const steps = ['Storage', 'SPOC', 'Decision Maker', 'Compliances', 'Facility Images'];
    var methods = useForm({
        defaultValues: {
            "name": "",
            "operational_year": "",
            "location": "",
            "manage_software": "",
            "operating_hrs": "",
            "rating": "",
            "address": "",
            "description": "",
            "door_sensor": "",
            "temp_system": "",
            "remote_temp_sys": "",
            "electricity_bckup": "",
            "cctv": "",
            "chamber_type": "",
            "storage_type": "",
            "temp_compliance": "",
            "blast_frezzing": "",
            "spoc_name": "",
            "spoc_desgination": "",
            "spoc_contact": "",
            "spoc_email": "",
            "dm_name": "",
            "dm_desgination": "",
            "dm_contact": "",
            "dm_email": "",
            "fassai_license": "",
            "gst_no": "",
            "other_license": "",
        }
    });
    // =================== default values ====================
    if (props.button == 'edit' && props.data) {
        methods = useForm({
            defaultValues: {
                "name": props?.data?.name,
                "operational_year": props?.data?.operational_year,
                "location": props?.data?.location,
                "manage_software": props?.data?.manage_software,
                "operating_hrs": props?.data?.operating_hrs,
                "rating": props?.data?.rating,
                "chamber_type": props?.data?.chamber_type,
                "storage_type": props?.data?.storage_type,
                "temp_compliance": props?.data?.temp_compliance,
                "address": props?.data?.address,
                "description": props?.data?.description,
                "door_sensor": props?.data?.door_sensor,
                "temp_system": props?.data?.temp_system,
                "remote_temp_sys": props?.data?.remote_temp_sys,
                "electricity_bckup": props?.data?.electricity_bckup,
                "cctv": props?.data?.cctv,
                "blast_frezzing": props?.data?.blast_frezzing,
                "spoc_name": props?.data?.spoc_name,
                "spoc_desgination": props?.data?.spoc_desgination,
                "spoc_contact": props?.data?.spoc_contact,
                "spoc_email": props?.data?.spoc_email,
                "dm_name": props?.data?.dm_name,
                "dm_desgination": props?.data?.dm_desgination,
                "dm_contact": props?.data?.dm_contact,
                "dm_email": props?.data?.dm_email,
                "fassai_license": props?.data?.fassai_license,
                "gst_no": props?.data?.gst_no,
                "other_license": props?.data?.other_license,
            }
        })
    } else {
        methods = useForm()
    }

    // ============== fetch data from api ================
    const StorageList = () => {
        if (user.role == 'admin') {
            getStorages().then(res => {
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        } else {
            getPartnerStorage(user?.userid).then(res => {
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        }

    }
    // =========================== back button =========================
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isStepFalied = () => {
        return Boolean(Object.keys(methods.formState.errors).length);
    };
    // =========================== step counter =========================
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 />
            case 3:
                return <Step5 {...props} />
            case 4:
                return <Step4 {...props} />
            default:
                return (
                    <h1>
                        Unkown Step
                    </h1>
                )
        }
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        isStepFalied()
        setLoader(true)
        if (activeStep == steps.length - 1) {
            if (props.button != 'edit') {
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "storage", "mainImage", data.name)
                    data.image = `${link}${data.name}_mainImage_${data.image[0].name}`
                } else {
                    data.image = ''
                }
                if (data.outside_img.length != 0) {
                    await ImageUpload(data.outside_img[0], "storage", "outSideImage", data.name)
                    data.outside_img = `${link}${data.name}_outSideImage_${data.outside_img[0].name}`
                } else {
                    data.outside_img = ''
                }
                if (data.loading_img.length != 0) {
                    await ImageUpload(data.loading_img[0], "storage", "loadingImage", data.name)
                    data.loading_img = `${link}${data.name}_loadingImage_${data.loading_img[0].name}`
                } else {
                    data.loading_img = ''
                }
                if (data.staging_img.length != 0) {
                    await ImageUpload(data.staging_img[0], "storage", "stagingImage", data.name)
                    data.staging_img = `${link}${data.name}_stagingImage_${data.staging_img[0].name}`
                } else {
                    data.staging_img = ''
                }
                if (data.storage_img.length != 0) {
                    await ImageUpload(data.storage_img[0], "storage", "storageImage", data.name)
                    data.storage_img = `${link}${data.name}_storageImage_${data.storage_img[0].name}`
                } else {
                    data.storage_img = ''
                }
                if (data.other_img.length != 0) {
                    await ImageUpload(data.other_img[0], "storage", "otherImage", data.name)
                    data.other_img = `${link}${data.name}_otherImage_${data.other_img[0].name}`
                } else {
                    data.other_img = ''
                }
                if (data.fassai_doc.length != 0) {
                    await ImageUpload(data.fassai_doc[0], "storage", "fassaiImage", data.name)
                    data.fassai_doc = `${link}${data.name}_fassaiImage_${data.fassai_doc[0].name}`
                } else {
                    data.fassai_doc = ''
                }
                if (data.gst_doc.length != 0) {
                    await ImageUpload(data.gst_doc[0], "storage", "gstImage", data.name)
                    data.gst_doc = `${link}${data.name}_gstImage_${data.gst_doc[0].name}`
                } else {
                    data.gst_doc = ''
                }
                if (data.other_lic_doc.length != 0) {
                    await ImageUpload(data.other_lic_doc[0], "storage", "otherImage", data.name)
                    data.other_lic_doc = `${link}${data.name}_otherImage_${data.other_lic_doc[0].name}`
                } else {
                    data.other_lic_doc = ''
                }
                if (data.video_url.length != 0) {
                    await ImageUpload(data.video_url[0], "demovideo", "edemo", data.name)
                    data.video_url = `${demovideoLink}${data.name}_edemo_${data.video_url[0].name}`
                } else {
                    data.video_url = ''
                }
                if (data.electricity_url.length != 0) {
                    await ImageUpload(data.electricity_url[0], "storage", "electricity", data.name)
                    data.electricity_url = `${link}${data.name}_electricity_${data.electricity_url[0].name}`
                } else {
                    data.electricity_url = ''
                }
                if (data.noc_url.length != 0) {
                    await ImageUpload(data.noc_url[0], "storage", "noc", data.name)
                    data.noc_url = `${link}${data.name}_noc_${data.noc_url[0].name}`
                } else {
                    data.noc_url = ''
                }
            }
            else {
                if (data.image.length != 0) {
                    ImageUpload(data.image[0], "storage", "mainImage", data.name)
                    data.image = `${link}${data.name}_mainImage_${data.image[0].name}`
                } else {
                    data.image = props.data.image
                }
                if (data.outside_img.length != 0) {
                    await ImageUpload(data.outside_img[0], "storage", "outSideImage", data.name)
                    data.outside_img = `${link}${data.name}_outSideImage_${data.outside_img[0].name}`
                } else {
                    data.outside_img = props.data.outside_img
                }
                if (data.loading_img.length != 0) {
                    await ImageUpload(data.loading_img[0], "storage", "loadingImage", data.name)
                    data.loading_img = `${link}${data.name}_loadingImage_${data.loading_img[0].name}`
                } else {
                    data.loading_img = props.data.loading_img
                }
                if (data.staging_img.length != 0) {
                    await ImageUpload(data.staging_img[0], "storage", "stagingImage", data.name)
                    data.staging_img = `${link}${data.name}_stagingImage_${data.staging_img[0].name}`
                } else {
                    data.staging_img = props.data.staging_img
                }
                if (data.storage_img.length != 0) {
                    await ImageUpload(data.storage_img[0], "storage", "storageImage", data.name)
                    data.storage_img = `${link}${data.name}_storageImage_${data.storage_img[0].name}`
                } else {
                    data.storage_img = props.data.storage_img
                }
                if (data.other_img.length != 0) {
                    await ImageUpload(data.other_img[0], "storage", "otherImage", data.name)
                    data.other_img = `${link}${data.name}_otherImage_${data.other_img[0].name}`
                } else {
                    data.other_img = props.data.other_img
                }
                if (data.fassai_doc.length != 0) {
                    await ImageUpload(data.fassai_doc[0], "storage", "fassaiImage", data.name)
                    data.fassai_doc = `${link}${data.name}_fassaiImage_${data.fassai_doc[0].name}`
                } else {
                    data.fassai_doc = props.data.fassai_doc
                }
                if (data.gst_doc.length != 0) {
                    await ImageUpload(data.gst_doc[0], "storage", "gstImage", data.name)
                    data.gst_doc = `${link}${data.name}_gstImage_${data.gst_doc[0].name}`
                } else {
                    data.gst_doc = props.data.gst_doc
                }
                if (data.other_lic_doc.length != 0) {
                    await ImageUpload(data.other_lic_doc[0], "storage", "otherImage", data.name)
                    data.other_lic_doc = `${link}${data.name}_otherImage_${data.other_lic_doc[0].name}`
                } else {
                    data.other_lic_doc = props.data.other_lic_doc
                }

                if (data.video_url.length != 0) {
                    await ImageUpload(data.video_url[0], "demovideo", "edemo", data.name)
                    data.video_url = `${demovideoLink}${data.name}_edemo_${data.video_url[0].name}`
                } else {
                    data.video_url = props.data.video_url
                }
                if (data.electricity_url.length != 0) {
                    await ImageUpload(data.electricity_url[0], "storage", "electricity", data.name)
                    data.electricity_url = `${link}${data.name}_electricity_${data.electricity_url[0].name}`
                } else {
                    data.electricity_url = props.data.electricity_url
                }
                if (data.noc_url.length != 0) {
                    await ImageUpload(data.noc_url[0], "storage", "noc", data.name)
                    data.noc_url = `${link}${data.name}_noc_${data.noc_url[0].name}`
                } else {
                    data.noc_url = props.data.noc_url
                }
            }

            try {
                if (props.button == 'edit') {
                    updateStorage(props?.data?.id, data).then((res) => {
                        if (res?.message === 'Data edited successfully') {
                            StorageList()
                            setLoader(false)
                            toggle();
                            toast.success(res?.message);
                        }
                    })
                } else {
                    if (user.role == 'partner') {
                        data.user = user?.userid
                        createStorage(data).then((res) => {
                            if (res?.message === 'Data added successfully') {
                                StorageList()
                                setLoader(false)
                                toggle();
                                toast.success(res?.message);
                            }
                        })
                    } else {
                        createStorage(data).then((res) => {
                            if (res?.message === 'Data added successfully') {
                                StorageList()
                                setLoader(false)
                                toggle();
                                toast.success(res?.message);
                            }
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setLoader(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    // ================= close modal  ===============
    const closeBtn = () => {
        toggle();
        setActiveStep(0)
        methods.reset();
        setLoader(false);
    }
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
                                        <FormProvider {...methods}>
                                            <form onSubmit={methods.handleSubmit(onSubmit)} >
                                                <div className="py-4 overflow-y-scroll scrollbars h-[24rem] lg:h-[30rem]" >
                                                    <Stepper activeStep={activeStep} className='p-2' alternativeLabel>
                                                        {
                                                            steps?.map((step, index) => {
                                                                const labelProps = {};
                                                                if (isStepFalied() && activeStep == index) {
                                                                    labelProps.error = true;
                                                                }
                                                                return (
                                                                    <Step key={index}>
                                                                        <StepLabel  {...labelProps}>{step}</StepLabel>
                                                                    </Step>
                                                                )
                                                            })
                                                        }
                                                    </Stepper>
                                                    {getStepContent(activeStep)}
                                                </div>
                                                <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                                    <button type='button' className={formBtn1} disabled={activeStep == 0} onClick={handleBack}>Back</button>
                                                    {/* <button type='submit' className={formBtn1}>{activeStep == 4 ? "Submit" : "Next"}</button> */}
                                                    {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-orange-500 hover:bg-orange-500 capitalize" title='Submitting' /> : <button type='submit' className={formBtn1}>{activeStep == 4 ? "Submit" : "Next"}</button>}
                                                    <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                                </footer>
                                            </form>
                                        </FormProvider>
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