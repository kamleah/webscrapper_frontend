import { Eye } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

const IconInput = ({ label = "Label", placeholder, control, errorsMsg, name, rules, inputType = "text", icon }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className='flex flex-col justify-center w-full'>
            <div>
                <span className='text-gray-200'>{label}</span>
            </div>
            <div >
                <div className='border-2 w-full rounded-lg'>
                    <div className={`flex items-center rounded-md ${isFocused ? 'border-2 border-orange-700 bg-gray-100' : 'bg-gray-100 border border-transparent'}`}>
                        <Controller
                            control={control}
                            name={name}
                            rules={rules}
                            render={({ field: { onChange, onBlur, onFocus, value, ref } }) => (
                                <input
                                    placeholder={placeholder}
                                    onChange={onChange}
                                    onBlur={() => {
                                        onBlur();
                                        setIsFocused(false);
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    value={value || ''}
                                    type={inputType}
                                    className={`w-full rounded-md bg-gray-100 px-2 py-1 border-transparent outline-transparent focus:outline-none focus:border-0`}
                                    ref={ref}
                                />
                            )}
                        />
                        <div className='pr-2'>
                            {icon}
                        </div>
                    </div>
                </div>
                {errorsMsg && <span className="text-red-500">{errorsMsg}</span>}
            </div>
        </div>
    );
};

export default IconInput