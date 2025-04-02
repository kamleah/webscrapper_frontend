import React from 'react'
import { Helmet } from 'react-helmet-async';

const DocumentHead = ({ title = "CRAFT PDP MAKER" }) => {
    return (
        <Helmet>
            <title>{title} | CRAFT PDP MAKER</title>
        </Helmet>
    )
}

export default DocumentHead