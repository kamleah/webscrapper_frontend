import React from 'react'

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="">
            <h1 className="font-tbPop text-xl font-semibold text-gray-900">
                {title}
            </h1>
            <h6 className="text-gray-400 font-tb font-medium text-base">
                {subtitle}
            </h6>
        </div>
    )
}

export default SectionHeader