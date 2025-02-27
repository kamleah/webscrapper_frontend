import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import IconButton from '../../components/Button/IconButton';
import ImageInput from '../../components/Input/ImageInput';
import api from '../../constants/axiosInstence';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';

const AddProductImages = ({ productID = 0 }) => {
    const { productId } = useParams();
    const selectedProductId = productId ? productId : productID;

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            specifications: [{ specification_name: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications'
    });

    const onSubmit = (data) => {
        console.log(data?.specifications);
        let images = []
        data?.specifications.map((data)=>{
            // console.log(data?.specification_name);
            images.push(data?.specification_name)
        })
        console.log("images", images);
        try {
            const formData = new FormData();
            formData.append("product_id", selectedProductId);
            // images.forEach((image, index) => {
            //     formData.append(`image[${index}]`, image);
            // });
            images.forEach((image) => {
                formData.append("image", image);
            });
            api.post(configurationEndPoints.manageProductImages, formData).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <div>AddProductImages {selectedProductId}</div>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <Controller
                            name={`specifications.${index}.specification_name`}
                            control={control}
                            rules={{
                                required: 'Specification Name is required'
                            }}
                            render={({ field: { onChange, value } }) => (
                                <ImageInput
                                    label="Image Thumbnail"
                                    message="PNG or JPG (1080x1080px)"
                                    onChange={(file) => onChange(file)}
                                    error={errors?.specifications?.[index]?.specification_name}
                                    imgWidth={1080}
                                    imgHeight={1080}
                                    uniqueId={`specification-${index}`}
                                    value={value}
                                />
                            )}
                        />
                        {errors?.specifications?.[index]?.specification_name && (
                            <span className="text-red-500">{errors.specifications[index].specification_name.message}</span>
                        )}
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ specification_name: '' })}>Add Specification</button>
                <div className="mt-20">
                    <IconButton title="Submit" />
                </div>
            </form>
        </>
    );
};

export default AddProductImages;
