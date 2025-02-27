import React from 'react'
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import DocumentHead from '../../components/Document/DocumentHead';
import IconButton from '../../components/Button/IconButton';
import api from '../../constants/axiosInstence';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';

const ProductVarients = ({ productID = 0 }) => {
    const { productId } = useParams();
    const selectedProductId = productId ? productId : productID;
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            specifications: [{ item_code: '', capacity: '', division: '', tolerance: '', pack_of: '', price: '', product: Number(selectedProductId) }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });

    
    const onSubmit = (data) => {
        console.log(data?.specifications);
        const newData = data?.specifications.map((datas)=>{
            return {...datas, price: Number(datas.price*100)}
        })
        try {
            api.post(configurationEndPoints.manageProductVarients, newData).then((res) => {
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
            <DocumentHead title="Product Varients" />
            <div>ProductVarients {selectedProductId}</div>
            <form onSubmit={handleSubmit(onSubmit)}  >
                <div>
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter Item Code"
                                        {...control.register(`specifications.${index}.item_code`, {
                                            required: "Item code is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].item_code && (
                                        <p>{errors.specifications[index].item_code.message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter Capacity"
                                        {...control.register(`specifications.${index}.capacity`, {
                                            required: "Capacity is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].capacity && (
                                        <p>{errors.specifications[index].capacity.message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="Enter Division"
                                        {...control.register(`specifications.${index}.division`, {
                                            required: "Division is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].division && (
                                        <p>{errors.specifications[index].division.message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="Enter tolerance"
                                        {...control.register(`specifications.${index}.tolerance`, {
                                            required: "Tolerance is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].tolerance && (
                                        <p>{errors.specifications[index].tolerance.message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter Pack Of"
                                        {...control.register(`specifications.${index}.pack_of`, {
                                            required: "Pack Of is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].pack_of && (
                                        <p>{errors.specifications[index].pack_of.message}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="Enter Price"
                                        {...control.register(`specifications.${index}.price`, {
                                            required: "Price is required"
                                        })}
                                        className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-700'
                                    />
                                    {errors.specifications && errors.specifications[index] && errors.specifications[index].price && (
                                        <p>{errors.specifications[index].price.message}</p>
                                    )}
                                </div>
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => append({ item_code: '', capacity: '', division: '', tolerance: '', pack_of: '', price: '', product: Number(selectedProductId) })}>Add Specification</button>
                </div>
                <div className="mt-20">
                    <IconButton title="Submit" />
                </div>
            </form>

        </>
    )
}

export default ProductVarients