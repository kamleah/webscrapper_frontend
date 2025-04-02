import { Dialog, Transition } from '@headlessui/react';
import { CloseSquare } from 'iconsax-react';
import moment from 'moment';
import React, { Fragment } from 'react';

const ViewHistoryDetails = ({ isOpen, toggle, title, data }) => {
    if (!data) return null;

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
                                    className="flex items-center justify-between bg-primary text-white p-4"
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
                                    <div>
                                        <h4 className="font-bold">Website URL & Product Name:</h4>
                                        <div>
                                            <p>
                                                <strong>URL:</strong>{" "}
                                                {data.urls ? (
                                                    <a
                                                        href={data.urls}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary underline"
                                                    >
                                                        {data.urls}
                                                    </a>
                                                ) : (
                                                    "--"
                                                )}
                                            </p>
                                            <div>
                                                <strong>Product Name:</strong>
                                                {data.name?.length > 0 ? (
                                                    data.name.map((name, index) => (
                                                        <p key={index} className="ml-2">
                                                            {name}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <p className="ml-2">--</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Date:</h4>
                                        <p>{data.created_at ? moment(data.created_at).format("YYYY-MM-DD") : "--"}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">User Information:</h4>
                                        <p>Name: {`${data.user?.first_name || "--"} ${data.user?.last_name || "--"}`}</p>
                                        <p>Email: {data.user?.email || "--"}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Scraped Data:</h4>
                                        {data.data?.length > 0 ? (
                                            <ul className="list-disc ml-4">
                                                {data.data.map((item, index) => (
                                                    <li key={index}>
                                                        {Object.entries(item).map(([key, value]) => (
                                                            <p key={key}>
                                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                                                                {key === "url" ? (
                                                                    <a
                                                                        href={value}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-primary underline"
                                                                    >
                                                                        {value}
                                                                    </a>
                                                                ) : (
                                                                    value || "--"
                                                                )}
                                                            </p>
                                                        ))}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>--</p>
                                        )}
                                    </div>
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

export default ViewHistoryDetails;