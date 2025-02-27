import { AddSquare, Trash } from 'iconsax-react';
import React, { useState } from 'react';
import TextInputWithLabel from '../Input/TextInputWithLabel';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import LoadBox from '../Loader/LoadBox';

const Extract = () => {
    const [loader, setLoader] = useState(false);

    const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: {
            products: [{ product_name: '', product_url: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    const onSubmit = (payload) => {
        try {
            console.log(payload);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-1">
                            {/* Product Name Input */}
                            <div className="w-full m-1">
                                <Controller
                                    control={control}
                                    name={`products.${index}.product_name`}
                                    rules={{ required: "Product Name is required" }}
                                    render={({ field }) => (
                                        <TextInputWithLabel
                                            label="Product Name"
                                            placeholder="Enter Product Name"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.products?.[index]?.product_name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.products[index].product_name.message}
                                    </p>
                                )}
                            </div>

                            {/* Product URL Input */}
                            <div className="w-full m-1">
                                <Controller
                                    control={control}
                                    name={`products.${index}.product_url`}
                                    rules={{ required: "Product URL is required" }}
                                    render={({ field }) => (
                                        <TextInputWithLabel
                                            label="Product URL"
                                            placeholder="Enter Product URL"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.products?.[index]?.product_url && (
                                    <p className="text-red-500 text-sm">
                                        {errors.products[index].product_url.message}
                                    </p>
                                )}
                            </div>

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="border border-red-700 m-1 rounded-lg px-4"
                            >
                                <Trash size="20" className="text-red-900" />
                            </button>
                        </div>
                    ))}

                    {/* Add More Button */}
                    <button
                        type="button"
                        onClick={() => append({ product_name: '', product_url: '' })}
                        className="flex items-center border px-4 py-2 rounded-xl"
                    >
                        Add More <AddSquare size="20" className="ml-2" />
                    </button>
                </div>

                {/* Submit Button */}
                <div className="mt-20">
                    <div className="pt-3">
                        {loader ? (
                            <LoadBox title="Starting Crawl..." />
                        ) : (
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="flex w-full justify-center font-tbPop rounded-md bg-blue-500 px-3 py-2.5 
                                    text-base font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                    focus-visible:outline-sky-400"
                            >
                                Start Crawling
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Extract;
