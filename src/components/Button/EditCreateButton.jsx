import { Edit } from 'iconsax-react';
import { tableBtn } from '../../utils/CustomClass';
const EditCreateButton = ({ buttonType, title, toggle }) => {
    return (
        <>
            {buttonType !== "edit" ? (
                <button onClick={toggle} className={`${tableBtn} mx-1`}>
                    {title}
                </button>
            ) : (
                <button
                    onClick={toggle}
                    className="bg-yellow-100 px-1.5 py-2 rounded-sm "><Edit size="20" className='text-yellow-500' />
                </button>
            )}
        </>
    )
};

export default EditCreateButton;