import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

const InfoCard = ({label, value}) => {
    return (
        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h5" className="text-sm font-semibold leading-6 text-gray-900 font-tbPop">
                {label}
            </Dialog.Title>
            <div className="mt-0">
                <p className="text-sm font-tbPop font-medium text-slate-500">
                    {value}
                </p>
            </div>
        </div>
    )
}

export default InfoCard