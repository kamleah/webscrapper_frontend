// PDFUpload
import React, { useState } from "react";
import { CloseSquare, DocumentUpload, GalleryEdit } from "iconsax-react";
import PdfViewerComponent from "../Card/PdfViewerComponent";

const PDFUpload = ({ label, message = 'Please add message here. Thanks!', onChange, error=false }) => {
    const [selectedPDF, setSelectedPDF] = useState();
    const [messageError, setMessageError] = useState();

    const handleUploadDoc = (event) => {
        setSelectedPDF();
        setTimeout(() => {
            const file = event.target.files[0];
            onChange(file);
            setSelectedPDF(URL.createObjectURL(file));
            setMessageError();
        }, 1000);
    };

    const handleDocRemove = () => {
        setSelectedPDF();
    };

    return (
        <div>
            <div>
                <span className='text-gray-600 text-sm' >{label}</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 w-full">
                <input
                    type="file"
                    className="hidden"
                    id="selectpdf"
                    onChange={handleUploadDoc}
                    accept=".pdf"
                />
                {selectedPDF ? (
                    <React.Fragment>
                        <iframe src={selectedPDF} frameborder="0" width="100%" height="400px" />
                        {/* <PdfViewerComponent
                            document={selectedPDF}
                        /> */}
                        <div className="absolute right-10 flex flex-col gap-2">
                            <CloseSquare size="25" className="relative top-2 right-2 text-red-500 bg-gray-200 rounded-full p-1 cursor-pointer" onClick={handleDocRemove} />
                            <label htmlFor="selectpdf"><GalleryEdit size="25" className="relative top-2 right-2 text-blue-500 bg-gray-200 rounded-full p-1 cursor-pointer" /></label>
                        </div>
                    </React.Fragment>
                ) : (
                    <label htmlFor="selectpdf" className={`border-dashed border-2 ${(messageError || error) ? 'border-red-500' : 'border-gray-300'} p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer rounded-md`} >
                        <DocumentUpload size="32" className="text-gray-500" />
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{message}</p>
                    </label>
                )}
                {messageError && (
                    <p className="text-red-500 text-sm mt-1">{messageError}</p>
                )}
            </div>
        </div>
    );
};

export default PDFUpload;
