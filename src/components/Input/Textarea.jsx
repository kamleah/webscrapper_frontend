// Textarea
import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import Error from '../Errors/Error';

const Textarea = ({ label, placeholder, control, errorsMsg, name, rules, inputType = 'text', value='' }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className='flex flex-col justify-center w-full'>
            <div>
                <label className='text-gray-600 text-sm' >{label}</label>
            </div>
            <div>
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                        <textarea
                            placeholder={placeholder}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            value={fieldValue || value} 
                            selected={value}
                            type={inputType}
                            className='w-full border-2 rounded-md px-2 py-2 text-base focus:outline-orange-500'
                            
                        />
                    )}
                />
            </div>
            <Error title={errorsMsg} />
        </div>
    );
}

export default Textarea;