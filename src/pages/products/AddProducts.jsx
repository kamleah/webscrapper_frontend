import React, { useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import { requiredField } from '../../utils/Validation/FormValidationRule'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import AdvancedSearchableDropdown from '../../components/DropDown/AdvancedSearchableDropdown'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import Textarea from '../../components/Input/Textarea'
import ImageInput from '../../components/Input/ImageInput'
import PdfViewerComponent from '../../components/Card/PdfViewerComponent'
import FileUpload from '../../components/Input/FileUpload'
import PDFUpload from '../../components/Input/PDFUpload'
import IconButton from '../../components/Button/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../constants/axiosInstence'
import { baseURL } from '../../constants/BaseConfig'
import DocumentHead from '../../components/Document/DocumentHead'
import SectionHeader from '../../components/Card/SectionHeader'

const AddProducts = () => {

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      specifications: [{ specification_name: '', specification_value: '' }]
    }
  });
  const dispatch = useDispatch();

  const { gradesList, status, error } = useSelector((state) => state.grade);
  const { brandsList, status: brandStatus, error: brandError } = useSelector((state) => state.brand);
  const { categoriesList, status: categoriesStatus, error: categoriesError } = useSelector((state) => state.category);
  const { leadTimeList, status: leadTimeStatus, error: leadTimeError } = useSelector((state) => state.leadtime);
  const { packSizeList, status: packSizeStatus, error: packSizeError } = useSelector((state) => state.packsize);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications"
  });


  const onSubmit = (data) => {
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
      console.log(res.data);
      navigate('/add-product');
    }).catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    dispatch(getAllGradeList());
    dispatch(getAllBrandList());
    dispatch(getAllCategoriesList());
    dispatch(getAllLeadTimeList());
    dispatch(getAllPackSizeList());
  }, []);

  return (
    <>
      <DocumentHead title='Add Product' />
      <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7">
        <section className="h-full w-full">
          <SectionHeader title="Add Products" subtitle="List of Product" />
          <div>djnj</div>
        </section>
      </div>

      <div>
        <div><h4>Add Product</h4></div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
        <div className='flex flex-row'>
          <div className='w-3/4 px-4'>
            <Input
              label='Product Name'
              placeholder="Enter Product Name"
              control={control}
              errorsMsg={errors?.name?.message}
              name='name'
              rules={requiredField('Pack Size')}
            />
            <div className='flex flex-row gap-2'>
              <Input
                label='Price'
                placeholder="Enter Product Price"
                control={control}
                errorsMsg={errors?.price?.message}
                name='price'
                rules={requiredField('Product Price')}
                inputType='number'
              />
              <Input
                label='Discount Price'
                placeholder="Enter Product Discount Price"
                control={control}
                errorsMsg={errors?.discount?.message}
                name='discount'
                rules={requiredField('Discount Price')}
                inputType='number'
              />
            </div>
            <div className='flex flex-row gap-2'>
              <div className='w-full mt-1'>
                <Input
                  label='Add Warrenty'
                  placeholder="Enter Product Warrenty In Days"
                  control={control}
                  errorsMsg={errors?.warrenty?.message}
                  name='warrenty'
                  rules={requiredField('Product Warrenty')}
                  inputType='number'
                />
              </div>
              <div className='w-full mt-1'>
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
                {errors?.brand?.message && <span className="text-red-500">{errors?.brand?.message}</span>}
              </div>
            </div>
            <div className='flex flex-row gap-2'>
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
                {errors?.category?.message && <span className="text-red-500">{errors?.category?.message}</span>}
              </div>
              <div className='w-full mt-1'>
                <Controller
                  control={control}
                  name={'lead_time_chemical'}
                  rules={requiredField('Unit Size')}
                  render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                    <AdvancedSearchableDropdown
                      label='Select Lead Time Chemical'
                      options={leadTimeList}
                      placeholder={"Select Lead Time Checmical"}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.lead_time_chemical?.message && <span className="text-red-500">{errors?.lead_time_chemical?.message}</span>}
              </div>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='w-full mt-1'>
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
                {errors?.packSizeUnit?.message && <span className="text-red-500">{errors?.packSizeUnit?.message}</span>}
              </div>
              <div className='w-full mt-1'>
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
                {errors?.pack_size?.message && <span className="text-red-500">{errors?.pack_size?.message}</span>}
              </div>
            </div>

            <div>
              <Textarea
                label='Search Keywords'
                placeholder="Enter Product Discount Price"
                control={control}
                errorsMsg={errors?.search_keywords?.message}
                name='search_keywords'
                rules={requiredField('Search Keywords')}
                inputType='number'
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  validate: (value) => value.trim() !== "" || "No spaces allowed",
                }}
                render={({ field }) => (
                  <ReactQuill
                    style={{ height: "20vh" }}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='w-2/4 px-4'>
            <div className='flex justify-between w-full'>
              <div >
                <span className='text-gray-600 text-sm' >Price on request</span>
              </div>
              <div>
                <Input
                  placeholder="Enter Product Price"
                  control={control}
                  errorsMsg={errors?.price_on_request?.message}
                  name='price_on_request'
                  // rules={requiredField('Price on request')}
                  inputType='checkbox'
                />
              </div>
            </div>
            <div>
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
              {errors?.thumbnail?.message && <span className="text-red-500">{errors?.thumbnail?.message}</span>}
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
              {errors?.coa_purity?.message && <span className="text-red-500">{errors?.coa_purity?.message}</span>}
            </div>
            <div>
              <div>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Specification Name"
                        {...control.register(`specifications.${index}.specification_name`, {
                          required: "Specification Name is required"
                        })}
                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                      />
                      {errors.specifications && errors.specifications[index] && errors.specifications[index].specification_name && (
                        <p>{errors.specifications[index].specification_name.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Specification Value"
                        {...control.register(`specifications.${index}.specification_value`, {
                          required: "Specification Value is required"
                        })}
                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                      />
                      {errors.specifications && errors.specifications[index] && errors.specifications[index].specification_value && (
                        <p>{errors.specifications[index].specification_value.message}</p>
                      )}
                    </div>
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => append({ specification_name: '', specification_value: '' })}>Add Specification</button>
            </div>
          </div>
        </div>
        <div className='mt-20'>
          <IconButton title={"Submit"} />
        </div>
      </form>
    </>
  )
}

export default AddProducts