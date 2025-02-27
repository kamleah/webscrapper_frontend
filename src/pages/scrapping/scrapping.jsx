import axios from "axios";
import { Trash } from "iconsax-react";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { baseURL } from "../../constants/BaseConfig";
import Extract from "../../components/Forms/Extract";

const Scrapping = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [urls, setUrls] = useState([""]);
    const [productNames, setProductNames] = useState([""]);
    const [fields, setFields] = useState([""]);
    const batch = true;

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
        const validUrls = urls.filter(url => url.trim());
        const validProductNames = productNames.filter(name => name.trim());
        const validFields = fields.filter(field => field.trim());

        const payload = {
            user: 2,
            urls: validUrls,
            search_keywords: validProductNames,
            metadata_fields: validFields
        };

        try {
            const response = await axios.post(`${baseURL}scrap/user-scrapping/`, payload);
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
                        className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 0
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                            }`}
                    >
                        Extract
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 1
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                            }`}
                    >
                        Transform
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium ${selectedTab === 2
                                ? "text-blue-500 border-b-2 border-blue-400 outline-0"
                                : "text-gray-500"
                            }`}
                    >
                        Result
                    </Tab>
                </TabList>

                <TabPanel>
                    <Extract />
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
