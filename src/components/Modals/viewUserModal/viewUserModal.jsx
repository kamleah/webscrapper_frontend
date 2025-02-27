


// import { Dialog, Transition } from '@headlessui/react';
// import { CloseSquare } from 'iconsax-react';
// import React, { Fragment } from 'react';

// const ViewDetailsModal = ({ isOpen, toggle, title, fields, data }) => {
//     if (!data) return null;
//     const resolveNestedField = (obj, path) => {
//         if (!obj || !path) return 'N/A';
    
//         return path.split('.').reduce((acc, key) => {
//             if (acc && acc[key] !== undefined && acc[key] !== null) {
//                 return acc[key];
//             }
//             return null;
//         }, obj) || 'N/A';
//     };
    
//     return (
//         <Transition appear show={isOpen} as={Fragment}>
//             <Dialog as="div" className="relative z-50" onClose={toggle}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 overflow-y-auto">
//                     <div className="flex items-center justify-center min-h-full p-4 text-center">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 scale-95"
//                             enterTo="opacity-100 scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 scale-100"
//                             leaveTo="opacity-0 scale-95"
//                         >
//                             <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
//                                 <Dialog.Title
//                                     as="div"
//                                     className="flex items-center justify-between bg-blue-500 text-white p-4"
//                                 >
//                                     <h3 className="text-lg font-medium">{title}</h3>
//                                     <CloseSquare
//                                         size={24}
//                                         color="white"
//                                         className="cursor-pointer"
//                                         onClick={toggle}
//                                     />
//                                 </Dialog.Title>
//                                 <div className="p-6 space-y-4">
//                                     {fields.map((field) => (
//                                         <div key={field.key}>
//                                             <h4 className="font-semibold text-gray-700">{field.label}:</h4>
//                                             {/* <p className="text-gray-600">{data[field.key] || 'N/A'}</p> */}
//                                             <p className="text-gray-600">{resolveNestedField(data, field.key) || 'N/A'}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex justify-end p-4 border-t border-gray-200">
//                                     <button
//                                         className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//                                         onClick={toggle}
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition>
//     );
// };

// export default ViewDetailsModal;


import { Dialog, Transition } from '@headlessui/react';
import { CloseSquare } from 'iconsax-react';
import React, { Fragment } from 'react';

const ViewDetailsModal = ({ isOpen, toggle, title, fields, data }) => {
    if (!data) return null;
    const resolveNestedField = (obj, path) => {
        if (!obj || !path) return 'N/A';
        return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj) || 'N/A';
    };
    const renderFieldValue = (value) => {
        if (Array.isArray(value)) {
            return value.length ? (
                <ul className="list-disc list-inside">
                    {value.map((item, index) => (
                        <li key={index}>{renderFieldValue(item)}</li>
                    ))}
                </ul>
            ) : (
                'N/A'
            );
        }
        if (typeof value === 'object' && value !== null) {
            return (
                <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-x-auto">
                    {JSON.stringify(value, null, 2)}
                </pre>
            );
        }
        return value || 'N/A';
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={toggle}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="div"
                                    className="flex items-center justify-between bg-blue-500 text-white p-4"
                                >
                                    <h3 className="text-lg font-medium">{title}</h3>
                                    <CloseSquare
                                        size={24}
                                        color="white"
                                        className="cursor-pointer"
                                        onClick={toggle}
                                    />
                                </Dialog.Title>
                                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                    {fields.map((field) => (
                                        <div key={field.key} className="space-y-1">
                                            <h4 className="font-semibold text-gray-700">{field.label}:</h4>
                                            <div className="text-gray-600">
                                                {renderFieldValue(resolveNestedField(data, field.key))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end p-4 border-t border-gray-200">
                                    <button
                                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                        onClick={toggle}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ViewDetailsModal;
