import React from 'react'
import { Helmet } from 'react-helmet-async';

const DocumentHead = ({ title = "Scrapper" }) => {
    return (
        <Helmet>
            <title>{title} | Scrapper</title>
        </Helmet>
    )
}

export default DocumentHead