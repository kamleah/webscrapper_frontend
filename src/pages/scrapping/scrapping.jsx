import axios from "axios";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { baseURL } from "../../constants/BaseConfig";
import Extract from "../../components/Forms/Extract";

const Scrapping = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabStyle = 'p-3 cursor-pointer font-tbPop font-medium';
    const activeTabStyle = 'text-blue-500 border-b-2 border-blue-400 outline-0';
    const inActiveTabStyle = 'text-gray-500';
    const tabs = ["Extract", "Transform", "Result"];

    return (
        <div className="p-8 bg-white sm:m-5 rounded-xl">
            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>

                <TabList className="flex space-x-4 border-b">
                    {tabs.map((tab, index) => (
                        <Tab key={index} className={`${tabStyle} ${selectedTab === index ? activeTabStyle : inActiveTabStyle}`}>
                            {tab}
                        </Tab>
                    ))}
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
