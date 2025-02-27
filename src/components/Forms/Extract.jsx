import { AddSquare, Trash } from 'iconsax-react'
import React from 'react'
import TextInputWithLabel from '../Input/TextInputWithLabel'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
const Extract = () => {


    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            specifications: [{ specification_name: '', specification_value: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });


    return (
        <div className="mt-5 space-y-3">
            <div>
                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className=' flex flex-1' >
                            <div className='w-full m-1' >
                                <TextInputWithLabel
                                    label={"Product URL"} placeholder={"Enter Product URL"}
                                    type="text"
                                    {...control.register(`specifications.${index}.specification_name`, {
                                        required: "Specification Name is required"
                                    })}
                                />
                                {errors.specifications && errors.specifications[index] && errors.specifications[index].specification_name && (
                                    <p>{errors.specifications[index].specification_name.message}</p>
                                )}
                            </div>
                            <div className='w-full m-1'>
                                <TextInputWithLabel
                                    label={"Product URL"} placeholder={"Enter Product URL"}
                                    type="text"

                                    {...control.register(`specifications.${index}.specification_value`, {
                                        required: "Specification Value is required"
                                    })}
                                />
                                {errors.specifications && errors.specifications[index] && errors.specifications[index].specification_value && (
                                    <p>{errors.specifications[index].specification_value.message}</p>
                                )}
                            </div>
                            <button type="button" onClick={() => remove(index)} className='border border-red-700 m-1  rounded-lg px-4' ><Trash size="20" className='text-red-900' /></button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => append({ specification_name: '', specification_value: '' })} className='flex items-center border px-4 py-2 rounded-xl' >Add More<AddSquare size="20" className='ml-2' /></button>
            </div>
        </div>
    )
}

export default Extract