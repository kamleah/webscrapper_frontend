// import axios from "axios";
// import { Trash } from "iconsax-react";
// import React, { useState } from "react";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// const Scrapping = () => {
//     const [selectedTab, setSelectedTab] = useState(0);
//     const [productNames, setProductNames] = useState([""]);
//     const [fields, setFields] = useState([]);
//     const [pairs, setPairs] = useState([{ url: "", productName: "" }]);

//     const handlePairChange = (index, key, value) => {
//         const updatedPairs = [...pairs];
//         updatedPairs[index][key] = value;
//         setPairs(updatedPairs);
//     };

//     const handleAddPair = () => {
//         setPairs([...pairs, { url: "", productName: "" }]);
//     };

//     const handleRemovePair = (index) => {
//         const updatedPairs = pairs.filter((_, idx) => idx !== index);
//         setPairs(updatedPairs);
//     };

//     const handleFieldChange = (index, value) => {
//         const updatedFields = [...fields];
//         updatedFields[index] = value;
//         setFields(updatedFields);
//     };

//     const handleAddField = () => {
//         setFields([...fields, ""]);
//     };

//     const handleRemoveField = (index) => {
//         const updatedFields = fields.filter((_, idx) => idx !== index);
//         setFields(updatedFields);
//     };
//     const handleSubmit = async () => {
//         console.log(pairs, "pairsfelohd")
//         console.log(fields, "fiedls>>")
//         const payload = {
//             user: 2,
//             urls: pairs.map(item => item.url),
//             search_keywords: pairs.map(item => item.productName),
//             metadata_fields: fields
//         }
//         const response = await axios.post("http://192.168.0.181:8000/scrap/user-scrapping/",payload)
//         console.log(response, "ieen")
//         setSelectedTab(selectedTab+1)
        
//         console.log(payload, "kkkkk")
//     }
//     return (
//         <div className="p-8 bg-white sm:m-5 rounded-xl">
//             <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
//                 <TabList className="flex space-x-4 border-b">
//                     <Tab
//                         className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 0
//                             ? "text-blue-500 border-b-2 border-blue-400 outline-0"
//                             : "text-gray-500"
//                             }`}
//                     >
//                         Extract
//                     </Tab>
//                     <Tab
//                         className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 1
//                             ? "text-blue-500 border-b-2 border-blue-400 outline-0"
//                             : "text-gray-500"
//                             }`}
//                     >
//                         Transform
//                     </Tab>
//                     <Tab
//                         className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 2
//                             ? "text-blue-500 border-b-2 border-blue-400 outline-0"
//                             : "text-gray-500"
//                             }`}
//                     >
//                         Result
//                     </Tab>
//                 </TabList>

//                 <TabPanel>
//                     <div className="mt-5 space-y-3">
//                         {pairs.map((pair, index) => (
//                             <div key={index} className="space-y-4">
//                                 <div className="relative w-full">
//                                     <label className="absolute -top-2 left-3 bg-white px-1 text-gray-700 text-sm font-medium">
//                                         Web URL *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter website URL"
//                                         value={pair.url}
//                                         onChange={(e) => handlePairChange(index, "url", e.target.value)}
//                                         className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
//                                     />
//                                 </div>
//                                 <div className=" w-full">
//                                     <label className=" bg-white px-1 text-gray-700 text-sm font-medium">
//                                         Product Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         placeholder="Enter product name"
//                                         value={pair.productName}
//                                         onChange={(e) =>
//                                             handlePairChange(index, "productName", e.target.value)
//                                         }
//                                         className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
//                                     />
//                                 </div>
//                                 <div className="flex justify-end">
//                                     {index > 0 && (
//                                         <button
//                                             type="button"
//                                             onClick={() => handleRemovePair(index)}
//                                             className="text-red-500 text-sm flex items-center"
//                                         >
//                                             <Trash size="20" />
//                                             <span className="ml-2">Remove</span>
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}

//                         <button
//                             type="button"
//                             onClick={handleAddPair}
//                             className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                         >
//                             + Add URL
//                         </button>
//                         <div className="mt-5 space-y-3">
//                             <label className="block font-medium text-gray-700 mb-2">
//                                 Information to Extract
//                             </label>
//                             {fields.map((field, index) => (
//                                 <div key={index} className="flex items-center mb-2 space-x-2">
//                                     <input
//                                         type="text"
//                                         placeholder="Enter field name"
//                                         value={field.name}
//                                         onChange={(e) =>
//                                             handleFieldChange(index, e.target.value)
//                                         }
//                                         className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
//                                     />
//                                     {/* <input
//                                         type="checkbox"
//                                         checked={field.required}
//                                         onChange={(e) =>
//                                             handleFieldChange(index, "required", e.target.checked)
//                                         }
//                                         className="cursor-pointer"
//                                     /> */}
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveField(index)}
//                                         className="text-red-500 text-sm flex items-center"
//                                     >
//                                         <Trash size="20" />
//                                     </button>
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 onClick={handleAddField}
//                                 className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                             >
//                                 + Add Field
//                             </button>
//                         </div>

