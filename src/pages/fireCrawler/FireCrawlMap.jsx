import { AddSquare, Trash } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import axios from 'axios';
import { removeUsedURLS, setProcessToggle, setProductName, setTabAccess, setUsedURLS } from '../../redux/historySlice/historySlice';
import TextInputWithLabel from '../../components/Input/TextInputWithLabel';
import LoadBox from '../../components/Loader/LoadBox';
import { setToken } from '../../redux/authSlice/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

const FireCrawlMap = ({ handleResponseRecieved, setLoading, handleResetProcess }) => {
    const dispatch = useDispatch();
    const { accessToken, loggedUserDetails } = useSelector((state) => state.auth);
    const [loader, setLoader] = useState(false);
    const [mapping, setMapping] = useState(false);
    const [mappedProductLinks, setMappedProductLinks] = useState([]);
    const [selectedLinks, setSelectedLinks] = useState([]);
    const { tabAccess, tabProcessStarted, userURLS, productName } = useSelector((state) => state.history);
    console.log("tabProcessStarted, tabProcessStarted", tabProcessStarted);
    

    const { control, handleSubmit, watch, setValue, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
            product_url: userURLS?.length ? userURLS[0]?.product_url : '',
            product_names: productName?.length ? productName : [{ name: '' }],
            extract_info: [
                { info: 'title', required: true },
                { info: 'description', required: true },
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

    const entered_product_url = watch('product_url');
    const entered_product_names = watch('product_names') || [];


    const onSubmit_old = (payload) => {
        setLoader(true);
        setLoading(true);
        try {
            dispatch(setProcessToggle(true));
            dispatch(setTabAccess({ index: 1, access: true }));
            dispatch(setUsedURLS([{ product_url: payload.product_url }]));
            dispatch(setProductName(payload.product_names));

            const crawlingPayload = {
                website_url: payload.product_url,
                product_names: payload.product_names.map(pn => pn.name),
                tags: ["url", ...payload.extract_info.map(info => info.info)],
                required_tags: ["url", ...payload.extract_info
                    .filter(info => info.required)
                    .map(info => info.info)]
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
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred while starting the crawl.';
            toast.success(errorMessage);
            console.log(error);
        }
    };

    const onSubmit = (data) => {
        try {
            // console.log("data-->", data);
            // console.log("selectedLinks---->", selectedLinks);
            setLoader(true);
            setLoading(true);
            const payload = {
                website_url: data.product_url,
                product_names: data.product_names.map(pn => pn.name),
                tags: ["url", ...data.extract_info.map(info => info.info)],
                required_tags: ["url", ...data.extract_info
                    .filter(info => info.required)
                    .map(info => info.info)],
                product_url: selectedLinks.map(pn => pn.value),
            };

            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };

            dispatch(setProcessToggle(true));
            dispatch(setTabAccess({ index: 1, access: true }));
            dispatch(setUsedURLS([{ product_url: payload.product_url }]));
            dispatch(setProductName(payload.product_names));


            axios.post(configurationEndPoints.firecrawl_scrap_v3, payload, config)
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
            console.log(error);
        };
    };

    const createOptions = ({ url, searchQuery, limit = 100, ignoreSitemap = true, sitemapOnly = false, includeSubdomains = false }) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer fc-cefe5aa0bd7f4682bbeed14226b46e26',
            },
            body: JSON.stringify({
                ignoreSitemap,
                sitemapOnly,
                includeSubdomains,
                limit,
                url,
                search: searchQuery
            })
        };
    };

    const handleMapProduct = async () => {
        try {
            setMapping(true);
            setLoading(true);
            setSelectedLinks([]);
            const products = entered_product_names.map(pn => pn.name);
            const fetchPromises = products.map(async (product) => {
                const options = createOptions({
                    url: entered_product_url,
                    searchQuery: product,
                    limit: 50,
                    ignoreSitemap: true
                });

                try {
                    const response = await fetch('https://api.firecrawl.dev/v1/map', options);
                    const data = await response.json();
                    if(data.success === false){
                        console.log("sdvljnsdvjbsdjhsb");
                        setLoading(false);
                        setMapping(false);
                    }
                    

                    return (data.links || []).map(link => ({
                        label: link,
                        value: link
                    }));

                } catch (err) {
                    setLoading(false);
                    setMapping(false);
                    console.error("Error fetching data for:", product, err);
                    return [];
                }
            });

            const results = await Promise.all(fetchPromises);
            setMappedProductLinks(results.flat());
            setMapping(false);
            setLoading(false);
        } catch (error) {
            setMapping(false);
            setLoading(false);
            console.error("Error in handleMapProduct:", error);
        }
    };

    const handleChange = (selectedOptions) => {
        // Simply set the selected options as they are, react-select handles add/remove internally
        setSelectedLinks(selectedOptions || []);
    };

    useEffect(() => {
        if (!tabProcessStarted) {
            dispatch(removeUsedURLS());
        }
    }, []);

    const handleReset = () => {
        handleResetProcess();
        reset({
            product_url: '',
            product_names: [{ name: '' }],
            extract_info: [
                { info: 'title', required: true },
                { info: 'description', required: true },
                { info: 'price', required: true },
            ],
        });
        setSelectedLinks([]); // Clear selected links on reset
    };

    console.log(selectedLinks.length);
    
    return (
        <div className="mt-5 space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div className='flex' >
                        {loggedUserDetails.process_type !== "single" && (
                            <button
                                type="button"
                                onClick={() => appendProductName({ name: '' })}
                                className="flex items-center border px-4 py-2 rounded-xl ml-1 mt-2"
                            >
                                Add More <AddSquare size="20" className="ml-2" />
                            </button>
                        )}
                        <div className="pt-2 ml-2">
                            {mapping ? (
                                <LoadBox title="Started Mapping" />
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleMapProduct}
                                    disabled={!entered_product_url || !entered_product_names?.some(p => p?.name?.trim() !== '')}
                                    className={`flex w-full justify-center font-tbPop rounded-xl px-3 py-2.5 text-base font-semibold text-white shadow-sm  
                                    ${(!mapping && entered_product_url && entered_product_names?.some(p => p?.name?.trim() !== ''))
                                            ? 'bg-primary hover:bg-orange-500 cursor-pointer'
                                            : 'bg-gray-300 cursor-not-allowed'}`}>
                                    Map Product
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {mappedProductLinks.length > 0 && <Select
                    closeMenuOnSelect={false}
                    options={mappedProductLinks}
                    isMulti={true}
                    onChange={handleChange}
                    value={selectedLinks}
                    placeholder="Select Products Links"
                    styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
                />}

                {/* Extract Information Section */}
                {selectedLinks.length > 0 && <div className="my-8">
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
                </div>}
                {!tabProcessStarted && (
                    <div className="mt-0">
                        <div className="pt-3">
                            {loader ? (
                                <LoadBox title="Starting Crawl..." />
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isValid && !selectedLinks.length > 0}
                                    className={`flex w-full justify-center font-tbPop rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm ${(isValid && selectedLinks.length > 0) ? 'bg-primary hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    Start Crawling
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {tabProcessStarted && (
                    <button
                        onClick={() => handleReset()}
                        className="w-full bg-red-500 hover:bg-red-700 font-tbPop text-white px-3 py-2.5 rounded-md mt-20"
                    >
                        Reset Process
                    </button>
                )}
            </form>
        </div>
    );
};

export default FireCrawlMap;