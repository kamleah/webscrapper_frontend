import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createStoreProduct, editStoreProduct, getStoreProduct, getUserStoreProduct } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import { ImageUpload, storeproductLink } from '../../../env';
import { setFlexiStoreList } from '../../../redux/PartnerSlices/flexiStoreSlice';


export default function StoreProductForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const storeCategory = useSelector((state) => state?.master?.storeCategory)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    // ================= Store Product data  ===============================
    const StoreProductList = () => {
        try {
            if (user.role == 'admin') {
                getStoreProduct().then(res => {
                    dispatch(setFlexiStoreList(res))
                }).catch(err => {
                    console.error('Error', err);
                })
            } else {
                getUserStoreProduct(user?.userid).then(res => {
                    dispatch(setFlexiStoreList(res))
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
        setLoader(true);
        try {
            if (props.button == 'edit') {
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "storeproduct", "product", data.name)
                    data.image = `${storeproductLink}${data.name}_product_${data.image[0].name}`
                } else {
                    data.image = props.data.image
                }

                if (data.image2.length != 0) {
                    await ImageUpload(data.image2[0], "storeproduct", "product", data.name)
                    data.image2 = `${storeproductLink}${data.name}_product_${data.image2[0].name}`
                } else {
                    data.image2 = props.data.image2
                }

                if (data.image3.length != 0) {
                    await ImageUpload(data.image3[0], "storeproduct", "product", data.name)
                    data.image3 = `${storeproductLink}${data.name}_product_${data.image3[0].name}`
                } else {
                    data.image3 = props.data.image3
                }

                if (data.image4.length != 0) {
                    await ImageUpload(data.image4[0], "storeproduct", "product", data.name)
                    data.image4 = `${storeproductLink}${data.name}_product_${data.image4[0].name}`
                } else {
                    data.image4 = props.data.image4
                }

                if (data.image5.length != 0) {
                    await ImageUpload(data.image5[0], "storeproduct", "product", data.name)
                    data.image5 = `${storeproductLink}${data.name}_product_${data.image5[0].name}`
                } else {
                    data.image5 = props.data.image5
                }
                console.log(data)
                editStoreProduct(props?.data?.id, data).then((res) => {
                    if (res?.message === 'Data edited successfully') {
                        StoreProductList()
                        setLoader(false);
                        toggle();
                        reset();
                        toast.success(res?.message);
                    }
                })
            } else {
                if (user.role == 'partner') {
                    data.user = user?.userid
                    data.category = +data.category
                    if (data.image.length != 0) {
                        await ImageUpload(data.image[0], "storeproduct", "product", data.name)
                        data.image = `${storeproductLink}${data.name}_product_${data.image[0].name}`
                    } else {
                        data.image = ''
                    }

                    if (data.image2.length != 0) {
                        await ImageUpload(data.image2[0], "storeproduct", "product", data.name)
                        data.image2 = `${storeproductLink}${data.name}_product_${data.image2[0].name}`
                    } else {
                        data.image2 = ''
                    }

                    if (data.image3.length != 0) {
                        await ImageUpload(data.image3[0], "storeproduct", "product", data.name)
                        data.image3 = `${storeproductLink}${data.name}_product_${data.image3[0].name}`
                    } else {
                        data.image3 = ''
                    }

                    if (data.image4.length != 0) {
                        await ImageUpload(data.image4[0], "storeproduct", "product", data.name)
                        data.image4 = `${storeproductLink}${data.name}_product_${data.image4[0].name}`
                    } else {
                        data.image4 = ''
                    }
                    if (data.image5.length != 0) {
                        await ImageUpload(data.image5[0], "storeproduct", "product", data.name)
                        data.image5 = `${storeproductLink}${data.name}_product_${data.image5[0].name}`
                    } else {
                        data.image5 = ''
                    }
                    createStoreProduct(data).then((res) => {
                        if (res?.message === 'Data added successfully') {
                            StoreProductList()
                            setLoader(false);
                            toggle();
                            reset();
                            toast.success(res?.message);
                        }
                    })
                } else {
                    console.log(data)
                    createStoreProduct(data).then((res) => {
                        if (res?.message === 'Data added successfully') {
                            StoreProductList()
                            setLoader(false);
                            toggle();
                            reset();
                            toast.success(res?.message);
                        }
                    })
                }
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }

    }

    // ================= close modal  ===============
    const closeBtn = () => {
        setLoader(false);
        toggle();
        reset();
    }

    // =========================== Reset data into the form  ==============================
    useMemo(() => {
        reset({
            'name': props?.data?.name,
            "category": props?.data?.category?.id,
            "price": props?.data?.price,
            "margin": props?.data?.margin,
            "description": props?.data?.description,
            "rating": props?.data?.rating,
            "stock": props?.data?.stock,
        })
    }, [props.data])

    useEffect(() => {
        reset({
            "name": "",
            "category": "",
            "price": "",
            "margin": "",
            "description": "",
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
                    Add Flexi Store Product
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
                                                            name="Product Category"
                                                            className={inputClass}
                                                            {...register("category", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Product Category
                                                            </option>{
                                                                storeCategory?.map((res) => {
                                                                    return <option key={res.id} value={res.id}>{res.name}</option>
                                                                })
                                                            }

                                                        </select>
                                                        {errors.category && <Error title='Product Category is required*' />}
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
                                                        <label className={labelClass} htmlFor="image">Product Image*</label>
                                                        <input className={fileinput}
                                                            id="image"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("image", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800 capitalize'>
                                                            {props?.data.image.split('storeproduct')[1].split('/')[1]}
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
                                                            {props?.data.image2.split('storeproduct')[1].split('/')[1]}
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
                                                            {props?.data.image3.split('storeproduct')[1].split('/')[1]}
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
                                                            {props?.data.image4.split('storeproduct')[1].split('/')[1]}
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
                                                            {props?.data.image5.split('storeproduct')[1].split('/')[1]}
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