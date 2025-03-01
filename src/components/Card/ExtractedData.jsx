import React from 'react'

const ExtractedData = ({ scraped_data, scraped_id }) => {
    return (
        <div>ExtractedData {JSON.stringify(scraped_data)} {JSON.stringify(scraped_id)}</div>
    )
};

export default ExtractedData