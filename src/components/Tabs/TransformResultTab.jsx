
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import EditCreateButton from '../Button/EditCreateButton';

const TransformResultTab = ({ transformedContent }) => {
    const [accordionIndex, setAccordionIndex] = useState(null);

    const toggleAccordion = (index) => {
        setAccordionIndex(accordionIndex === index ? null : index);
    };

    function extractDynamicData() {
        const data = {};

        // Extract all headings and their next elements
        document.querySelectorAll("strong").forEach((strongTag) => {
            const key = strongTag.innerText.replace(":", "").trim().toLowerCase().replace(/\s+/g, "_"); // Normalize key
            let value = strongTag.parentElement.innerText.replace(strongTag.innerText, "").trim(); // Get value

            // Check if the next element is a list (<ul>)
            let nextElement = strongTag.parentElement.nextElementSibling;
            if (nextElement && nextElement.tagName === "UL") {
                value = Array.from(nextElement.querySelectorAll("li")).map(li => li.innerText.trim()); // Extract list items
            }

            data[key] = value; // Store in JSON object
        });

        // Extract Language and Name (they are outside <strong> tags)
        const languageElement = document.querySelector("h5.text-blue-600");
        if (languageElement) data.language = languageElement.innerText.trim();

        const nameElement = document.querySelector("h6.text-gray-600");
        if (nameElement) data.name = nameElement.innerText.trim();
        const output = JSON.stringify(data, null, 4);
        console.log(output);


        // return JSON.stringify(data, null, 4);
    }


    const parseMarkdownToJson = (markdown) => {
        // const data = {};
        // const lines = markdown.split("\n");
        const lines =markdown
        console.log("lines--->", lines);
        
        let currentKey = null; // Track the active key
        let listMode = false;  // Track if we are in a list
    
        lines.forEach(line => {

            // Match "**Key:** Value" pattern (bolded headings)
            const keyValueMatch = line.match(/\*\*(.*?)\*\*:\s*(.+)/);
            
            if (keyValueMatch) {
                currentKey = keyValueMatch[1].toLowerCase().replace(/\s+/g, "_"); // Convert to snake_case
                data[currentKey] = keyValueMatch[2].trim();
                listMode = false; // Reset list mode
            }
            // Match list items (e.g., "- Benefit 1")
            else if (line.match(/^-\s(.+)/)) {
                if (currentKey) {
                    if (!Array.isArray(data[currentKey])) {
                        data[currentKey] = []; // Convert to an array for list items
                    }
                    data[currentKey].push(line.replace(/^- /, "").trim());
                }
            }
            // Handle multi-line descriptions or additional text
            else if (currentKey && line.trim() !== "") {
                if (Array.isArray(data[currentKey])) {
                    data[currentKey].push(line.trim()); // Append to array if it's a list
                } else {
                    data[currentKey] += " " + line.trim(); // Append additional text to string
                }
            }
        });

        console.log("data====>", data);
        
    
        // return data;
    };

    const testingData = [
        "**TATCHA The Dewy Skin Cream 10ml**",
        "",
        "**Precio:** £24.00",
        "",
        "**Descripción:** ",
        "Lo que es: Una rica crema que alimenta la piel con hidratación voluminosa y arroz morado japonés lleno de antioxidantes para un brillo saludable y húmedo.",
        "",
        "**Tipo de piel:** Normal y seca",
        "",
        "**Preocupaciones de cuidado de la piel:** Sequedad, opacidad y textura desigual, y pérdida de firmeza y elasticidad",
        "",
        "**Formulación:** Crema rica",
        "",
        "**Ingredientes destacados:**",
        "- **Arroz morado japonés:** Lleno de nutrientes y conocido por su capacidad para sobrevivir en cualquier entorno adverso, se ha utilizado durante mucho tiempo para celebrar la longevidad y la vitalidad; rico en antocianinas, un potente antioxidante, ayuda a la piel a recuperarse y protegerse del estrés, la contaminación y el daño UV para una apariencia de piel más saludable.",
        "- **Mezcla de algas de Okinawa y ácido hialurónico:** Captura agua para ayudar a reponer el reservorio de humedad natural de la piel, dejando inmediatamente la piel suave, reconfortada y profundamente nutrida; ayuda a reponer ceramidas para garantizar una función óptima de la barrera cutánea, contribuyendo a la reducción de la pérdida de humedad futura, para una piel visiblemente suave y llena de hidratación.",
        "- **Extractos botánicos:** De ginseng, tomillo silvestre y mejorana dulce; nutre la piel, mejorando su capacidad natural para retener y liberar humedad según sea necesario, e imparte un brillo húmedo.",
        "",
        "**Llamadas de ingredientes:** Este producto es libre de crueldad y sin gluten.",
        "",
        "**Lo que también necesitas saber:** Esta crema hidrata intensamente y sella la humedad, ayudando a reponer ceramidas para un rebote saludable y luminosidad instantánea. Una fermentación de superalimentos japoneses anti-envejecimiento: té verde, arroz y algas, ayuda a que la piel luzca su mejor aspecto a cualquier edad.",
        "",
        "**Instrucciones:** ",
        "Saca una cantidad del tamaño de una perla de crema con la cuchara dorada. Masajea sobre la cara, el cuello y el escote en movimientos ascendentes. Usar diariamente, mañana y noche.",
        "",
        "**Ingredientes:**",
        "ARROZ MORADO JAPONES: LLENO DE NUTRIENTES Y RICO EN ANTOCIANINAS, UN FUERTE ANTIOXIDANTE, ESTE GRAIN PROFUNDAMENTE TONIFICADO AYUDA A REPLENAR LA HIDRATACIÓN ESENCIAL PARA DESVELAR UN BRILLO SALUDABLE.",
        "EXTRACTOS BOTÁNICOS Y SQUALANE: UNA MEZCLA DE EXTRACTOS BOTÁNICOS, INCLUYENDO GINSENG, TOMILLO SILVESTRE Y MEJORANA DULCE MÁS SQUALANE, AYUDA A HIDRATAR Y DEJAR LA PIEL CON UN BRILLO HUMEDO.",
        "HADASEI-3: NUESTRO COMPLEJO PROPIETARIO DE ARROZ AKITA DOBLEMENTE FERMENTADO, TÉ VERDE UJI Y ALGAS OKINAWA. ESTOS INGREDIENTES TRABAJAN EN ARMONÍA PARA DESVELAR UNA PIEL RADIANTE Y SALUDABLE. CON AMINOÁCIDOS ESENCIALES, APOYA LOS FACTORES DE RETENCIÓN DE HUMEDAD DE LA PIEL PARA UN TEZ BELLA.",
        "",
        "---",
        "",
        ""
    ]

    return (
        <div className="my-4 space-y-4">
            <div className="flex justify-end">
                <EditCreateButton title="Download" buttonType="create" />
            </div>
            {transformedContent.map((content, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-1"
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
                    <div
                        className={`transition-all duration-300 ease-in-out ${accordionIndex === index
                                ? "max-h-[300px] p-4 bg-white overflow-y-auto"
                                : "max-h-0 overflow-hidden"
                            }`}
                    >
                        <p className="text-sm text-gray-700">
                            <Markdown>{content.content}</Markdown>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransformResultTab;
