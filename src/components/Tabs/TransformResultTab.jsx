
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import EditCreateButton from '../Button/EditCreateButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import { setTransformedContentResult } from '../../redux/historySlice/historySlice';
import { exportToExcel } from '../../utils/constant';

const TransformResultTab = ({ transformedContent, handleResetProcess, scraped_id, setLoading }) => {
    const { transformedContentResult, transformedContentId } = useSelector((state) => state.history);

    const [selectedTags, setSelectedTags] = useState(['name', 'price']);
    const dispatch = useDispatch();
     const { accessToken } = useSelector((state) => state.auth);
    const [accordionIndex, setAccordionIndex] = useState(null);

    const toggleAccordion = (index) => {
        setAccordionIndex(accordionIndex === index ? null : index);
    };

    const downloadAction = (contentId) => {
        setLoading(true);
        if (transformedContentResult.length > 0) {
            exportToExcel(transformedContentResult)
            // downloadInExcel({ user_scrap_history: transformedContentResult });
            setLoading(false);
        } else {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
                axios.get(`${configurationEndPoints.firecrawl_scrap_download}${contentId}/`, config).then((response) => {
                    const payload = {
                        result: response.data.data,
                        id: contentId
                    };
                    dispatch(setTransformedContentResult(payload));
                    // downloadInExcel({ user_scrap_history: payload.result });
                    exportToExcel(payload.result)
                    setLoading(false);
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
            } catch (error) {
                console.log(error);
                setLoading(false);
            };
        }
    };
    
    return (
        <div className="my-4 space-y-4">
            <div className="flex justify-end">
                <EditCreateButton title="Download" buttonType="create" toggle={() => downloadAction(scraped_id)} />
                <button onClick={() => handleResetProcess()} className="bg-red-500 hover:bg-red-700  text-white px-6 py-2 rounded-md ml-1">
                    Reset Process
                </button>
            </div>
            {transformedContent?.map((content, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="flex items-center justify-between px-4 py-3 hover:bg-orange-100 cursor-pointer"
                        >
                            <div>
                                <h5 className="text-primary-600 text-sm font-bold capitalize">
                                    {content?.language}
                                </h5>
                                <h6 className="text-gray-600 text-sm font-semibold capitalize">
                                    {content?.name}
                                </h6>
                            </div>
                            {accordionIndex === index ? (
                                <ChevronUp className="text-primary" />
                            ) : (
                                <ChevronDown className="text-primary" />
                            )}
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out ${accordionIndex === index
                                ? "max-h-[300px] p-4 bg-white overflow-y-auto"
                                : "max-h-0 overflow-hidden"
                                }`}
                        >
                            <p className="text-sm text-gray-700">
                                <Markdown>{content?.content}</Markdown>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransformResultTab;
