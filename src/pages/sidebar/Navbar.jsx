import moment from 'moment/moment'
import "../../css/Navbar.css"
import greetingTime from 'greeting-time'
// import userImg from '../../assets/user.webp';

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowDown2, HambergerMenu, LogoutCurve, NotificationBing, Setting2, User } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

import LogoutModal from '../../components/Modals/NavbarModals/LogoutModal';


const Navbar = ({ mobileSidebar, setMobileSidebar }) => {
    const user = useSelector((state) => state.user.logged_user);
    const logDetails = useSelector((state) => state.auth);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    
    const [open, setOpen] = useState(false)
    const [card, setCard] = useState(true)
    // ============================= logout user dashbaord ================================
    const logOut = () => {
        setOpen(!open)
        setCard(!card)
    }
    return (
        <div className=" flex justify-between items-center py-5  px-5 sm:px-6 pt-24 sm:pt-4 pb-0 sm:pb-5">
            <div className="min-w-0 flex-1">
                <h2 className="font-tb font-bold text-2xl  md:text-2xl lg:text-2xl whitespace-nowrap ">
                    {greetingTime(new Date())},<span className="capitalize text-primary"> {user?.first_name}</span>
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 ">
                    <div className="mt-2 flex items-center text-base font-tbPop text-gray-500 font-semibold">
                        <CalendarDays className="mr-1.5 text-slate-400" size={22} />
                        {moment().format('dddd , DD MMMM YYYY')}
                    </div>
                </div>
            </div>
            {/* <div className="flex items-center justify-between md:justify-center lg:justify-start bg-gray-100 fixed top-0 right-0 py-4 px-4 sm:rounded-bl-[2rem] z-50 md:px-3 w-full md:w-[14rem] lg:w-[24rem] xl:w-[22rem] " >
                <button className='relative xl:hidden shadow-none ' onClick={() => setMobileSidebar(!mobileSidebar)}>
                    {mobileSidebar ? <XMarkIcon className='w-8 h-8 text-gray-500' /> : <HambergerMenu size={30} className='text-gray-500' />}
                </button>
                <div className="flex item-center">
                    <button className='px-7  relative'>
                        <span className="absolute flex top-0 right-6 h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <NotificationBing size="30" />
                    </button>
                    <div className="flex items-center" onClick={() => setCard(!card)}>
                        <div className="flex-shrink-0">
                        </div>
                        <div className="ml-3 space-y-1 hidden lg:block w-full">
                            {(loggedUserDetails?.first_name && loggedUserDetails?.last_name) && <h4 className="text-base font-tb font-semibold whitespace-nowrap leading-none text-slate-800">
                                {loggedUserDetails?.first_name + " " + (loggedUserDetails?.last_name?.length > 5 ? loggedUserDetails?.first_name?.slice(0, 5) + "..." : loggedUserDetails?.last_name)}
                            </h4>}
                            {(!loggedUserDetails?.first_name && !loggedUserDetails?.last_name) && <h4 className="text-base font-tb font-semibold whitespace-nowrap leading-none text-slate-800">
                                Hello {logDetails?.role}
                            </h4>}
                            <h4 className="text-[12px] font-medium leading-none capitalize text-gray-500 pt-0.5 ">
                                {logDetails?.role}
                            </h4>
                        </div>
                        <button className='px-3 hidden lg:block ' >
                            <ArrowDown2 size={22} className={`text-slate-400 duration-700 ease-in-out transition-all ${!card ? "-rotate-180" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${card ? "-top-96 opacity-0" : "top-20 opacity-100"} bg-white  transition-all ease-in-out duration-700 fixed shadow-sm border right-6 py-2 rounded-lg z-20 px-4 lg:px-6 lg:py-1`}>
                <div className="flex items-center border-b border-slate-200 pb-3 lg:hidden">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="ml-3 space-y-1">
                        <h4 className="text-sm md:text-base font-tb font-semibold leading-none text-slate-800">{user?.first_name + " " + user?.last_name}</h4>
                        <h4 className="text-sm md:text-base font-medium leading-none capitalize text-gray-400">{user?.role}</h4>
                    </div>
                </div>
                <div className="p-2 pb-0">
                    <NavLink to={"/profile"} onClick={() => setCard(!card)} className="flex items-center space-x-2 pb-2 group transition-all duration-700">
                        <User size={22} className='text-gray-700 group-hover:text-primary' />
                        <h4 className='font-tbPop text-sm lg:text-lg md:text-base font-semibold group-hover:text-primary text-slate-700 capitalize'>Profile</h4>
                    </NavLink>
                    <NavLink className="flex items-center space-x-2 pb-2 group transition-all duration-700">
                        <Setting2 size={22} onClick={() => setCard(!card)} className='text-gray-700 group-hover:text-primary' />
                        <h4 className='font-tbPop text-sm lg:text-lg md:text-base font-semibold group-hover:text-primary text-slate-700 capitalize'>Setting</h4>
                    </NavLink>
                    <button onClick={logOut} className="flex items-center space-x-2 pb-2 group">
                        <LogoutCurve size={20} className='text-gray-700 group-hover:text-red-500' />
                        <h4 className='font-tb text-sm lg:text-lg md:text-base font-semibold group-hover:text-red-500 text-slate-700 capitalize'>logout</h4>
                    </button>
                </div>
            </div> */}
            <LogoutModal setOpen={setOpen} open={open} />
        </div>
    )
}

export default Navbar