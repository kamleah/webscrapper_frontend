// import React, { useState } from "react";
// import { CloseSquare, DocumentUpload, GalleryEdit } from "iconsax-react";
// import { checkFileSizeLimit, validateImageDimensions } from "../../utils/Functions/reuseFunction";
// import { maxProductThumbnailImageSize } from "../../utils/Validation/ConstVariables";

// const ImageInput = ({ label, message = 'Please add message here. Thanks!', onChange, error=false, imgWidth = 1080, imgHeight = 1080 }) => {
//     const [thumbnail, setThumbnail] = useState("");
//     const [thumbnailError, setThumbnailError] = useState("");

//     const handleThumbnailUpload = (event) => {
//         const file = event.target.files[0];
//         const fileSizeLimit = checkFileSizeLimit(file, maxProductThumbnailImageSize);
//         if (!fileSizeLimit) {
//             setThumbnailError(`Image size should not exceed ${maxProductThumbnailImageSize} MB`);
//             return;
//         };

//         validateImageDimensions(
//             file,
//             imgWidth,
//             imgHeight,
//             (thumbnailUrl) => {
//                 // On success
//                 setThumbnail(thumbnailUrl);
//                 setThumbnailError("");
//                 onChange(file);
//             },
//             (errorMessage) => {
//                 // On error
//                 setThumbnailError(errorMessage);
//             }
//         );
//     };

//     const handleThumbnailRemove = () => {
//         setThumbnail("");
//     };

//     return (
//         <div>
//             <div>
//                 <span className='text-gray-600 text-sm' >{label}</span>
//             </div>
//             <div className="flex flex-wrap gap-4 mb-4">
//                 <input
//                     type="file"
//                     className="hidden"
//                     id="thumbnail"
//                     onChange={handleThumbnailUpload}
//                     accept="image/*"
//                 />
//                 {thumbnail ? (
//                     <div className="relative">
//                         <img
//                             src={thumbnail}
//                             alt="Thumbnail"
//                             className="w-40 h-40 object-cover rounded-md"
//                         />
//                         <CloseSquare size="25" className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 cursor-pointer" onClick={handleThumbnailRemove} />
//                         <GalleryEdit size="25" className="absolute top-10 right-2 text-blue-500 bg-white rounded-full p-1 cursor-pointer"
//                             onClick={() => document.getElementById("thumbnail").click()} />
//                     </div>
//                 ) : (
//                     <label htmlFor="thumbnail" className={`border-dashed border-2 ${(thumbnailError || error) ? "border-red-500" : "border-gray-300"} p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer rounded-md`} >
//                         <DocumentUpload size="32" className="text-gray-500" />
//                         <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
//                         <p class="text-xs text-gray-500 dark:text-gray-400">{message}</p>
//                     </label>
//                 )}
//                 {thumbnailError && (
//                     <p className="text-red-500 text-sm mt-1">{thumbnailError}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ImageInput;

import React, { useState } from "react";
import { CloseSquare, DocumentUpload, GalleryEdit } from "iconsax-react";
import { checkFileSizeLimit, validateImageDimensions } from "../../utils/Functions/reuseFunction";
import { maxProductThumbnailImageSize } from "../../utils/Validation/ConstVariables";
import PropTypes from 'prop-types';

const ImageInput = ({ label, message = 'Please add message here. Thanks!', onChange, error = false, imgWidth = 1080, imgHeight = 1080, uniqueId=0 }) => {
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnailError, setThumbnailError] = useState("");

    const handleThumbnailUpload = (event) => {
        const file = event.target.files[0];
        const fileSizeLimit = checkFileSizeLimit(file, maxProductThumbnailImageSize);
        if (!fileSizeLimit) {
            setThumbnailError(`Image size should not exceed ${maxProductThumbnailImageSize} MB`);
            return;
        };

        validateImageDimensions(
            file,
            imgWidth,
            imgHeight,
            (thumbnailUrl) => {
                // On success
                setThumbnail(thumbnailUrl);
                setThumbnailError("");
                onChange(file);
            },
            (errorMessage) => {
                // On error
                setThumbnailError(errorMessage);
            }
        );
    };

    const handleThumbnailRemove = () => {
        setThumbnail("");
        onChange(null); // Ensure the onChange prop is called with null to clear the value in the parent form
    };

    return (
        <div>
            <div>
                <span className='text-gray-600 text-sm px-4'>{label}</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="file"
                    className="hidden"
                    id={`thumbnail-${uniqueId}`}
                    onChange={handleThumbnailUpload}
                    accept="image/*"
                />
                {thumbnail ? (
                    <div className="relative">
                        <img
                            src={thumbnail}
                            alt="Thumbnail"
                            className={`w-[${imgWidth}] h-[${imgHeight}] object-cover rounded-md`}
                        />
                        <CloseSquare size="25" className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 cursor-pointer" onClick={handleThumbnailRemove} />
                        <GalleryEdit size="25" className="absolute top-10 right-2 text-blue-500 bg-white rounded-full p-1 cursor-pointer"
                            onClick={() => document.getElementById(`thumbnail-${uniqueId}`).click()} />
                    </div>
                ) : (
                    <label htmlFor={`thumbnail-${uniqueId}`} className={`border-dashed border-2 ${(thumbnailError || error) ? "border-red-500" : "border-gray-300"} p-4 w-40 h-40 flex flex-col items-center justify-center cursor-pointer rounded-md`}>
                        <DocumentUpload size="32" className="text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
                    </label>
                )}
                {thumbnailError && (
                    <p className="text-red-500 text-sm mt-1">{thumbnailError}</p>
                )}
            </div>
        </div>
    );
};

ImageInput.propTypes = {
    label: PropTypes.string,
    message: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    uniqueId: PropTypes.string.isRequired
};

export default ImageInput;
