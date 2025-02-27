import axios from "axios";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { baseURL } from "../../constants/BaseConfig";
import Extract from "../../components/Forms/Extract";
import TransformTabs from "../../components/Tabs/TransformTabs";
import TransformResultTab from "../../components/Tabs/TransformResultTab";

const Scrapping = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [transformedContent, setTransformedContent] = useState();
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

    const handleContentTransformed = (transformedContent) => {
        try {
            console.log("response recieved -->", transformedContent);
            setTransformedContent(transformedContent);
            setSelectedTab(2);
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
    };

    const transformedContents = [
        {
            "language": "english",
            "name": "TATCHA The Dewy Skin Cream 10ml",
            "content": "Here is the translated information for the product \"TATCHA The Dewy Skin Cream 10ml\" in English:\n\n---\n\n**Product Name:** TATCHA The Dewy Skin Cream 10ml  \n**Price:** £24.00  \n**Description:**  \nWhat it is: A rich cream that feeds skin with plumping hydration and antioxidant-packed Japanese purple rice for a dewy, healthy glow.  \n**Skin Type:** Normal and Dry  \n**Skincare Concerns:** Dryness, Dullness and Uneven Texture, and Loss of Firmness and Elasticity  \n**Formulation:** Rich Cream  \n\n**Highlighted Ingredients:**  \n- **Japanese Purple Rice:** Packed with nutrients and known for its ability to survive any harsh environment, it has long been used to celebrate longevity and vitality; rich in anthocyanin, a strong antioxidant, it helps skin recover from and protect against stress, pollution, and UV damage for healthier-looking skin.  \n- **Okinawa Algae Blend and Hyaluronic Acid:** Captures water to help replenish skin's natural moisture reservoir, immediately leaving skin soft, comforted, and deeply nourished; helps to replenish ceramides to ensure optimum skin barrier function, aiding in the reduction of future moisture loss, for skin that is visibly smooth and plump with hydration.  \n- **Botanical Extracts:** From ginseng, wild thyme, and sweet marjoram; nourishes skin, enhancing its natural ability to retain and release moisture as needed, and imparts a dewy glow.  \n\n**Ingredient Callouts:** This product is cruelty-free and gluten-free.  \n\n**What Else You Need to Know:** This cream intensely hydrates and seals in moisture, helping to replenish ceramides for a healthy bounce and instant luminosity. A fermentation of Japanese anti-aging superfoods—green tea, rice, and algae—helps skin to look its most beautiful at any age.  \n\n**Directions:**  \nScoop a pearl-sized amount of cream with the gold spoon. Massage onto face, neck, and décolletage in upward strokes. Use daily, morning and night.  \n\n**Ingredients:**  \n- **JAPANESE PURPLE RICE:** Packed with nutrients and rich in anthocyanin, a strong antioxidant, this deeply hued grain helps replenish essential hydration to unveil a healthy-looking glow.  \n- **BOTANICAL EXTRACTS & SQUALANE:** A blend of botanical extracts, including ginseng, wild thyme, and sweet marjoram plus squalane, helps moisturize and leave the skin with a dewy glow.  \n- **HADASEI-3:** Our proprietary complex of double-fermented Akita rice, Uji green tea, and Okinawa algae. These ingredients work in harmony to reveal radiant, healthy-looking skin. With essential amino acids, it supports the skin's moisture-keeping factors for a beautiful complexion.\n\n--- \n\n(Note: The information is presented in a clear format with dividers for easy reference.)"
        },
        {
            "language": "french",
            "name": "TATCHA The Dewy Skin Cream 10ml",
            "content": "Here is the translated product information in French, along with dividers for clarity:\n\n---\n\n**TATCHA The Dewy Skin Cream 10ml**  \n**Prix :** £24.00  \n**Description :**  \nCe qu'il est : Une crème riche qui nourrit la peau avec une hydratation repulpante et du riz violet japonais riche en antioxydants pour un éclat sain et lumineux.  \n**Type de peau :** Normale et sèche  \n**Préoccupations de la peau :** Sécheresse, teint terne et texture inégale, perte de fermeté et d'élasticité  \n**Formulation :** Crème riche  \n\n**Ingrédients phares :**  \n- **Riz violet japonais :** Riche en nutriments et connu pour sa capacité à survivre à tout environnement difficile, il a longtemps été utilisé pour célébrer la longévité et la vitalité ; riche en anthocyanines, un puissant antioxydant, il aide la peau à récupérer et à se protéger contre le stress, la pollution et les dommages causés par les UV pour une peau d'apparence plus saine.  \n- **Mélange d'algues d'Okinawa et acide hyaluronique :** Capture l'eau pour aider à reconstituer le réservoir naturel d'humidité de la peau, laissant immédiatement la peau douce, réconfortée et profondément nourrie ; aide à reconstituer les céramides pour garantir un fonctionnement optimal de la barrière cutanée, aidant à réduire la perte future d'humidité, pour une peau visiblement lisse et repulpée d'hydratation.  \n- **Extraits botaniques :** Provenant du ginseng, de la sarriette sauvage et de la marjolaine douce ; nourrit la peau, améliorant sa capacité naturelle à retenir et à libérer de l'humidité selon les besoins, et impartit un éclat lumineux.  \n\n**Informations supplémentaires :** Ce produit est sans cruauté et sans gluten. Ce que vous devez savoir de plus : Cette crème hydrate intensément et scelle l'humidité, aidant à reconstituer les céramides pour un rebond sain et une luminosité instantanée. Une fermentation de super-aliments japonais anti-âge - thé vert, riz et algues - aide la peau à paraître à son meilleur à tout âge.  \n\n**Instructions :**  \nPrélever une quantité de crème de la taille d'une perle avec la cuillère dorée. Massez sur le visage, le cou et le décolleté par mouvements ascendants. Utilisez quotidiennement, matin et soir.  \n\n**Ingrédients :**  \n- **Riz violet japonais :** Riche en nutriments et en anthocyanines, un puissant antioxydant, ce grain profondément coloré aide à reconstituer l'hydratation essentielle pour révéler un éclat d'apparence saine.  \n- **Extraits botaniques et squalane :** Un mélange d'extraits botaniques, y compris le ginseng, la sarriette sauvage et la marjolaine douce ainsi que le squalane, aide à hydrater et laisse la peau avec un éclat lumineux.  \n- **Hadasei-3 :** Notre complexe exclusif de riz Akita doublement fermenté, de thé vert Uji et d'algues d'Okinawa. Ces ingrédients agissent en harmonie pour révéler une peau radieuse et d'apparence saine. Avec des acides aminés essentiels, il soutient les facteurs de rétention d'humidité de la peau pour un teint magnifique.  \n\n--- \n\nFeel free to request additional translations or information!"
        },
        {
            "language": "spanish",
            "name": "TATCHA The Dewy Skin Cream 10ml",
            "content": "---\n\n**TATCHA The Dewy Skin Cream 10ml**  \n**Precio:** £24.00  \n**Descripción:**  \n¿Qué es? Una rica crema que alimenta la piel con hidratación reafirmante y arroz morado japonés lleno de antioxidantes para un brillo saludable y húmedo.  \n**Tipo de piel:** Normal y seca  \n**Preocupaciones de cuidado de la piel:** Sequedad, opacidad y textura desigual, y pérdida de firmeza y elasticidad  \n**Formulación:** Crema rica  \n**Ingredientes destacados:**  \n- **Arroz Morado Japonés:** Lleno de nutrientes y conocido por su capacidad para sobrevivir en cualquier ambiente hostil, se ha utilizado durante mucho tiempo para celebrar la longevidad y la vitalidad; rico en antocianina, un fuerte antioxidante, ayuda a la piel a recuperarse y protegerse contra el estrés, la contaminación y el daño UV para una piel de aspecto más saludable.  \n- **Mezcla de Algas de Okinawa y Ácido Hialurónico:** Captura agua para ayudar a reponer el reservorio natural de humedad de la piel, dejando la piel suave, cómoda y profundamente nutrida; ayuda a reponer ceramidas para asegurar el óptimo funcionamiento de la barrera cutánea, ayudando a reducir la pérdida de humedad futura, para una piel visiblemente suave y llena de hidratación.  \n- **Extractos Botánicos:** De ginseng, tomillo silvestre y mejorana dulce; nutre la piel, mejorando su capacidad natural para retener y liberar humedad según sea necesario, e imparte un brillo húmedo.  \n**Llamados de ingredientes:** Este producto es libre de crueldad y sin gluten.  \n**Lo que necesitas saber:** Esta crema hidrata intensamente y sella la humedad, ayudando a reponer ceramidas para un rebote saludable y luminosidad instantánea. Una fermentación de superalimentos japoneses anti-envejecimiento: té verde, arroz y algas, ayuda a que la piel luzca lo más hermosa posible a cualquier edad.  \n**Instrucciones:**  \nSaca una cantidad del tamaño de una perla de crema con la cuchara dorada. Masajea en el rostro, cuello y escote con movimientos ascendentes. Usar diariamente, mañana y noche.  \n**Ingredientes:**  \n**ARROZ MORADO JAPONES:** LLENO DE NUTRIENTES Y RICO EN ANTOCIANINA, UN FUERTE ANTIOXIDANTE, ESTE GRANO DE COLOR PROFUNDO AYUDA A REABASTECER LA HIDRATACIÓN ESENCIAL PARA DESCUBRIR UN BRILLO DE APARIENCIA SALUDABLE.  \n**EXTRACTOS BOTÁNICOS Y ESCUALANO:** UNA MEZCLA DE EXTRACTOS BOTÁNICOS, INCLUYENDO GINSENG, TOMILLO SILVESTRE Y MEJORANA DULCE MÁS ESCUALANO, AYUDAN A HIDRATAR Y DEJAR LA PIEL CON UN BRILLO HUMEDO.  \n**HADASEI-3:** NUESTRO COMPLEJO PROPIETARIO DE ARROZ AKITA DOBLEMENTE FERMENTADO, TÉ VERDE UJI Y ALGAS DE OKINAWA. ESTOS INGREDIENTES TRABAJAN EN ARMONÍA PARA REVELAR UNA PIEL RADIANTE Y DE APARIENCIA SALUDABLE. CON AMINOÁCIDOS ESENCIALES, APOYA LOS FACTORES DE RETENCIÓN DE HUMEDAD DE LA PIEL PARA UNA COMPLECCIÓN BELLA.  \n\n---"
        },
        {
            "language": "german",
            "name": "TATCHA The Dewy Skin Cream 10ml",
            "content": "Here's the translation of the product information into German:\n\n---\n\n**TATCHA The Dewy Skin Cream 10ml**  \n**Preis:** £24.00  \n**Beschreibung:**  \nWas es ist: Eine reichhaltige Creme, die die Haut mit feuchtigkeitsspendender und antioxidativ wirkender japanischer lila Reis nährt, um einen dewy, gesunden Glanz zu verleihen.  \n**Hauttyp:** Normal und Trocken  \n**Hautpflegeanliegen:** Trockenheit, Mattheit und unebene Textur sowie Verlust von Festigkeit und Elastizität  \n**Formulierung:** Reichhaltige Creme\n\n**Hervorzuhebende Inhaltsstoffe:**  \n- **Japanischer lila Reis:** Vollgepackt mit Nährstoffen und bekannt für seine Fähigkeit, in jeder rauen Umgebung zu überleben. Er wird seit langem verwendet, um Langlebigkeit und Vitalität zu feiern; reich an Anthocyanin, einem starken Antioxidans, hilft er der Haut, sich von Stress, Umweltverschmutzung und UV-Schäden zu erholen und schützt sie, für sichtbar gesündere Haut.  \n- **Okinawa-Algenmischung und Hyaluronsäure:** Fängt Wasser ein, um die natürliche Feuchtigkeitsreserve der Haut wieder aufzufüllen, und hinterlässt die Haut sofort weich, beruhigt und tief genährt; hilft, Ceramide wieder aufzufüllen, um eine optimale Hautbarrierefunktion zu gewährleisten und zukünftigen Feuchtigkeitsverlust zu reduzieren, für sichtbar glatte und pralle Haut mit Hydratation.  \n- **Botanische Extrakte:** Aus Ginseng, wildem Thymian und süßem Majoran; nähren die Haut und verbessern ihre natürliche Fähigkeit, Feuchtigkeit nach Bedarf zu behalten und freizusetzen, und verleihen einen dewy Glanz.  \n\n**Zutatenhinweise:** Dieses Produkt ist tierversuchsfrei und glutenfrei.  \n**Was Sie sonst noch wissen sollten:** Diese Creme hydratisiert intensiv und versiegelt die Feuchtigkeit, hilft, Ceramide für einen gesunden Bounce und sofortige Leuchtkraft wieder aufzufüllen. Eine Fermentation von japanischen Anti-Aging-Superfoods - Grüntee, Reis und Algen - hilft der Haut, in jedem Alter am schönsten auszusehen.  \n\n**Anwendung:**  \nNehmen Sie eine erbsengroße Menge Creme mit dem goldenen Löffel. Massieren Sie sie mit Aufwärtsbewegungen auf Gesicht, Hals und Dekolleté ein. Täglich morgens und abends verwenden.  \n\n**Zutaten:**  \n**JAPANISCHER LILA REIS:** VOLLGEPACKT MIT NÄHRSTOFFEN UND REICH AN ANTHOCYANIN, EINEM STARKEN ANTIOXIDANS, HILFT DIESER TIEF FARBIGE REIS, ESSENTIELLE FEUCHTIGKEIT WIEDER HERZUSTELLEN UND EINEN GESUND AUSSEHENDEN GLANZ ZU ENTHÜLLEN.  \n**BOTANISCHE EXTRAKTE & SQUALAN:** Eine Mischung aus botanischen Extrakten, einschließlich Ginseng, wildem Thymian und süßem Majoran sowie Squalan, hilft, die Haut zu befeuchten und einen dewy Glanz zu verleihen.  \n**HADASEI-3:** Unser proprietärer Komplex aus doppelt fermentiertem Akita-Reis, Uji-Grüntee und Okinawa-Algen. Diese Inhaltsstoffe wirken harmonisch zusammen, um strahlende, gesund aussehende Haut zu enthüllen. Mit essentiellen Aminosäuren unterstützt es die Feuchtigkeitserhaltungsfaktoren der Haut für einen schönen Teint.\n\n--- \n\nFeel free to let me know if you need further assistance!"
        },
        {
            "language": "japanese",
            "name": "TATCHA The Dewy Skin Cream 10ml",
            "content": "Here is the translated information for the product \"TATCHA The Dewy Skin Cream 10ml\" in Japanese, along with appropriate separators for clarity:\n\n---\n\n**URL:** [TATCHA The Dewy Skin Cream 10ml](https://www.sephora.co.uk/p/tatcha-the-dewy-skin-cream-10ml)\n\n**商品名:** TATCHA ザ・デューイ スキン クリーム 10ml\n\n**価格:** £24.00\n\n**説明:**\n何か: 肌に潤いを与え、抗酸化物質を豊富に含む日本の紫米を使用したリッチクリームで、 dewyで健康的な輝きを与えます。  \n肌タイプ: 普通肌および乾燥肌  \nスキンケアの懸念: 乾燥、くすみと不均一なテクスチャー、ハリと弾力の喪失  \nフォーミュレーション: リッチクリーム  \n\n**ハイライト成分:**\n- **日本の紫米:** 栄養が豊富で、過酷な環境でも生き延びることで知られており、長寿と活力の象徴として古くから使用されています。強力な抗酸化物質であるアントシアニンが豊富で、肌がストレス、汚染、UVダメージから回復し、健康的に見える肌を保つのを助けます。  \n- **沖縄藻類ブレンドとヒアルロン酸:** 水分を捕らえ、肌の自然な水分貯蔵を補充し、すぐに肌を柔らかく、快適に、そして深く栄養を与えます。セラミドを補充し、将来の水分喪失を減少させ、目に見えるほど滑らかで水分をたっぷりと含んだ肌を実現します。  \n- **植物エキス:** 人参、野生タイム、スイートマジョラムからのエキスが肌を栄養し、自然な水分の保持と放出能力を高め、dewyな輝きを与えます。  \n\n**成分の呼びかけ:** この製品は動物実験を行っておらず、グルテンフリーです。\n\n**その他知っておくべきこと:** このクリームは、密に水分を補給し、セラミドを補充して健康な弾力と瞬時の luminosityを助けます。日本の抗老化スーパーフードである緑茶、米、藻類の発酵は、あらゆる年齢で肌が最も美しく見えるのを助けます。\n\n**使用方法:** ゴールドスプーンでパールサイズのクリームをすくい、顔、首、デコルテに上向きのストロークでマッサージします。毎日、朝晩使用します。\n\n**成分:**\n- **日本の紫米:** 栄養が豊富で、アントシアニンが豊富なこの深い色の穀物は、必要な水分を補充し、健康的な輝きを引き出します。  \n- **植物エキスとスクワラン:** 人参、野生タイム、スイートマジョラムを含む植物エキスのブレンドにスクワランを加え、肌を潤し、dewyな輝きを与えます。  \n- **ハダセイ-3:** 二重発酵された秋田米、宇治緑茶、沖縄藻類の独自の複合体です。これらの成分が調和して、輝かしく健康的な肌を引き出します。必須アミノ酸を含み、肌の水分保持因子をサポートし、美しい肌になれます。\n\n--- \n\nThis completes the translation into Japanese, with clear separations for easy identification of the product details."
        },
        {
            "language": "english",
            "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
            "content": "### RARE BEAUTY Soft Pinch Liquid Blush 7.5ml\n\n**Price:** £22.00\n\n**Description:**  \nA weightless, long-lasting Soft Pinch Liquid Blush that blends and builds beautifully for a soft, healthy flush. Create a pinch-perfect flush using this featherweight formula infused with long-lasting pigments that last all day. This liquid blush blends beautifully to create soft, buildable colour with a natural, second-skin finish.  \n**Vegan:** Products made without animal-based ingredients.  \n\n**Directions:**  \n- Gently remove excess product from applicator.  \n- Use the doe-foot applicator and place one or two dots on each cheek.  \n- Use fingertips and gently pat into skin for a seamless finish.\n\n**Ingredients:**  \nHYDROGENATED POLYISOBUTENE, HYDROGENATED POLY(C6-14 OLEFIN), MICA, OCTYLDODECANOL, ETHYLENE/PROPYLENE/STYRENE COPOLYMER, TRIMETHYLSILOXYSILICATE, ISODODECANE, 1,2-HEXANEDIOL, DISTEARDIMONIUM HECTORITE, SORBITAN SESQUIOLEATE, PROPYLENE CARBONATE, TRIETHOXYCAPRYLYLSILANE, ALUMINUM HYDROXIDE, HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL, GARDENIA FLORIDA FRUIT EXTRACT, NELUMBO NUCIFERA (SACRED LOTUS) FLOWER EXTRACT, NYMPHAEA ODORATA ROOT EXTRACT.  \n<+/- MAY CONTAIN/PEUT CONTENIR: IRON OXIDES (CI 77491), RED 7 LAKE (CI 15850), YELLOW 6 LAKE (CI 15985), TITANIUM DIOXIDE (CI 77891), YELLOW 5 LAKE (CI 19140), RED 28 LAKE (CI 45410).\n\n---\n\n(Note: The original text is already in English, so there is no translation required. The product details have been formatted as requested.)"
        },
        {
            "language": "french",
            "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
            "content": "---\n\n**RARE BEAUTY Soft Pinch Liquid Blush 7.5ml**  \n**Prix :** £22.00  \n**Description :** Un blush liquide Soft Pinch léger et longue tenue qui se mélange et se construit magnifiquement pour un éclat sain et doux. Créez un éclat parfait avec cette formule ultra légère infusée de pigments longue durée qui durent toute la journée. Ce blush liquide se mélange magnifiquement pour créer une couleur douce et modulable avec une finition naturelle et seconde peau.  \n**Vegan :** Produits fabriqués sans ingrédients d'origine animale.  \n**Instructions :**  \n- Retirez délicatement l'excès de produit de l'applicateur.  \n- Utilisez l'applicateur en forme de doe-foot et placez un ou deux points sur chaque joue.  \n- Utilisez vos doigts et tapotez doucement sur la peau pour une finition homogène.  \n**Ingrédients :**  \nHYDROGENATED POLYISOBUTENE, HYDROGENATED POLY(C6-14 OLEFIN), MICA, OCTYLDODECANOL, ETHYLENE/PROPYLENE/STYRENE COPOLYMER, TRIMETHYLSILOXYSILICATE, ISODODECANE, 1,2-HEXANEDIOL, DISTEARDIMONIUM HECTORITE, SORBITAN SESQUIOLEATE, PROPYLENE CARBONATE, TRIETHOXYCAPRYLYLSILANE, ALUMINUM HYDROXIDE, HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL, GARDENIA FLORIDA FRUIT EXTRACT, NELUMBO NUCIFERA (SACRED LOTUS) FLOWER EXTRACT, NYMPHAEA ODORATA ROOT EXTRACT.  \n<+/- PEUT CONTENIR : OXYDES DE FER (CI 77491), LAQUE ROUGE 7 (CI 15850), LAQUE JAUNE 6 (CI 15985), DIOXYDE DE TITANE (CI 77891), LAQUE JAUNE 5 (CI 19140), LAQUE ROUGE 28 (CI 45410).  \n\n---"
        },
        {
            "language": "spanish",
            "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
            "content": "**RARE BEAUTY Soft Pinch Liquid Blush 7.5ml**  \n**Precio:** £22.00  \n**Descripción:** Un rubor líquido Soft Pinch de larga duración y ligero que se mezcla y construye maravillosamente para un toque de color saludable y suave. Crea un rubor perfecto utilizando esta fórmula ligera infundida con pigmentos de larga duración que duran todo el día. Este rubor líquido se mezcla bellamente para crear un color suave y construible con un acabado natural de segunda piel.  \n**Vegano:** Productos hechos sin ingredientes de origen animal.  \n\n**Instrucciones:**  \n- Retire suavemente el exceso de producto del aplicador.  \n- Use el aplicador de doe-foot y coloque uno o dos puntos en cada mejilla.  \n- Use las yemas de los dedos y dé golpecitos suavemente en la piel para un acabado sin costuras.  \n\n**Ingredientes:**  \nHIDROGENADO POLISOBUTENO, HIDROGENADO POLI(C6-14 OLEFINA), MICA, OCTILDODECANOL, COPOLÍMERO DE ETILENO/PROPILENO/ESTIRENO, TRIMETILSILOXISILICATO, ISODODECANO, 1,2-HEXANODIOL, DISTEARDIMONIUM HECTORITA, SESQUIOLEATO DE SORBITÁN, CARBONATO DE PROPYLENE, TRIETOXICAPRILILOSILANO, HIDRÓXIDO DE ALUMINIO, ACEITE DE SEMILLA DE HELIANTHUS ANNUUS (GIRASOL), EXTRACTO DE FRUTO DE GARDENIA FLORIDA, EXTRACTO DE FLORES DE NELUMBO NUCIFERA (LOTO SAGRADO), EXTRACTO DE RAÍZ DE NYMPHAEA ODORATA.  \n<+/- PUEDE CONTENER: ÓXIDOS DE HIERRO (CI 77491), LACA ROJA 7 (CI 15850), LACA AMARILLA 6 (CI 15985), DIOXIDO DE TITANIO (CI 77891), LACA AMARILLA 5 (CI 19140), LACA ROJA 28 (CI 45410)>  \n---"
        },
        {
            "language": "german",
            "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
            "content": "Here is the translated information for the RARE BEAUTY Soft Pinch Liquid Blush in German:\n\n---\n\n**RARE BEAUTY Soft Pinch Liquid Blush 7.5ml**\n\n**Preis:** £22.00\n\n**Beschreibung:**  \nEin schwereloser, langanhaltender Soft Pinch Liquid Blush, der wunderschön verblendet und aufbaut für eine sanfte, gesunde Röte. Erstellen Sie eine perfekt abgestimmte Röte mit dieser federleichten Formel, die mit langanhaltenden Pigmenten angereichert ist, die den ganzen Tag halten. Dieser flüssige Blush verblendet wunderschön und schafft sanfte, aufbaubare Farbe mit einem natürlichen, zweiten Haut-Finish.  \n\n**Vegan:** Produkte, die ohne tierische Inhaltsstoffe hergestellt werden.  \n\n**Anwendung:**  \n- Entfernen Sie vorsichtig überschüssiges Produkt vom Applikator.  \n- Verwenden Sie den Doe-Foot-Applikator und platzieren Sie ein oder zwei Punkte auf jeder Wange.  \n- Verwenden Sie die Fingerspitzen und klopfen Sie sanft in die Haut für ein nahtloses Finish.  \n\n**Inhaltsstoffe:**  \nHYDROGENATED POLYISOBUTENE, HYDROGENATED POLY(C6-14 OLEFIN), MICA, OCTYLDODECANOL, ETHYLENE/PROPYLENE/STYRENE COPOLYMER, TRIMETHYLSILOXYSILICATE, ISODODECANE, 1,2-HEXANEDIOL, DISTEARDIMONIUM HECTORITE, SORBITAN SESQUIOLEATE, PROPYLENE CARBONATE, TRIETHOXYCAPRYLYLSILANE, ALUMINUM HYDROXIDE, HELIANTHUS ANNUUS (SONNENBLUMEN) SAMENÖL, GARDENIA FLORIDA FRUCHTEXTRAKT, NELUMBO NUCIFERA (HEILIGE LOTUS) BLÜTENEXTRAKT, NYMPHAEA ODORATA WURZELEXTRAKT. <+/- KANN ENTHALTEN: EISENOXIDE (CI 77491), ROT 7 LAKE (CI 15850), GELB 6 LAKE (CI 15985), TITANDIOXID (CI 77891), GELB 5 LAKE (CI 19140), ROT 28 LAKE (CI 45410)>.\n\n--- \n\nFeel free to let me know if you need further translations or additional assistance!"
        },
        {
            "language": "japanese",
            "name": "RARE BEAUTY Soft Pinch Liquid Blush 7.5ml",
            "content": "---\n\n**RARE BEAUTY Soft Pinch Liquid Blush 7.5ml**  \n**価格**: £22.00  \n**説明**: ウェイトレスで長持ちするソフトピンチリキッドブラッシュで、柔らかく健康的なフラッシュを美しくブレンドし、構築します。この軽量フォーミュラは、終日持続する長持ちする顔料を使用して完璧なフラッシュを作り出します。このリキッドブラッシュは、美しくブレンドされ、自然でセカンドスキンの仕上がりで、柔らかくビルド可能なカラーを実現します。  \n**ビーガン**: 動物由来の成分を使用していない製品。  \n**使用方法**: - アプリケーターから余分な製品を優しく取り除きます。 - ドーフットアプリケーターを使用して、両頬に1〜2滴を置きます。 - 指先を使って肌に優しくたたき込んで、シームレスな仕上がりにします。  \n**成分**: HYDROGENATED POLYISOBUTENE, HYDROGENATED POLY(C6-14 OLEFIN), MICA, OCTYLDODECANOL, ETHYLENE/PROPYLENE/STYRENE COPOLYMER, TRIMETHYLSILOXYSILICATE, ISODODECANE, 1,2-HEXANEDIOL, DISTEARDIMONIUM HECTORITE, SORBITAN SESQUIOLEATE, PROPYLENE CARBONATE, TRIETHOXYCAPRYLYLSILANE, ALUMINUM HYDROXIDE, HELIANTHUS ANNUUS (SUNFLOWER) SEED OIL, GARDENIA FLORIDA FRUIT EXTRACT, NELUMBO NUCIFERA (SACRED LOTUS) FLOWER EXTRACT, NYMPHAEA ODORATA ROOT EXTRACT. <+/- MAY CONTAIN/PEUT CONTENIR: IRON OXIDES (CI 77491), RED 7 LAKE (CI 15850), YELLOW 6 LAKE (CI 15985), TITANIUM DIOXIDE (CI 77891), YELLOW 5 LAKE (CI 19140), RED 28 LAKE (CI 45410)>.\n\n---"
        }
    ];

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
                    <TransformTabs scraped_data={scrapedData.scraped_data} scraped_id={scrapedData.scraped_id} handleContentTransformed={handleContentTransformed} />
                </TabPanel>

                <TabPanel>
                    <TransformResultTab transformedContent={transformedContents} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Scrapping;
