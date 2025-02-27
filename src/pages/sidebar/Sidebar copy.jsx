import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DirectLeft } from 'iconsax-react';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';
import { getCity, getDesignation, getMovableCategory, getTemperature } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCityNames, setDesignation, setMovableCategory, setTempRange } from '../../redux/Slices/masterSlice';
import { RestrictedTitlesNonSuperAdmin, SidebarAdminApi, SidebarFlexiStoreApi, SidebarStoreMoveApi } from './SidebarApi';
import logoImg from '../../assets/circle-logo.png';
import logo from '../../assets/logoipsum-253.svg';

const Sidebar = ({ children }) => {
    const user = useSelector(state => state?.user?.loggedUserDetails)

    const [isActiveLink, setIsActiveLink] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const dispatch = useDispatch()

    const adminValidation = (sidebarTitle) => {
        if (user?.role != 'SUPER_ADMIN') {
            if(RestrictedTitlesNonSuperAdmin.includes(sidebarTitle)) {
                return false
            }
            return true
        }
        else if (user?.role == 'SUPER_ADMIN') {
            return true
        }
        else {
            return false
        }
    }

    const GetCity = async () => {
        await getCity().then(res => {
            dispatch(setCityNames(res))
        })
    }


    const GetDesignation = async () => {
        await getDesignation().then((res) => {
            dispatch(setDesignation(res));
        })
    }

    const GetTemperature = async () => {
        await getTemperature().then((res) => {
            dispatch(setTempRange(res));
        })
    }
    const MovableCategoryList = () => {
        getMovableCategory().then(res => {
            dispatch(setMovableCategory(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }
    useEffect(() => {
        GetCity();
        MovableCategoryList();
        GetDesignation();
        GetTemperature();
    }, [])
    return (
        <>
            <div className="w-full h-screen  flex ">
                {mobileSidebar && <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 bg-gray-600/20 z-50" onClick={() => setMobileSidebar(!mobileSidebar)} />}
                {/* ====================== sidebar start ===================== */}
                <aside>
                    <div className={`${isActiveLink ? "w-[5rem]" : "w-[15rem]"}  bg-white h-full  duration-700 xl:block  transition-all ease-in-out top-0 left-0 fixed ${mobileSidebar ? "block z-[90]" : "hidden"}`}>

                        {!mobileSidebar && <div className="absolute top-14 -right-4 z-50">
                            <button onClick={() => setIsActiveLink(!isActiveLink)} className='bg-[#f3f3f3] hover:bg-orange-500 group p-2 rounded-full shadow-md transition-all duration-300'>
                                <DirectLeft className={`text-orange-400 group-hover:text-white transition-all duration-500 ${isActiveLink && "rotate-180"}`} size={22} />
                            </button>
                        </div>}
                        <div className="flex justify-center items-center py-4 px-5">
                            <NavLink className="flex space-x-2 items-center" to="/">
                                {/* <Trade size={isActiveLink ? "36" : "30"} className="text-orange-400 " variant='Bulk' /> */}
                                {/*<img src={logo} className='w-11 h-11 object-contain' />*/}
                                <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-2xl text-black transition-all duration-700 delay-200'}>Si<span className='text-orange-400'>Verce</span></h2>
                            </NavLink>
                        </div>
                        {(user?.role == "SUPER_ADMIN" || user?.role == "ADMIN") &&
                            <ul className='flex  items-center flex-col overflow-y-scroll h-full  my-4 mb-20 space-y-1 scroll-hide'>
                                {SidebarAdminApi?.map((item, i) => {
                                    
                                    if (adminValidation(item.title)) {
                                        return <SidebarLink
                                            i={i}
                                            key={i}
                                            item={item}
                                            isActiveLink={isActiveLink}
                                        />
                                    }
                                }
                                )}
                            </ul> 
                        }
                    </div>
                </aside>
                {/* ====================== sidebar end ===================== */}
                <div className={isActiveLink ? "navbar-section-active transition-all duration-700 " : "navbar-section transition-all duration-700"} >
                    {/* ====================== Navbar start ===================== */}
                    <Navbar setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                    {/* ====================== sidebar end ===================== */}
                    <main className="pb-5" >
                        {/* ====================== Routes start ===================== */}
                        {children}
                        {/* ======================Routes start ===================== */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Sidebar