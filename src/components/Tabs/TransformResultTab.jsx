
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import EditCreateButton from '../Button/EditCreateButton';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { configurationEndPoints } from '../../endPoints/ConfigurationsEndPoint';
import { setTransformedContentResult } from '../../redux/historySlice/historySlice';

const TransformResultTab = ({ transformedContent, handleResetProcess, scraped_id, setLoading }) => {
    const { transformedContentResult, transformedContentId } = useSelector((state) => state.history);

    const [selectedTags, setSelectedTags] = useState(['name', 'price']);
    const dispatch = useDispatch();
    const [accordionIndex, setAccordionIndex] = useState(null);

    const toggleAccordion = (index) => {
        setAccordionIndex(accordionIndex === index ? null : index);
    };

     // Function to convert JSON to CSV format
     const convertToCSV_V2 = (jsonArray) => {
        const headers = Object.keys(jsonArray[0]).join(",");
        const rows = jsonArray.map((obj) =>
            Object.values(obj)
                .map((val) => `"${val}"`)
                .join(",")
        );
        return [headers, ...rows].join("\n");
    };

    const downloadCSV_V2 = (jsonData) => {
        const csvData = convertToCSV_V2(jsonData);
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Generate filename with current date & time
        const now = new Date();
        const formattedDate = now
            .toISOString()
            .replace(/T/, "_") // Replace 'T' with '_'
            .replace(/:/g, "-") // Replace colons with dashes
            .split(".")[0]; // Remove milliseconds
        const fileName = `Scrapped_Content_${formattedDate}.csv`;

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const downloadAction = (contentId) => {
        setLoading(true);
        if (transformedContentResult.length > 0) {
            console.log(transformedContentResult);
            downloadCSV_V2(transformedContentResult)
            // downloadInExcel({ user_scrap_history: transformedContentResult });
            setLoading(false);
        } else {
            try {
                axios.get(`${configurationEndPoints.translation_result_json}${contentId}/`).then((response) => {
                    const payload = {
                        result: response.data.data,
                        id: contentId
                    };
                    dispatch(setTransformedContentResult(payload));
                    // downloadInExcel({ user_scrap_history: payload.result });
                    downloadCSV_V2(payload.result)
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
        console.log("productArray", productArray);
        productArray.map((content) => {
            if (content.content_json.product) {
                content_json_array.push({ [transformedContentResult[0].name]: content.content_json.product })
            } else {
                content_json_array.push({ [transformedContentResult[0].name]: content.content_json })
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
    };

    const getUniqueKeysWithLanguage = (rowData) => {
        const keysSet = new Set();

        rowData.forEach(item => {
            const languagePrefix = item.language.toLowerCase(); // Convert to lowercase for consistency
            Object.keys(item.content_json).forEach(key => {
                keysSet.add(`${languagePrefix}_${key}`); // Prefix keys with language
            });
        });

        return Array.from(keysSet);
    };

    const transformDataForCSV = (rowData) => {
        const transformedItem = {}; // Single row object

        rowData.forEach(item => {
            const languagePrefix = item.language.toLowerCase();

            if (item.content_json && Object.keys(item.content_json).length > 0) {
                Object.keys(item.content_json).forEach(key => {
                    let value = item.content_json[key];

                    // Handle arrays by joining them with a comma
                    if (Array.isArray(value)) {
                        value = value.map(v =>
                            typeof v === "object" ? JSON.stringify(v) : v
                        ).join(", ");
                    }

                    // Handle objects by converting them into key-value pairs
                    else if (typeof value === "object" && value !== null) {
                        value = Object.entries(value)
                            .map(([objKey, objValue]) => `${objKey}: ${objValue}`)
                            .join(" | ");
                    }

                    // Store in the single row object
                    transformedItem[`${languagePrefix}_${key}`] = value;
                });
            }
        });

        return [transformedItem]; // Return as an array containing a single object (one row)
    };

    const generateCSVFile = (headers, rowData) => {
        let csvContent = headers.join(",") + "\n"; // Add header row

        rowData.forEach(historyData => {
            const row = headers.map(header => {
                let value = historyData[header] || ""; // Get value or empty string if undefined
                return Array.isArray(value) ? `"${value.join("; ")}"` : `"${value}"`; // Handle arrays properly
            });
            csvContent += row.join(",") + "\n"; // Add row data
        });

        return csvContent;
    };

    const downloadCSV2 = (csvContent, filename) => {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadInExcel = (rowData) => {
        console.log("rowData", rowData);
        setLoading(true);
        try {
            if (rowData.user_scrap_history.length > 0) {
                if (Object.keys(rowData.user_scrap_history[0].content_json).length === 0) {
                    alert("Scrapped JSON is not generated");
                    setLoading(false);
                } else {
                    const headers = getUniqueKeysWithLanguage(rowData.user_scrap_history);
                    const transformedData = transformDataForCSV(rowData.user_scrap_history, headers);
                    console.log(transformedData);
                    const csvData = generateCSVFile(headers, transformedData);
                    downloadCSV2(csvData, "Scrapped_Data.csv");
                    setLoading(false);
                }
            } else {
                alert("Scrapped JSON is not generated");
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
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
