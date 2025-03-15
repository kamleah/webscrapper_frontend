import { AddSquare, Trash } from 'iconsax-react';
import React, { useState } from 'react';
import TextInputWithLabel from '../Input/TextInputWithLabel';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import LoadBox from '../Loader/LoadBox';
import { useDispatch, useSelector } from 'react-redux';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import axios from 'axios';
import { useEffect } from 'react';
import { removeUsedURLS, setProcessToggle, setTabAccess, setUsedURLS } from '../../redux/historySlice/historySlice';

const Extract = ({ handleResponseRecieved, setLoading, handleResetProcess }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const { tabAccess, tabProcessStarted, userURLS } = useSelector((state) => state.history);

    const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: { products: userURLS?.length ? userURLS : [{ product_name: '', product_url: '' }] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    const onSubmit = (payload) => {
        setLoader(true);
        setLoading(true);
        try {
            dispatch(setProcessToggle(true));
            dispatch(setTabAccess({ index: 1, access: true }));
            dispatch(setUsedURLS(payload.products));

            const crawlingPayload = {
                user: loggedUserDetails?.id,
                urls: payload.products.map(product => product.product_url),
                search_keywords: payload.products.map(product => product.product_name),
                metadata_fields: ["product_name", "product_description"]
            };

            axios.post(configurationEndPoints.user_scrap, crawlingPayload).then((response) => {
                handleResponseRecieved(response.data.data);
                setLoader(false);
                setLoading(false);
            }).catch((error) => {
                setLoader(false);
                setLoading(false);
            });

        } catch (error) {
            setLoader(false);
            setLoading(false);
        };
    };

    useEffect(() => {
        if (!tabProcessStarted) {
            dispatch(removeUsedURLS());
        }
    }, []);

    return (
        <div className="mt-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-1">

                            {/* Product URL Input */}
                            <div className="w-full m-1 mt-2">
                                <Controller
                                    control={control}
                                    name={`products.${index}.product_url`}
                                    rules={{
                                        required: "Product URL is required",
                                        pattern: {
                                            value: /^https:\/\//,
                                            message: "URL must start with https://"
                                        }
                                    }}
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
                            {fields.length > 1 && <button
                                type="button"
                                onClick={() => remove(index)}
                                className="border border-red-700 m-1 rounded-lg px-4"
                            >
                                <Trash size="20" className="text-red-900" />
                            </button>}
                        </div>
                    ))}

                    {/* Add More Button */}
                    {loggedUserDetails.process_type != "single" && <button
                        type="button"
                        onClick={() => append({ product_name: '', product_url: '' })}
                        className="flex items-center border px-4 py-2 rounded-xl ml-1 mt-2"
                    >
                        Add More <AddSquare size="20" className="ml-2" />
                    </button>}
                </div>

                {/* Submit Button */}
                {!tabProcessStarted && <div className="mt-20">
                    <div className="pt-3">
                        {loader ? (
                            <LoadBox title="Starting Crawl..." />
                        ) : (
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`flex w-full justify-center font-tbPop rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm ${isValid ? 'bg-blue-500 hover:bg-sky-500' : 'bg-gray-300 cursor-not-allowed'}`}
                            >
                                Start Crawling
                            </button>
                        )}
                    </div>
                </div>}
                {
                    tabProcessStarted && <button onClick={() => handleResetProcess()} className="w-full bg-red-500 hover:bg-red-700 font-tbPop text-white px-3 py-2.5 rounded-md mt-20">
                        Reset Process
                    </button>
                }
            </form>
        </div>
    );
};

export default Extract;
