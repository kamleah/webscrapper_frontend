import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { labelClass } from '../../utils/CustomClass';
import Error from '../Errors/Error';

const Input = ({ label, placeholder, control, errorsMsg, name, rules, inputType = 'text', value = '', containerClass='' }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={containerClass} >
            <label className={labelClass}>
                {label}
            </label>
            <div>
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field: { onChange, onBlur, onFocus, value: fieldValue, ref } }) => (
                        <input
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
            {errorsMsg && <Error title={errorsMsg} />}
        </div>
    );
}

export default Input;