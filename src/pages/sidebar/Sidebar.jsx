import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DirectLeft, Trade } from 'iconsax-react';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardRouter } from '../../routes/DashboardRouter';

const Sidebar = ({ children }) => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const dispatch = useDispatch()

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
                <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-2xl text-black transition-all duration-700 delay-200'}>Scrapper</h2>
              </NavLink>
            </div>
            {/* {(user?.role == "SUPER_ADMIN" || user?.role == "ADMIN") && */}
            <ul className='flex  items-center flex-col overflow-y-scroll h-full  my-4 mb-20 space-y-1 scroll-hide'>
              {DashboardRouter?.map((item, i) => {
                return <SidebarLink
                  i={i}
                  key={i}
                  item={item}
                  isActiveLink={isActiveLink}
                />}
              )}
            </ul>
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
      </div>
    </>
  )
}

export default Sidebar