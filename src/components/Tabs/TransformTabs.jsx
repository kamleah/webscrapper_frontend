import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TransformTabs = ({ scraped_data, scraped_id, handleContentTransformed, setLoading }) => {
    const [scrappedData, setScrappedData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [accordian, setAccordian] = useState(null);
    const toggleAccordion = (index) => {
        setAccordian(accordian === index ? null : index);
    };
    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            languages: [],
        }
    });

    const languages = [
        { id: 'spanish', label: 'Spanish' },
        { id: 'japanese', label: 'Japanese' },
        { id: 'french', label: 'French' },
        { id: 'german', label: 'German' },
    ];

    const GetScrapDetails = (scrapId) => {
        try {
            setLoading(true);
            axios.get(`${configurationEndPoints.user_scrap_by_id}${scrapId}/`)
                .then((response) => {
                    setScrappedData(response.data.data.scraped_data.scrap_data);
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
        setLoader(true);
        setLoading(true);
        data.content_id = scraped_id;
        data.languages = ["english", ...data.languages]
        axios.post(configurationEndPoints.translate_content, data).then((response) => {
            handleContentTransformed(response.data.data);
            setLoader(false);
            setLoading(false);
        }).catch((error) => {
            setLoader(false);
            setLoading(false);
        });
    };

    

    return (
        <div>
            <div className='my-5'>
                {scrappedData.map((data, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg mb-4 shadow-sm overflow-hidden"
                    >
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="flex items-center justify-between p-4 hover:bg-blue-50 cursor-pointer"
                        >
                            <h3 className="text-blue-600 text-sm font-bold">
                                {index + 1}. {data.name} - {data.price}
                            </h3>
                            {accordian === index ? (
                                <ChevronUp className="text-blue-600" />
                            ) : (
                                <ChevronDown className="text-blue-600" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-300 ${accordian === index
                                ? "max-h-[300px] p-4 bg-white overflow-y-auto"
                                : "max-h-0 overflow-hidden"
                                }`}
                        >
                            <h5 className="text-blue-600 mb-2 text-sm font-bold">Description</h5>
                            <p className="text-sm text-gray-700">{data.description}</p>
                            <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline mt-2 block"
                            >
                                View Product
                            </a>
                        </div>
                    </div>
                ))}
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Select Languages</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {languages.map((language) => (
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
                                            checked={field.value.includes(language.id)}
                                            onChange={() => {
                                                const newValue = field.value.includes(language.id)
                                                    ? field.value.filter((lang) => lang !== language.id)
                                                    : [...field.value, language.id];
                                                field.onChange(newValue);
                                            }}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                        ${isValid ? 'bg-blue-500 hover:bg-sky-500' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        {loader ? 'Transforming Content...' : 'Transform Content'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransformTabs;
