import axios from "axios";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { baseURL } from "../../constants/BaseConfig";
import Extract from "../../components/Forms/Extract";
import TransformTabs from "../../components/Tabs/TransformTabs";
import TransformResultTab from "../../components/Tabs/TransformResultTab";
import PageLoader from "../../components/Loader/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { resetProcess, setScrappedData, setScrappedId, setTransformedContent } from "../../redux/historySlice/historySlice";
import FireCrawler from "../fireCrawler/FireCrawler";
import FireCrawlMap from "../fireCrawler/FireCrawlMap";
import TransformTabsV2 from "../../components/Tabs/TransformTabsV2";
import TransformTabsV3 from "../../components/Tabs/TransformTabsV3";


const Scrapping = () => {
    const dispatch = useDispatch();
    const { tabAccess, scrappedData, tabProcessStarted, userURLS, transformedContent, scrapId } = useSelector((state) => state.history);
    const [selectedTab, setSelectedTab] = useState(0);
    // const [scrappedData, setScrappedData] = useState();
    const [loading, setLoading] = useState(false);
    const tabStyle = 'p-3 cursor-pointer font-tbPop font-medium';
    const activeTabStyle = 'text-primary border-b-2 border-primary outline-0';
    const inActiveTabStyle = 'text-gray-500';
    const tabs = ["Extract", "Transform", "Result"];
    const [isWaiting, setIsWaiting] = useState(false);
    const handleResponseRecieved = (response) => {
        try {
            if (response && response.scraped_data) {
                dispatch(setScrappedData(response.scraped_data));
                dispatch(setScrappedId(response.id));
            }
            if (response && response.id) {
                try {
                    dispatch(setScrappedId(response.id));
                } catch (error) {
                    console.log(error);
                }
            }
            setSelectedTab(1);
        } catch (error) {

            // console.log(error);
        };
    };

    const handleContentTransformed = (transformedContent) => {
        try {
            dispatch(setTransformedContent(transformedContent));
            setSelectedTab(2);
        } catch (error) {
            console.log(error);
        };
    };

    const handleTebSelected = (index) => {
        try {
            const hasAccessTab = tabAccess.find(tab => tab.index === index);
            if (hasAccessTab?.access) {
                setSelectedTab(index);
            };
        } catch (error) {
            console.log(error);
        };
    };

    const handleResetProcess = () => {
        try {
            dispatch(resetProcess());
            setSelectedTab(0);
        } catch (error) {
            console.log("error---->", error);
        };
    };

    return (
        <div className="p-8 bg-white sm:m-5 rounded-xl">
            <Tabs selectedIndex={selectedTab} onSelect={(index) => handleTebSelected(index)}>
                <TabList className="flex space-x-4 border-b">
                    {tabs.map((tab, index) => (
                        <Tab key={index} className={`${tabStyle} ${selectedTab === index ? activeTabStyle : inActiveTabStyle}`}>
                            {tab}
                        </Tab>
                    ))}
                </TabList>

                <TabPanel>
                    {/* <FireCrawler handleResponseRecieved={handleResponseRecieved} setLoading={setLoading} handleResetProcess={handleResetProcess} /> */}
                    <FireCrawlMap handleResponseRecieved={handleResponseRecieved} setLoading={setLoading} handleResetProcess={handleResetProcess} />
                </TabPanel>

                <TabPanel>
                    {/* <TransformTabs scraped_data={scrappedData?.scraped_data} scraped_id={scrapId} handleContentTransformed={handleContentTransformed} setLoading={setLoading} /> */}
                    <TransformTabsV3 scraped_data={scrappedData?.scraped_data} scraped_id={scrapId} handleContentTransformed={handleContentTransformed} setLoading={setLoading} />
                </TabPanel>

                <TabPanel>
                    <TransformResultTab transformedContent={transformedContent} scraped_id={scrapId} handleResetProcess={handleResetProcess} setLoading={setLoading} />
                </TabPanel>
            </Tabs>
            {/* {isWaiting && <PageLoader />} */}
            {loading && <PageLoader />}
        </div>
    );
};

export default Scrapping;
