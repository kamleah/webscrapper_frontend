import React, { useEffect } from 'react';
import { formBtn1, formBtn2, inputClass } from "../../utils/CustomClass";
import { Controller, useForm } from 'react-hook-form';
import AdvancedSearchableDropdown from '../DropDown/AdvancedSearchableDropdown';
import { useSelector, useDispatch } from 'react-redux';

const ProductSearchForm = ({ searchSubmit, placeholder = "Search", searchClear }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            description: "",
            search_keywords: "",
            price: "",
            category: null,
            brand: null,
        }
    });
    const { packSizeList } = useSelector((state) => state.packsize);
    const { unitList } = useSelector((state) => state.unit);
    const { categoriesList } = useSelector((state) => state.category);
    const { brandsList } = useSelector((state) => state.brand);

    const handleClear = () => {
        reset({
            name: "",
            description: "",
            search_keywords: "",
            price: "",
            category: null,
            brand: null,
        });
        searchClear();
    };


    return (
        <form onSubmit={handleSubmit(searchSubmit)}>
            <div className="bg-white p-4 m-4 sm:m-5 rounded-xl">
                <div className="flex md:items-start flex-col lg:flex-row  gap-2">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4  gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder={"Name"}
                                className={`${inputClass} !bg-white-100`}
                                {...register("name", { required: false })}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder={"Product Description"}
                                className={`${inputClass} !bg-white-100`}
                                {...register("description", { required: false })}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder={"Search Keywords"}
                                className={`${inputClass} !bg-white-100`}
                                {...register("search_keywords", { required: false })}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder={"Product Price"}
                                className={`${inputClass} !bg-white-100`}
                                {...register("price", { required: false })}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name={'category'}
                                render={({ field: { onChange, onBlur, onFocus, value, ref } }) => (
                                    <AdvancedSearchableDropdown
                                        options={categoriesList}
                                        placeholder='Filter Categories'
                                        onChange={onChange}
                                        className={`${inputClass} !bg-slate-100`}
                                        defaultSelectedOption={value}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <Controller
                                control={control}
                                name={'brand'}
                                render={({ field: { onChange, onBlur, onFocus, value, ref } }) => (
                                    <AdvancedSearchableDropdown
                                        options={brandsList}
                                        placeholder='Filter Brand'
                                        onChange={onChange}
                                        className={`${inputClass} !bg-slate-100`}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-start">
                        <button
                            type="submit"
                            className={`${formBtn1} w-full text-center`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2} w-full text-center`}
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default ProductSearchForm