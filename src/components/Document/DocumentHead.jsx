import React from 'react'
import { Helmet } from 'react-helmet-async';

const DocumentHead = ({ title = "SiVerce" }) => {
    return (
        <Helmet>
            <title>{title} | SiVerce</title>
        </Helmet>
    )
}

export default DocumentHead