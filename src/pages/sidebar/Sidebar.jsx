import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DirectLeft, LogoutCurve, Trade } from 'iconsax-react';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardRouter } from '../../routes/DashboardRouter';
import LogoutModal from '../../components/Modals/NavbarModals/LogoutModal';

const Sidebar = ({ children }) => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const logDetails = useSelector((state) => state.auth);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const dispatch = useDispatch()
  const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
  const filtered = DashboardRouter.filter((routes) => routes.title != "User" && routes.title != "Language")
  const removedArray = loggedUserDetails.user_role.name == "Employee" ? filtered : DashboardRouter
  const [open, setOpen] = useState(false);
  const logOut = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className="w-full h-screen  flex ">
        {mobileSidebar && <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 bg-gray-600/20 z-50" onClick={() => setMobileSidebar(!mobileSidebar)} />}
        {/* ====================== sidebar start ===================== */}
        <aside>
          <div className={`${isActiveLink ? "w-[5rem]" : "w-[15rem]"}  bg-white h-full  duration-700 xl:block  transition-all ease-in-out top-0 left-0 fixed border ${mobileSidebar ? "block z-[90]" : "hidden"}`}>

            {!mobileSidebar && <div className="absolute top-14 -right-4 z-50">
              <button onClick={() => setIsActiveLink(!isActiveLink)} className='bg-[#f3f3f3] hover:bg-blue-500 group p-2 rounded-full shadow-md transition-all duration-300'>
                <DirectLeft className={`text-blue-400 group-hover:text-white transition-all duration-500 ${isActiveLink && "rotate-180"}`} size={22} />
              </button>
            </div>}
            <div className="flex justify-center items-center py-4 px-5">
              <NavLink className="flex space-x-2 items-center" to="/">
                <Trade size={isActiveLink ? "36" : "30"} className="text-blue-400 " variant='Bulk' />
                {/*<img src={logo} className='w-11 h-11 object-contain' />*/}
                <div>
                  <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-2xl text-black transition-all duration-700 delay-200'}>Scrapper</h2>
                  <div className={isActiveLink ? 'hidden ' : "mt-2 space-y-1 w-full"}>
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
                </div>

              </NavLink>
            </div>
            {/* {(user?.role == "SUPER_ADMIN" || user?.role == "ADMIN") && */}
            <div className='flex flex-col'>
              <ul className='flex items-center flex-col overflow-y-scroll h-full my-4 mb-20 space-y-1 scroll-hide'>
                {removedArray?.map((item, i) => {
                  return <SidebarLink
                    i={i}
                    key={i}
                    item={item}
                    isActiveLink={isActiveLink}
                  />
                }
                )}
              </ul>
              <button onClick={logOut} className="px-7 flex items-center space-x-2 pb-2 group origin-left">
                <LogoutCurve size={20} className='text-gray-700 group-hover:text-red-500' />
                <h4 className='font-tb text-sm lg:text-lg md:text-base font-semibold group-hover:text-red-500 text-slate-700 capitalize'>logout</h4>
              </button>
            </div>
            {/* } */}
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
        <LogoutModal setOpen={setOpen} open={open} />
      </div>
    </>
  )
}

export default Sidebar