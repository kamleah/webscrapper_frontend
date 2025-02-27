import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import DocumentHead from '../../components/Document/DocumentHead';
import SectionHeader from '../../components/Card/SectionHeader';
import { requiredField } from '../../utils/Validation/FormValidationRule';
import Error from '../../components/Errors/Error';
import LoadBox from '../../components/Loader/LoadBox';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../utils/CustomClass';
import Input from '../../components/Input/Input';
import AdvancedSearchableDropdown from '../../components/DropDown/AdvancedSearchableDropdown';
import Textarea from '../../components/Input/Textarea';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { toolbarFormats, toolbarModules } from '../../utils/Functions/reuseFunction';
import ImageInput from '../../components/Input/ImageInput';
import { AddCircle, CloseCircle, TickCircle } from 'iconsax-react';
import PDFUpload from '../../components/Input/PDFUpload';
import { useSelector, useDispatch } from 'react-redux';
import { baseURL } from '../../constants/BaseConfig';
import api from '../../constants/axiosInstence';

const AddProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, control, getValues, handleSubmit, reset, setValue, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            specifications: [{ specification_name: '', specification_value: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });
    const [loader, setLoader] = useState(false);
    const { brandsList } = useSelector((state) => state.brand);
    const { categoriesList } = useSelector((state) => state.category);
    const { leadTimeList } = useSelector((state) => state.leadtime);
    const { gradesList } = useSelector((state) => state.grade);
    const { packSizeList } = useSelector((state) => state.packsize);

    const closeBtn = () => {
        console.log("close");
    };

    const onSubmit = (data) => {
        setLoader(true);
        try {
            data.price_on_request = data?.price_on_request ? data?.price_on_request : false;
            data.specifications = JSON.stringify(data.specifications);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("discount", data.discount);
            formData.append("warranty", data.warrenty);
            formData.append("brand", data.brand.id);
            formData.append("category", data.category.id);
            formData.append("lead_time_chemical", data.lead_time_chemical.id);
            formData.append("description", data.description);
            formData.append("price_on_request", data.price_on_request);
            formData.append("search_keywords", data.search_keywords);
            formData.append("pack_size", data.pack_size.id);
            formData.append("grade", data.grade.id);
            formData.append("coa_purity", data.coa_purity);
            formData.append("thumbnail_image", data.thumbnail);
            formData.append("thumbnail_image_verify", data.thumbnail);
            formData.append("specification", data.specifications);

            api.post(`${baseURL}configuration/product/`, formData).then((res) => {
                setLoader(false);
                navigate('/products');
            }).catch((err) => {
                setLoader(false);
                console.log(err);
            });

        } catch (error) {
            setLoader(false);
            console.log("error", error);
        };
    };

    const error = false;

    useEffect(() => {
        dispatch(getAllBrandList());
        dispatch(getAllCategoriesList());
        dispatch(getAllLeadTimeList());
        dispatch(getAllGradeList());
        dispatch(getAllPackSizeList());
    }, [dispatch]);

    return (
        <>
            <DocumentHead title='Add Product' />
            <div className="bg-white rounded-xl m-4 sm:m-5 p-5 sm:p-7">
                <section className="h-full w-full">
                    <SectionHeader title="Add Products" subtitle="Add product details" />
                    <div className=" bg-gray-200/70 mt-10 rounded-xl">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="py-4 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                                <Input
                                    label='Name'
                                    placeholder="Enter product name"
                                    control={control}
                                    errorsMsg={errors?.name?.message}
                                    name='name'
                                    rules={requiredField('Product Name')}
                                />
                                <Input
                                    label='Price'
                                    placeholder="Enter product price"
                                    control={control}
                                    errorsMsg={errors?.price?.message}
                                    name='price'
                                    rules={requiredField('Product Price')}
                                    inputType='number'
                                />
                                <Input
                                    label='Discount price'
                                    placeholder="Enter Discount price"
                                    control={control}
                                    errorsMsg={errors?.symbol?.message}
                                    name='discount'
                                    rules={requiredField('Discount Price')}
                                    inputType='number'
                                />
                                <Input
                                    label='Add Warrenty'
                                    placeholder="Enter Product Warrenty in Days"
                                    control={control}
                                    errorsMsg={errors?.symbol?.message}
                                    name='warrenty'
                                    rules={requiredField('Product Warrenty')}
                                    inputType='number'
                                />
                                <div className='w-full'>
                                    <Controller
                                        control={control}
                                        name={'brand'}
                                        rules={requiredField('Brand')}
                                        render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                                            <AdvancedSearchableDropdown
                                                label='Select Brand'
                                                options={brandsList}
                                                placeholder={"Select Brand"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.brand?.message} />
                                </div>
                                <div className='w-full mt-1'>
                                    <Controller
                                        control={control}
                                        name={'category'}
                                        rules={requiredField('Product Category')}
                                        render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                                            <AdvancedSearchableDropdown
                                                label='Select Category'
                                                options={categoriesList}
                                                placeholder={"Select Product Category"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.category?.message} />
                                </div>
                                <div className='w-full'>
                                    <Controller
                                        control={control}
                                        name={'lead_time_chemical'}
                                        rules={requiredField('Lead Time Chemical')}
                                        render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                                            <AdvancedSearchableDropdown
                                                label='Select Lead Time Chemical'
                                                options={leadTimeList}
                                                placeholder={"Select Lead Time Checmical"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.lead_time_chemical?.message} />
                                </div>

                                <div className='w-full'>
                                    <Controller
                                        control={control}
                                        name={'grade'}
                                        rules={requiredField('Grade')}
                                        render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                                            <AdvancedSearchableDropdown
                                                label='Select Grade'
                                                options={gradesList}
                                                placeholder={"Select Grade"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.grade?.message} />
                                </div>
                                <div className='w-full'>
                                    <Controller
                                        control={control}
                                        name={'pack_size'}
                                        rules={requiredField('Pack Size')}
                                        render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                                            <AdvancedSearchableDropdown
                                                label='Select Pack Size'
                                                options={packSizeList}
                                                placeholder={"Select Pack Size Unit"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.pack_size?.message} />
                                </div>
                                <Input
                                    label='Price on request'
                                    placeholder="Enter Product Price"
                                    control={control}
                                    errorsMsg={errors?.price_on_request?.message}
                                    name='price_on_request'
                                    // rules={requiredField('Price on request')}
                                    inputType='checkbox'
                                    containerClass='flex justify-between items-center flex-wrap'
                                />
                                <div className="w-full lg:col-span-3 col-span-1">
                                    <Textarea
                                        label='Search Keywords'
                                        placeholder="Enter Product Search Keywords"
                                        control={control}
                                        errorsMsg={errors?.search_keywords?.message}
                                        name='search_keywords'
                                        rules={requiredField('Search Keywords')}
                                    />
                                </div>
                                <div className="w-full lg:col-span-3 col-span-1">
                                    <div>
                                        <label className='text-gray-600 text-sm' >{"Product Description"}</label>
                                    </div>
                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{
                                            required: "Product Description is required",
                                            validate: (value) => {
                                                if (!value || value.trim() === "" || value === "<p><br></p>") {
                                                    return "Product Description is required";
                                                }
                                                return true;
                                            },
                                        }}
                                        render={({ field }) => (
                                            <ReactQuill
                                                modules={toolbarModules}
                                                formats={toolbarFormats}
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    if (!value || value.trim() === "" || value == "<p><br></p>") {
                                                        setError("description", { type: 'required', message: 'Product Description is required' })
                                                    } else {
                                                        clearErrors("description");
                                                    }
                                                }}
                                                style={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    padding: '10px',
                                                }}
                                            />
                                        )}
                                    />
                                    <Error title={errors?.description?.message} />
                                </div>

                                <div className="w-full lg:col-span-3 col-span-1">
                                    <div className="w-full lg:col-span-3 col-span-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-gray-600 text-sm">Product Specification</label>
                                            {fields.length < 1 && (
                                                <AddCircle
                                                    size="32"
                                                    className="text-orange-500 cursor-pointer"
                                                    onClick={() => append({ specification_name: '', specification_value: '' })}
                                                />
                                            )}
                                        </div>
                                        {fields.map((field, index) => {
                                            const isDisabled = !(
                                                getValues(`specifications.${index}.specification_name`) &&
                                                getValues(`specifications.${index}.specification_value`)
                                            );
                                            return (
                                                <div key={field.id} className="flex items-center gap-4 mb-2">
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Specification Name"
                                                            {...register(`specifications.${index}.specification_name`, {
                                                                required: "Specification Name is required",
                                                            })}
                                                            className="w-full border-2 rounded-md px-3 py-2 text-base focus:outline-orange-500"
                                                        />
                                                        {errors.specifications && errors.specifications[index]?.specification_name && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.specifications[index].specification_name.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Specification Value"
                                                            {...register(`specifications.${index}.specification_value`, {
                                                                required: "Specification Value is required",
                                                            })}
                                                            className="w-full border-2 rounded-md px-3 py-2 text-base focus:outline-orange-500"
                                                        />
                                                        {errors.specifications && errors.specifications[index]?.specification_value && (
                                                            <p className="text-red-500 text-sm mt-1">
                                                                {errors.specifications[index].specification_value.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <CloseCircle
                                                            size="32"
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={() => remove(index)}
                                                        />
                                                        {fields.length === index + 1 ? (
                                                            <AddCircle
                                                                size="32"
                                                                className={`text-orange-500 cursor-pointer`}
                                                                onClick={() => {
                                                                    append({ specification_name: '', specification_value: '' });
                                                                }}
                                                            />
                                                        ) :
                                                            <TickCircle size="32" className={`text-orange-500 cursor-pointer`} />
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="w-full lg:col-span-3 col-span-1 flex space-x-4">
                                    <div className="w-1/2">
                                        <Controller
                                            name="thumbnail"
                                            control={control}
                                            rules={{
                                                required: "Thumbnail is required",
                                            }}
                                            render={({ field }) => (
                                                <ImageInput
                                                    label={"Image Thumbnail"}
                                                    message='PNG or JPG (1080x1080px)'
                                                    onChange={field.onChange}
                                                    error={errors?.thumbnail}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Controller
                                            name="coa_purity"
                                            control={control}
                                            // rules={{
                                            //   required: "COA Purity is required",
                                            // }}
                                            render={({ field }) => (
                                                <PDFUpload
                                                    label={"COA PDF"}
                                                    message='Select PDF file only'
                                                    onChange={field.onChange}
                                                    error={errors?.coa_purity}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error &&
                                <span className='-mt-4 absolute px-4' >
                                    <Error title={error} />
                                </span>
                            }

                            <footer className="py-2 flex bg-gray-400 justify-end px-4 space-x-3 rounded-b-xl ">
                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-orange-500 hover:bg-orange-500 capitalize" title='Submitting' /> : <button type='submit' className={formBtn1}>submit</button>}
                                <button type='button' className={formBtn2} onClick={closeBtn}>Cancel</button>
                            </footer>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddProductForm