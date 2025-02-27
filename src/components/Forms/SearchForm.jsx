import React from 'react';
import { formBtn1, formBtn2, inputClass } from "../../utils/CustomClass";
import { useForm } from 'react-hook-form';

const SearchForm = ({searchSubmit, placeholder="Search", searchClear}) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(searchSubmit)}>
            <div className="bg-white p-4 m-4 sm:m-5 rounded-xl">
                <div className="flex md:items-center flex-col lg:flex-row  gap-2">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3  gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder={placeholder}
                                className={`${inputClass} !bg-slate-100`}
                                {...register("search", { required: true })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <button
                            type="submit"
                            className={`${formBtn1} w-full text-center`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2} w-full text-center`}
                            onClick={() => {setValue("search", null); searchClear();}}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchForm