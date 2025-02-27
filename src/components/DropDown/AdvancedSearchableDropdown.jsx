import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import React, { useState, useRef, useEffect } from 'react';

const AdvancedSearchableDropdown = ({ label = null, options, placeholder, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [selectedOption, setSelectedOption] = useState(value || null);
    const dropdownRef = useRef(null);

    // Update selectedOption when value changes (on clear/reset)
    useEffect(() => {
        setSelectedOption(value || null);
        setSearchTerm(''); // Clear search term when value is reset
    }, [value]);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option?.label?.toLowerCase().includes(searchTerm?.toLowerCase())
            )
        );
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = option => {
        setSelectedOption(option);
        setIsOpen(false);
        setSearchTerm('');
        if (onChange) {
            onChange(option);
        };
    };

    return (
        <>
            {label && <label className='block mb-1 text-sm font-tb font-medium text-gray-900 capitalize' >{label}</label>}
            <div className={`dropdown border-2 bg-white  rounded-md w-full relative ${isOpen ? 'border-orange-500' : 'border-gray-300' }`} ref={dropdownRef}>
                <div className="flex justify-between items-center p-1.5" onClick={() => setIsOpen(!isOpen)}>
                    <input
                        type="text"
                        className="outline-none flex-1"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={selectedOption ? selectedOption.label : placeholder}
                    />
                    {isOpen ? <ArrowUp2 size="20" className='text-gray-400' /> : <ArrowDown2 size="20" className='text-gray-400' />}
                </div>
                {isOpen && (
                    <div className="border-2 absolute z-50 mt-2 w-full max-h-40 overflow-y-auto bg-white rounded-md">
                        <ul className=" bg-white w-full">
                            {filteredOptions.map(option => (
                                <li
                                    key={option.value}
                                    className={`text-md px-2 py-1 w-full cursor-pointer capitalize text-gray-600 hover:bg-gray-200 ${selectedOption?.label === option.label ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                            {filteredOptions.length === 0 && (
                                <li className="text-md px-2 py-2 w-full cursor-pointer text-gray-600 hover:bg-gray-200">No options found</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdvancedSearchableDropdown;
