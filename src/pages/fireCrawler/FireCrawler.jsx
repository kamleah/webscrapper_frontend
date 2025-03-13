import { AddSquare, Trash } from 'iconsax-react';
import React, { useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import axios from 'axios';
import { useEffect } from 'react';
import { removeUsedURLS, setProcessToggle, setTabAccess, setUsedURLS } from '../../redux/historySlice/historySlice';
import TextInputWithLabel from '../../components/Input/TextInputWithLabel';
import LoadBox from '../../components/Loader/LoadBox';
import { setToken } from '../../redux/authSlice/authSlice';

const FireCrawler = ({ handleResponseRecieved, setLoading, handleResetProcess }) => {
    const dispatch = useDispatch();
    const { accessToken, loggedUserDetails } = useSelector((state) => state.auth);
    const [loader, setLoader] = useState(false);
    const { tabAccess, tabProcessStarted, userURLS } = useSelector((state) => state.history);

    const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: {
            product_url: userURLS?.length ? userURLS[0]?.product_url : '',
            product_names: [{ name: '' }],
            extract_info: [
                { info: 'title', required: true },
                { info: 'description', required: true},
                { info: 'price', required: true }
            ]
        }
    });

    const { fields: productNameFields, append: appendProductName, remove: removeProductName } = useFieldArray({
        control,
        name: "product_names"
    });

    const { fields: extractInfoFields, append: appendExtractInfo, remove: removeExtractInfo } = useFieldArray({
        control,
        name: "extract_info"
    });

    const onSubmit = (payload) => {
        setLoader(true);
        setLoading(true);
        try {
            dispatch(setProcessToggle(true));
            dispatch(setTabAccess({ index: 1, access: true }));
            dispatch(setUsedURLS([{ product_url: payload.product_url }]));

            const crawlingPayload = {
                website_url: payload.product_url,
                product_names: payload.product_names.map(pn => pn.name),
                tags:["url",...payload.extract_info.map(info => info.info)],
                required_tags: ["url",...payload.extract_info
                    .filter(info => info.required)
                    .map(info => info.info )]
            };

            console.log('Payload being sent:', crawlingPayload);

            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            axios.post(configurationEndPoints.firecrawl_scrap_v2, crawlingPayload, config)
                .then((response) => {
                    console.log(response.data.data, "<><><><><><><><mnb");
                    handleResponseRecieved(response.data.data);
                    setLoader(false);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false);
                    setLoading(false);
                });
        } catch (error) {
            setLoader(false);
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (!tabProcessStarted) {
            dispatch(removeUsedURLS());
        }
    }, []);

    return (
        <div className="mt-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Single URL Field */}
                <div className="w-full m-1 mt-2">
                    <Controller
                        control={control}
                        name="product_url"
                        rules={{
                            required: "Website URL is required",
                            pattern: {
                                value: /^https:\/\//,
                                message: "URL must start with https://"
                            }
                        }}
                        render={({ field }) => (
                            <TextInputWithLabel
                                label="Website URL"
                                placeholder="Enter Website URL"
                                {...field}
                            />
                        )}
                    />
                    {errors.product_url && (
                        <p className="text-red-500 text-sm">
                            {errors.product_url.message}
                        </p>
                    )}
                </div>

                {/* Product Names Section */}
                <div className="my-8">
                    <h3 className="text-md font-semibold mb-2">Product Names</h3>
                    {productNameFields.map((field, index) => (
                        <div key={field.id} className="flex flex-1 items-start">
                            <div className="w-full m-1 mt-2">
                                <Controller
                                    control={control}
                                    name={`product_names.${index}.name`}
                                    rules={{ required: "Product name is required" }}
                                    render={({ field }) => (
                                        <TextInputWithLabel
                                            label={`Product Name ${index + 1}`}
                                            placeholder="Enter product name"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.product_names?.[index]?.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.product_names[index].name.message}
                                    </p>
                                )}
                            </div>
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeProductName(index)}
                                    className="border border-red-700 m-1 rounded-lg px-4 py-3 mt-2"
                                >
                                    <Trash size="20" className="text-red-900" />
                                </button>
                            )}
                        </div>
                    ))}
                    {loggedUserDetails.process_type !== "single" && (
                        <button
                            type="button"
                            onClick={() => appendProductName({ name: '' })}
                            className="flex items-center border px-4 py-2 rounded-xl ml-1 mt-2"
                        >
                            Add More <AddSquare size="20" className="ml-2" />
                        </button>
                    )}
                </div>

                {/* Extract Information Section */}
                <div className="my-8">
                    <h3 className="text-md font-semibold mb-2">Information to Extract</h3>
                    {extractInfoFields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-4">
                            <div className="flex-1 m-1">
                                <Controller
                                    control={control}
                                    name={`extract_info.${index}.info`}
                                    rules={{ required: "Information field is required" }}
                                    render={({ field }) => (
                                        <TextInputWithLabel
                                            label={`Extract ${index + 1}`}
                                            placeholder="Enter information to extract"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.extract_info?.[index]?.info && (
                                    <p className="text-red-500 text-sm">
                                        {errors.extract_info[index].info.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2 min-w-[100px]">
                                <Controller
                                    control={control}
                                    name={`extract_info.${index}.required`}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            className="h-5 w-5"
                                        />
                                    )}
                                />
                                <label className="text-sm">Required</label>
                            </div>
                            {index > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeExtractInfo(index)}
                                    className="border border-red-700 m-1 rounded-lg px-4 py-2"
                                >
                                    <Trash size="20" className="text-red-900" />
                                </button>
                            )}
                        </div>
                    ))}
                    {/* {loggedUserDetails.process_type !== "single" && ( */}
                        <button
                            type="button"
                            onClick={() => appendExtractInfo({ info: '', required: false })}
                            className="flex items-center border px-4 py-2 rounded-xl ml-1 mt-2"
                        >
                            Add More <AddSquare size="20" className="ml-2" />
                        </button>
                    {/* )} */}
                </div>

                {/* Submit Button */}
                {!tabProcessStarted && (
                    <div className="mt-20">
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
                    </div>
                )}
                {tabProcessStarted && (
                    <button
                        onClick={() => handleResetProcess()}
                        className="w-full bg-red-500 hover:bg-red-700 font-tbPop text-white px-3 py-2.5 rounded-md mt-20"
                    >
                        Reset Process
                    </button>
                )}
            </form>
        </div>
    );
};

export default FireCrawler;