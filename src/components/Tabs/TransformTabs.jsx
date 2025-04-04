import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { setProcessToggle, setScrappedData, setTabAccess, toggleLanguage } from '../../redux/historySlice/historySlice';
import { useDispatch, useSelector } from 'react-redux';

const TransformTabs = ({ scraped_data, scraped_id, handleContentTransformed, setLoading }) => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const [loader, setLoader] = useState(false);
    const [accordian, setAccordian] = useState(null);
    const toggleAccordion = (index) => {
        setAccordian(accordian === index ? null : index);
    };

    const { scrappedData, languages, selectedLanguages } = useSelector((state) => state.history);
    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            languages: selectedLanguages?.length ? selectedLanguages : [],
        }
    });

    const GetScrapDetails = (scrapId) => {
        try {
            setLoading(true);
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            axios.get(`${configurationEndPoints.firecrawl_scrap_by_id}${scrapId}/`, config)

                .then((response) => {
                    dispatch(setScrappedData(response.data.data.data));
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (scraped_id) {
            GetScrapDetails(scraped_id);
        }
    }, [scraped_id]);

    const onSubmit = (data) => {
        dispatch(setProcessToggle(true));
        dispatch(setTabAccess({ index: 2, access: true }));
        setLoader(true);
        setLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
        };
        data.scrap_id = scraped_id;
        data.languages = ["english", ...data.languages]
        axios.post(configurationEndPoints.firecrawl_scrap_translate, data, config).then((response) => {
            handleContentTransformed(response.data.data);
            setLoader(false);
            setLoading(false);
        }).catch((error) => {
            setLoader(false);
            setLoading(false);
        });
    };

    console.log(scrappedData);
    

    return (
        <div>
            <div className="p-4">
                {scrappedData?.map((data, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg mb-4 shadow-sm overflow-hidden"
                    >
                        {/* Accordion Header */}
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="flex items-center justify-between p-4 hover:bg-orange-50 cursor-pointer"
                        >
                            <h3 className="text-sm font-bold text-primary">{data.title}</h3>
                            {accordian === index ? (
                                <ChevronUp className="text-primary" />
                            ) : (
                                <ChevronDown className="text-primary" />
                            )}
                        </div>

                        {/* Accordion Content */}
                        <div
                            className={`transition-all duration-300 ${accordian === index
                                    ? "max-h-[500px] p-4 bg-white overflow-y-auto"
                                    : "max-h-0 overflow-hidden"
                                }`}
                        >
                            {Object.entries(data).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                    <strong className="text-gray-800">{key.toUpperCase()}:</strong>
                                    {key === "url" ? (
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline ml-1"
                                        >
                                            View Product
                                        </a>
                                    ) : (
                                        <p className="text-gray-700">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Select Languages</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {languages?.map((language) => (
                            <div key={language.id} className="flex items-center space-x-3">
                                <Controller
                                    name="languages"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            id={language.id}
                                            value={language.id}
                                            checked={selectedLanguages.includes(language.id)}
                                            onChange={() => {
                                                dispatch(toggleLanguage(language.id))
                                                const newValue = field.value.includes(language.id)
                                                    ? field.value.filter((lang) => lang !== language.id)
                                                    : [...field.value, language.id];
                                                field.onChange(newValue);
                                            }}
                                            // onChange={() => dispatch(toggleLanguage(language.id))}
                                            className="h-4 w-4 text-primary focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                    )}
                                />
                                <label htmlFor={language.id} className="text-sm font-medium text-gray-700">
                                    {language.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={!isValid || loader}
                        className={`flex w-full justify-center font-tbPop rounded-md px-3 py-2.5 text-base font-semibold text-white shadow-sm 
                        ${isValid ? 'bg-primary hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        {loader ? 'Transforming Content...' : 'Transform Content'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransformTabs;
