
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import EditCreateButton from '../Button/EditCreateButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import { setTransformedContentResult } from '../../redux/historySlice/historySlice';

const TransformResultTab = ({ transformedContent, handleResetProcess, scraped_id }) => {
    const { transformedContentResult, transformedContentId } = useSelector((state) => state.history);
    console.log("transformedContentResult", transformedContentResult);
    console.log("transformedContentId", transformedContentId);
    console.log("scraped_id", scraped_id);

    const [selectedTags, setSelectedTags] = useState(['name','price']);

    const dispatch = useDispatch();
    const [accordionIndex, setAccordionIndex] = useState(null);

    const toggleAccordion = (index) => {
        setAccordionIndex(accordionIndex === index ? null : index);
    };

    const downloadAction = (contentId) => {
        if (transformedContentResult.length > 0) {
            downloadCSV(transformedContentResult);
        } else {
            try {
                axios.get(`${configurationEndPoints.translation_result_json}${contentId}/`).then((response) => {
                    const payload = {
                        result: response.data.data,
                        id: contentId
                    };
                    dispatch(setTransformedContentResult(payload));
                    downloadCSV(payload);
                }).catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            };
        }
    };

    const convertToCSV = (productArray) => {
        let headers = new Set();
        let rows = [];
        productArray.forEach(product => {
            console.log(product);
            
            const productName = Object.keys(product)[0];
            console.log("productName-->", productName);
           
            
            const productDetails = product[productName];
            console.log("productDetails-->", productDetails);
            let row = { Name: productName, ...productDetails };
            Object.keys(row).forEach(key => headers.add(key));
            rows.push(row);
        });

        headers = Array.from(headers);

        const newTags = selectedTags.join(', ');
        const newHEaders = findMatchingWords(headers, newTags);

        let csvContent = newHEaders.join(",") + "\n";
        rows.forEach(row => {
            console.log("row", row);
            let rowData = newHEaders.map(header => `"${row[header] || ''}"`).join(",");
            csvContent += rowData + "\n";
        });

        return csvContent;
    };



    const downloadCSV = (productArray) => {
        const content_json_array = [];
        productArray.map((content)=>{
            if(content.content_json.product){
                content_json_array.push({[transformedContentResult[0].name]:content.content_json.product})
            }else{
                content_json_array.push({[transformedContentResult[0].name]:content.content_json})
            }
        });
        
        const csvContent = convertToCSV(content_json_array);
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function findMatchingWords(array, spanishDescription) {
        console.log(array);
        console.log((spanishDescription));
        
        // Convert the description to lowercase for case-insensitive comparison
        const descriptionWords = spanishDescription.toLowerCase().split(/[\s,]+/); // Split by space and comma

        // Filter the array to find words present in the description
        const matchingWords = array.filter(word =>
            descriptionWords.some(descWord => word.toLowerCase().includes(descWord))
        );

        return matchingWords;
    }

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
                            className="flex items-center justify-between px-4 py-3 hover:bg-blue-100 cursor-pointer"
                        >
                            <div>
                                <h5 className="text-blue-600 text-sm font-bold capitalize">
                                    {content?.language}
                                </h5>
                                <h6 className="text-gray-600 text-sm font-semibold capitalize">
                                    {content?.name}
                                </h6>
                            </div>
                            {accordionIndex === index ? (
                                <ChevronUp className="text-blue-600" />
                            ) : (
                                <ChevronDown className="text-blue-600" />
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
