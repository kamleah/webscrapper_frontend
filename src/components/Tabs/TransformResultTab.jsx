import React, { useEffect } from 'react';
import Markdown from 'react-markdown';

const TransformResultTab = ({ transformedContent, scraped_id }) => {

    useEffect(() => {
        if (scraped_id) {
            console.log("scraped_id", scraped_id);
        };
    }, [scraped_id]);

    return (
        <div>
            <div>
                <div>

                </div>
                <div>
                    
                </div>
            </div>
            {
                transformedContent.map((content, index) => {
                    return (
                        <div className="bg-white p-6 rounded-lg shadow-lg my-2">
                            <h5 className="text-blue-600 mb-2 text-sm font-bold capitalize">
                                {content.language}
                            </h5>
                            <h6 className="text-gray-600 mb-4 text-sm font-semibold capitalize">
                                {content.name}
                            </h6>
                            <p className="text-gray-700"><Markdown>{content.content}</Markdown></p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TransformResultTab;