
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import EditCreateButton from '../Button/EditCreateButton';

const TransformResultTab = ({ transformedContent }) => {
    const [accordionIndex, setAccordionIndex] = useState(null);

    const toggleAccordion = (index) => {
        setAccordionIndex(accordionIndex === index ? null : index);
    };

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
                        onClick={() => toggleAccordion(index)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-blue-100 cursor-pointer"
                    >
                        <div>
                            <h5 className="text-blue-600 text-sm font-bold capitalize">
                                {content.language}
                            </h5>
                            <h6 className="text-gray-600 text-sm font-semibold capitalize">
                                {content.name}
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
                            <Markdown>{content.content}</Markdown>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransformResultTab;
