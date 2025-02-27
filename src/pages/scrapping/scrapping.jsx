import axios from "axios";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { baseURL } from "../../constants/BaseConfig";
import Extract from "../../components/Forms/Extract";
import TransformTabs from "../../components/Tabs/TransformTabs";

const Scrapping = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabStyle = 'p-3 cursor-pointer font-tbPop font-medium';
    const activeTabStyle = 'text-blue-500 border-b-2 border-blue-400 outline-0';
    const inActiveTabStyle = 'text-gray-500';
    const tabs = ["Extract", "Transform", "Result"];

    const handleResponseRecieved = (response) => {
        try {
            console.log("response recieved -->", response);
            setSelectedTab(1);
        } catch (error) {
            console.log(error);
        };
    };

    const scrapedData = {
        "scraped_data": [
            {
                "price": "£24.00",
                "name": "TATCHA The Dewy Skin Cream 10ml",
                "description": "What it is: A rich cream that feeds skin with plumping hydration and antioxidant-packed Japanese purple rice for a dewy, healthy glow.Skin Type: Normal and DrySkincare Concerns: Dryness, Dullness and Uneven Texture, and Loss of Firmness and ElasticityFormulation: Rich CreamHighlighted Ingredients:- Japanese Purple Rice: Packed with nutrients and known for its ability to survive any harsh environment, it has long been used to celebrate longevity and vitality; rich in anthocyanin, a strong antioxidant, it helps skin recover from and protect against stress, pollution, and UV damage for healthier-looking skin.- Okinawa Algae Blend and Hyaluronic Acid: Captures water to help replenish skin's natural moisture reservoir, immediately leaving skin soft, comforted, and deeply nourished; helps to replenish ceramides to ensure optimum skin barrier function, aiding in the reduction of future moisture loss, for skin that is visibly smooth and plump with hydration.- Botanical Extracts: From ginseng, wild thyme, and sweet marjoram; nourishes skin, enhancing its natural ability to retain and release moisture as needed, and imparts a dewy glow.Ingredient Callouts: This product is cruelty-free, and gluten-free.What Else You Need to Know: This cream intensely hydrates and seals in moisture, helping to replenish ceramides for a healthy bounce and instant luminosity. A fermentation of Japanese anti-aging superfoods-green tea, rice, and algae-helps skin to look its most beautiful at any age.DirectionsScoop a pearl-sized amount of cream with the gold spoon. Massage onto face, neck and décolletage in upward strokes. Use daily, morning and night.IngredientsJAPANESE PURPLE RICE: PACKED WITH NUTRIENTS AND RICH IN ANTHOCYANIN, A STRONG ANTIOXIDANT, THIS DEEPLY HUED GRAIN HELPS REPLENISH ESSENTIAL HYDRATION TO UNVEIL A HEALTHY-LOOKING GLOW.BOTANICAL EXTRACTS & SQUALANE: A BLEND OF BOTANICAL EXTRACTS, INCLUDING GINSENG, WILD THYME, AND SWEET MARJORAM PLUS SQUALANE, HELP MOISTURIZE AND LEAVE THE SKIN WITH A DEWY GLOW.HADASEI-3: OUR PROPRIETARY COMPLEX OF DOUBLE-FERMENTED AKITA RICE, UJI GREEN TEA, AND OKINAWA ALGAE. THESE INGREDIENTS WORK IN HARMONY TO REVEAL RADIANT, HEALTHY-LOOKING SKIN. WITH ESSENTIAL AMINO ACIDS, IT SUPPORTS THE SKIN'S MOISTURE-KEEPING FACTORS FOR A BEAUTIFUL COMPLEXION."
            },
            {
                "price": "£22.00",
                "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
                "description": "A weightless, long-lasting Soft Pinch Liquid Blush that blends and builds beautifully for a soft, healthy flush.Create a pinch-perfect flush using this featherweight formula infused with long-lasting pigments that last all day. This liquid blush blends beautifully to create soft, buildable colour with a natural, second-skin finish.Vegan :Products made without animal-based ingredients.Directions- Gently remove excess product from applicator.- Use the doe-foot applicator and place one or two dots on each cheek.- Use fingertips and gently pat into skin for a seamless finish.IngredientsHYDROGENATED POLYISOBUTENE, HYDROGENATED POLY(C6-14 OLEFIN), MICA, OCTYLDODECANOL, ETHYLENE/PROPYLENE/STYRENE COPOLYMER, TRIMETHYLSILOXYSILICATE, ISODODECANE, 1,2-HEXANEDIOL, DISTEARDIMONIUM HECTORITE, SORBITAN SESQUIOLEATE, PROPYLENE CARBONATE, TRIETHOXYCAPRYLYLSILANE, ALUMINUM HYDROXIDE, HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL, GARDENIA FLORIDA FRUIT EXTRACT, NELUMBO NUCIFERA (SACRED LOTUS) FLOWER EXTRACT, NYMPHAEA ODORATA ROOT EXTRACT. <+/- MAY CONTAIN/PEUT CONTENIR: IRON OXIDES (CI 77491), RED 7 LAKE (CI 15850), YELLOW 6 LAKE (CI 15985), TITANIUM DIOXIDE (CI 77891), YELLOW 5 LAKE (CI 19140), RED 28 LAKE (CI 45410)>."
            }
        ],
        "scraped_id": 18
    }

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
                    <Extract handleResponseRecieved={handleResponseRecieved} />
                </TabPanel>

                <TabPanel>
                    <TransformTabs scraped_data={scrapedData.scraped_data} scraped_id={scrapedData.scraped_id}  />
                </TabPanel>

                <TabPanel>
                    <div className="mt-5">Result content here...</div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Scrapping;
