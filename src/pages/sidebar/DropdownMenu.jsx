import React from 'react';
import { NavLink } from 'react-router-dom';

const DropdownMenu = ({ items, isActiveLink }) => {
    return (
        <>
            {items.map((item, i) => (
                <NavLink to={item?.link} key={i} className={`${!isActiveLink ? "px-[77px]" : "justify-center"} flex items-center  group py-1.5 my-1 w-full origin-left relative transition-all duration-500 `}>
                    {!isActiveLink && <div className="absolute top-0 left-0 transition-all duration-300 origin-left w-1.5 h-full rounded-r-md left-border opacity-0"></div>
                    }
                    {isActiveLink && <span className="text-slate-800  group-hover:text-blue-400 duration-500 transition-all origin-left icon-wrapper">{item?.icon}</span>}
                    {!isActiveLink && <h4 className="text-base font-tb font-bold origin-left text-slate-800 group-hover:text-blue-400 duration-500 whitespace-nowrap transition-all text-title ">{item?.title}</h4>}
                </NavLink >
            ))}
        </>
    );
}

export default DropdownMenu;