//                         <button
//                             type="button"
//                             onClick={handleSubmit}
//                             className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                         >
//                             Extract
//                         </button>
//                     </div>
//                 </TabPanel>

//                 <TabPanel>
//                     <div className="mt-5">Transform content here...</div>
//                 </TabPanel>

//                 <TabPanel>
//                     <div className="mt-5">Result content here...</div>
//                 </TabPanel>
//             </Tabs>
//         </div>
//     );
// };

// export default Scrapping;

import axios from "axios";
import { Trash } from "iconsax-react";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Scrapping = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [urls, setUrls] = useState([""]);
    const [productNames, setProductNames] = useState([""]);
    const [fields, setFields] = useState([""]);

    const handleUrlChange = (index, value) => {
        const updatedUrls = [...urls];
        updatedUrls[index] = value;
        setUrls(updatedUrls);
    };

    const handleProductNameChange = (index, value) => {
        const updatedProductNames = [...productNames];
        updatedProductNames[index] = value;
        setProductNames(updatedProductNames);
    };

    const handleFieldChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index] = value;
        setFields(updatedFields);
    };

    const handleAddUrl = () => {
        setUrls([...urls, ""]);
        setProductNames([...productNames, ""]);
    };

    const handleRemoveUrl = (index) => {
        const updatedUrls = urls.filter((_, idx) => idx !== index);
        const updatedProductNames = productNames.filter((_, idx) => idx !== index);
        setUrls(updatedUrls);
        setProductNames(updatedProductNames);
    };

    const handleAddField = () => {
        setFields([...fields, ""]);
    };

    const handleRemoveField = (index) => {
        const updatedFields = fields.filter((_, idx) => idx !== index);
        setFields(updatedFields);
    };

    const handleSubmit = async () => {
        // Filter out any empty URLs, Product Names, or Fields
        const validUrls = urls.filter(url => url.trim());
        const validProductNames = productNames.filter(name => name.trim());
        const validFields = fields.filter(field => field.trim());

        const payload = {
            user: 2, // Replace with the actual user ID
            urls: validUrls,
            search_keywords: validProductNames,
            metadata_fields: validFields
        };

        console.log("Payload:", JSON.stringify(payload, null, 2));

        try {
            const response = await axios.post(
                "http://192.168.0.181:8000/scrap/user-scrapping/",
                payload
            );
            console.log("Response:", response.data);
            setSelectedTab(selectedTab + 1);
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-8 bg-white sm:m-5 rounded-xl">
            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                <TabList className="flex space-x-4 border-b">
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium ${
                            selectedTab === 0
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                        }`}
                    >
                        Extract
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium ${
                            selectedTab === 1
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                        }`}
                    >
                        Transform
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium ${
                            selectedTab === 2
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                        }`}
                    >
                        Result
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="mt-5 space-y-3">
                        {urls.map((url, index) => (
                            <div key={index} className="space-y-4">
                                <div className="relative w-full">
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-700 text-sm font-medium">
                                        Web URL *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter website URL"
                                        value={url}
                                        onChange={(e) => handleUrlChange(index, e.target.value)}
                                        className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="bg-white px-1 text-gray-700 text-sm font-medium">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        value={productNames[index]}
                                        onChange={(e) =>
                                            handleProductNameChange(index, e.target.value)
                                        }
                                        className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveUrl(index)}
                                            className="text-red-500 text-sm flex items-center"
                                        >
                                            <Trash size="20" />
                                            <span className="ml-2">Remove</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddUrl}
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            + Add URL
                        </button>
                        <div className="mt-5 space-y-3">
                            <label className="block font-medium text-gray-700 mb-2">
                                Information to Extract
                            </label>
                            {fields.map((field, index) => (
                                <div key={index} className="flex items-center mb-2 space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Enter field name"
                                        value={field}
                                        onChange={(e) => handleFieldChange(index, e.target.value)}
                                        className="w-full text-sm border rounded-md px-4 py-3 focus:outline-blue-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(index)}
                                        className="text-red-500 text-sm flex items-center"
                                    >
                                        <Trash size="20" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddField}
                                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                + Add Field
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Extract
                        </button>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="mt-5">Transform content here...</div>
                </TabPanel>

                <TabPanel>
                    <div className="mt-5">Result content here...</div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Scrapping;
