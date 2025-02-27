import moment from "moment";

/**
 * Validates if the file size is within the specified limit.
 * @param {File} file - The file object to be validated.
 * @param {number} maxSizeMB - The maximum allowed size in megabytes (default is 2MB).
 * @returns {boolean} True if the file size is within the limit, false otherwise.
 */
export const checkFileSizeLimit = (file, maxSizeMB = 2) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes

    if (file.size > maxSizeBytes) {
        return false;
    }
    return true;
};

/**
 * Validate image dimensions from a File object.
 * @param {File} file - The image file to validate.
 * @param {number} requiredWidth - The required width of the image.
 * @param {number} requiredHeight - The required height of the image.
 * @param {Function} onSuccess - Callback function to call on successful validation.
 * @param {Function} onError - Callback function to call if validation fails.
 */
export const validateImageDimensions = (file, requiredWidth, requiredHeight, onSuccess, onError) => {
    // Create a FileReader to read the image file
    const reader = new FileReader();

    // When file reading is done
    reader.onload = (e) => {
        // Create an Image object
        const img = new Image();
        img.onload = () => {
            // Access the natural dimensions of the image
            console.log("Image dimensions:", img.width, img.height);

            // Check if image dimensions match the required dimensions
            if (img.width === requiredWidth && img.height === requiredHeight) {
                onSuccess(URL.createObjectURL(file));
            } else {
                onError("Image dimensions must be " + requiredWidth + "x" + requiredHeight + " pixels");
            }
        };

        // Set the src of the Image object to the loaded file
        img.src = e.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
};



// Function to format the time range
export const formatTimeRange = (startTime, endTime) => {
    const formatTime = (time) => {
        if (!time) return null; // Handle null or undefined input
        const format = time.length === 5 ? 'HH:mm' : 'HH:mm:ss';
        return moment(time, format);
    };
    const start = formatTime(startTime);
    const end = formatTime(endTime);

    return `${start.format("hh:mm A")} - ${end.format("hh:mm A")}`;
};

// tool bar options

export const toolbarModules = {
    toolbar: [
        [{ 'font': [] }],  // Add font options
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

export const toolbarFormats = [
    'font', 'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];