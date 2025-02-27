import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createMovableProduct, editMovableProduct, getMovableProduct, getUserMovableProduct } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import { setMovableProduct } from '../../../redux/PartnerSlices/storeMoveSlice';
import { ImageUpload, movableproductLink } from '../../../env';


export default function MovableProductForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const movableCategory = useSelector((state) => state?.master?.movableCategory)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    // ================= Store Product data  ===============================
    const movableProductList = () => {
        try {
            getUserMovableProduct(user?.userid).then(res => {
                dispatch(setMovableProduct(res))
            }).catch(err => {
                console.error('Error', err);
            })
        } catch (error) {
            console.error('Error', err);
        }
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        setLoader(true);
        try {
            if (props.button == 'edit') {
                if (data.pdf_url.length != 0) {
                    await ImageUpload(data.pdf_url[0], "movableproduct", "pdf", data.name)
                    data.pdf_url = `${movableproductLink}${data.name}_pdf_${data.pdf_url[0].name}`
                } else {
                    data.pdf_url = props.data.pdf_url
                }

                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "movableproduct", "product", data.name)
                    data.image = `${movableproductLink}${data.name}_product_${data.image[0].name}`
                } else {
                    data.image = props.data.image
                }

                if (data.image2.length != 0) {
                    await ImageUpload(data.image2[0], "movableproduct", "product", data.name)
                    data.image2 = `${movableproductLink}${data.name}_product_${data.image2[0].name}`
                } else {
                    data.image2 = props.data.image2
                }

                if (data.image3.length != 0) {
                    await ImageUpload(data.image3[0], "movableproduct", "product", data.name)
                    data.image3 = `${movableproductLink}${data.name}_product_${data.image3[0].name}`
                } else {
                    data.image3 = props.data.image3
                }

                if (data.image4.length != 0) {
                    await ImageUpload(data.image4[0], "movableproduct", "product", data.name)
                    data.image4 = `${movableproductLink}${data.name}_product_${data.image4[0].name}`
                } else {
                    data.image4 = props.data.image4
                }

                if (data.image5.length != 0) {
                    await ImageUpload(data.image5[0], "movableproduct", "product", data.name)
                    data.image5 = `${movableproductLink}${data.name}_product_${data.image5[0].name}`
                } else {
                    data.image5 = props.data.image5
                }
                console.log(data);
                editMovableProduct(props?.data?.id, data).then((res) => {
                    if (res?.message === 'Data edited successfully') {
                        movableProductList()
                        setLoader(false);
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            } else {
                data.user = user?.userid
                if (data.pdf_url.length != 0) {
                    await ImageUpload(data.pdf_url[0], "movableproduct", "pdf", data.name)
                    data.pdf_url = `${movableproductLink}${data.name}_pdf_${data.pdf_url[0].name}`
                } else {
                    data.pdf_url = ''
                }
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "movableproduct", "product", data.name)
                    data.image = `${movableproductLink}${data.name}_product_${data.image[0].name}`
                } else {
                    data.image = ''
                }

                if (data.image2.length != 0) {
                    await ImageUpload(data.image2[0], "movableproduct", "product", data.name)
                    data.image2 = `${movableproductLink}${data.name}_product_${data.image2[0].name}`
                } else {
                    data.image2 = ''
                }

                if (data.image3.length != 0) {
                    await ImageUpload(data.image3[0], "movableproduct", "product", data.name)
                    data.image3 = `${movableproductLink}${data.name}_product_${data.image3[0].name}`
                } else {
                    data.image3 = ''
                }

                if (data.image4.length != 0) {
                    await ImageUpload(data.image4[0], "movableproduct", "product", data.name)
                    data.image4 = `${movableproductLink}${data.name}_product_${data.image4[0].name}`
                } else {
                    data.image4 = ''
                }
                if (data.image5.length != 0) {
                    await ImageUpload(data.image5[0], "movableproduct", "product", data.name)
                    data.image5 = `${movableproductLink}${data.name}_product_${data.image5[0].name}`
                } else {
                    data.image5 = ''
                }
                createMovableProduct(data).then((res) => {
                    if (res?.message === 'Data added successfully') {
                        movableProductList()
                        setLoader(false);
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            }
        } catch (error) {
            setLoader(false);
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
            'category': props?.data?.category,
            "temp_type": props?.data?.temp_type,
            "prod_type": props?.data?.prod_type,
            "city": props?.data?.city,
            "duration": props?.data?.duration,
            "price": props?.data?.price,
            "margin": props?.data?.margin,
            "description": props?.data?.description,
            "specification": props?.data?.specification,
            "features": props?.data?.features,
            "rating": props?.data?.rating,
            "stock": props?.data?.stock,
        })
    }, [props.data])

    useEffect(() => {
        reset({
            "name": "",
            "category": "",
            "temp_type": "",
            "prod_type": "",
            "city": "",
            "duration": "",
            "price": "",
            "margin": "",
            "description": "",
            "specification": "",
            "features": "",
            "rating": "",
            "stock": "",
            "image": "",
            "image2": "",
            "image3": "",
            "image4": "",
            "image5": ""
        })
    }, [])
    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Movable Product
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
                                            <div className=" py-4 overflow-y-scroll scrollbars h-[24rem] lg:h-[30rem] " >
                                                <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Product Name'
                                                            className={inputClass}
                                                            {...register('name', { required: true })}
                                                        />
                                                        {errors.name && <Error title='Product Name is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Category*
                                                        </label>
                                                        <select
                                                            name="category"
                                                            className={inputClass}
                                                            {...register("category", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Product Category
                                                            </option>
                                                            {movableCategory?.map((item, index) =>
                                                                <option key={index} value={item.id}>{item.name}</option>)}
                                                        </select>
                                                        {errors.rating && <Error title='Category is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Temperature Type*
                                                        </label>
                                                        <select
                                                            name="temp_type"
                                                            className={inputClass}
                                                            {...register("temp_type", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Temperature Type
                                                            </option>
                                                            <option value="-22" >- 22 °c</option>
                                                            <option value="-16" >- 16 °c</option>
                                                            <option value="+2" >+ 2 °c</option>
                                                            <option value="+5" >+ 5 °c</option>
                                                            <option value="+20" >+ 20 °c</option>
                                                        </select>
                                                        {errors.temp_type && <Error title='Temperature is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Type*
                                                        </label>
                                                        <select
                                                            name="Product Type"
                                                            className={inputClass}
                                                            {...register("prod_type", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Product Type
                                                            </option>
                                                            <option value="Single Use" >
                                                                Single Use
                                                            </option>
                                                            <option value="Multiple Use" >
                                                                Multiple Use
                                                            </option>
                                                        </select>
                                                        {errors.prod_type && <Error title='City is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Duration (Hrs)*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Duration (Hrs)'
                                                            className={inputClass}
                                                            {...register('duration', { required: true })}
                                                        />
                                                        {errors.duration && <Error title='Duration is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Price*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Price'
                                                            className={inputClass}
                                                            {...register('price', { required: false })}
                                                        />
                                                        {errors.price && <Error title='Price is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Margin % *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Margin % of ReeferON'
                                                            className={inputClass}
                                                            {...register('margin', { required: true })}
                                                        />
                                                        {errors.margin && <Error title='Margin % is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <select
                                                            name="City"
                                                            className={inputClass}
                                                            {...register("city", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select City
                                                            </option>
                                                            <option value="Ahmedabad" >
                                                                Ahmedabad
                                                            </option>
                                                            <option value="Mumbai" >
                                                                Mumbai
                                                            </option>
                                                            <option value="Hyderabad" >
                                                                Hyderabad
                                                            </option>
                                                        </select>
                                                        {errors.city && <Error title='City is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Rating*
                                                        </label>
                                                        <select
                                                            name="rating"
                                                            className={inputClass}
                                                            {...register("rating", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Rating
                                                            </option>
                                                            <option value="0.0">0</option>
                                                            <option value="1.0">1</option>
                                                            <option value="2.0">2</option>
                                                            <option value="3.0">3</option>
                                                            <option value="4.0">4</option>
                                                            <option value="5.0">5</option>
                                                        </select>
                                                        {errors.rating && <Error title='Rating is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Available Stock*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Available Stock'
                                                            className={inputClass}
                                                            {...register('stock', { required: true })}
                                                        />
                                                        {errors.stock && <Error title='Available Stock is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Description*
                                                        </label>
                                                        <textarea
                                                            placeholder='Plase enter description'
                                                            className={inputClass}
                                                            {...register('description', { required: true })}>
                                                        </textarea>
                                                        {errors.description && <Error title='Description is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Specification*
                                                        </label>
                                                        <textarea
                                                            placeholder='Plase enter specification'
                                                            className={inputClass}
                                                            {...register('specification', { required: true })}>
                                                        </textarea>
                                                        {errors.specification && <Error title='Specification is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Key Features*
                                                        </label>
                                                        <textarea
                                                            placeholder='Plase enter features'
                                                            className={inputClass}
                                                            {...register('features', { required: true })}>
                                                        </textarea>
                                                        {errors.features && <Error title='Features is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="pdf_url">Product Brochure (PDF)*</label>
                                                        <input className={fileinput}
                                                            id="pdf_url"
                                                            type='file'
                                                            multiple
                                                            accept='application/pdf'
                                                            placeholder='Upload PDF...'
                                                            {...register("pdf_url", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.pdf_url != '' && props?.data.pdf_url != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.pdf_url?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
                                                        {errors.pdf_url && <Error title='Brochure is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="image">Product Image*</label>
                                                        <input className={fileinput}
                                                            id="image"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.image?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
                                                        {errors.image && <Error title='Main Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="image2">Product Image 2</label>
                                                        <input className={fileinput}
                                                            id="image2"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image2")} />
                                                        {props?.button == 'edit' && props?.data.image2 != '' && props?.data.image2 != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.image2?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="image3">Product Image 3</label>
                                                        <input className={fileinput}
                                                            id="image3"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image3")} />
                                                        {props?.button == 'edit' && props?.data.image3 != '' && props?.data.image3 != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.image3?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="image3">Product Image 4</label>
                                                        <input className={fileinput}
                                                            id="image4"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image4")} />
                                                        {props?.button == 'edit' && props?.data.image4 != '' && props?.data.image4 != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.image4?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="image3">Product Image 5</label>
                                                        <input className={fileinput}
                                                            id="image5"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image5")} />
                                                        {props?.button == 'edit' && props?.data.image5 != '' && props?.data.image5 != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data?.image5?.split('movableproduct')[1].split('/')[1]}
                                                        </label>}
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