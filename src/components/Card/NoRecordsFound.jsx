import React from 'react'

const NoRecordsFound = ({title="No Record Found"}) => {
    return (
        <div className="m-4 sm:m-5 p-5 sm:p-7 flex flex-col justify-between">
            <div className="bg-white rounded-xl mt-4 shadow-sm  p-5 sm:p-7 text-center">
                {title}
            </div>
        </div>
    )
};

export default NoRecordsFound