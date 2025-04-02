import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DirectLeft, LogoutCurve, Trade } from 'iconsax-react';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardRouter } from '../../routes/DashboardRouter';
import LogoutModal from '../../components/Modals/NavbarModals/LogoutModal';
import leftimage from '../../assets/images/logo-craft.png'
import cropped_logo from '../../assets/images/cropped_logo.png'

const Sidebar = ({ children }) => {
  const [isActiveLink, setIsActiveLink] = useState(false);
  const logDetails = useSelector((state) => state.auth);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const dispatch = useDispatch();
  const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);

  const filtered = DashboardRouter.filter((routes) => routes.title !== "User" && routes.title !== "Language");
  const removedArray = loggedUserDetails.user_role.name === "Employee" ? filtered : DashboardRouter;
  const [open, setOpen] = useState(false);

  const logOut = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="w-full h-screen flex">
        {mobileSidebar && (
          <div
            className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 bg-gray-600/20 z-50"
            onClick={() => setMobileSidebar(!mobileSidebar)}
          />
        )}
        {/* ====================== Sidebar Start ===================== */}
        <aside>
          <div
            className={`${isActiveLink ? "w-[5rem]" : "w-[15rem]"} bg-white h-full duration-700 xl:block transition-all ease-in-out top-0 left-0 fixed border ${mobileSidebar ? "block z-[90]" : "hidden"}`}
          >
            {!mobileSidebar && (
              <div className="absolute top-14 -right-4 z-50">
                <button
                  onClick={() => setIsActiveLink(!isActiveLink)}
                  className="bg-[#f3f3f3] hover:bg-orange-500 group p-2 rounded-full shadow-md transition-all duration-300"
                >
                  <DirectLeft
                    className={`text-primary group-hover:text-white transition-all duration-500 ${isActiveLink && "rotate-180"}`}
                    size={22}
                  />
                </button>
              </div>
            )}
            <div className="flex flex-col h-full">
              <div className="flex justify-center items-center py-4 px-5">
                {!isActiveLink ? <NavLink className="flex space-x-2 items-center transition-all duration-700" to="/">
                  <img src={leftimage} className='object-cover h-6 transition-all duration-700' loading='lazy' />
                </NavLink> :
                  <NavLink className="flex space-x-2 items-center transition-all duration-700" to="/">
                    <img src={cropped_logo} className='object-cover h-6 transition-all duration-700' loading='lazy' />
                  </NavLink>}
              </div>
              <div className={isActiveLink ? "hidden" : " px-5 ml-10"}>
                {loggedUserDetails?.first_name && loggedUserDetails?.last_name ? (
                  <h4 className="text-base font-tb font-semibold whitespace-nowrap leading-none text-slate-800">
                    {loggedUserDetails?.first_name +
                      " " +
                      (loggedUserDetails?.last_name?.length > 5
                        ? loggedUserDetails?.last_name?.slice(0, 5) + "..."
                        : loggedUserDetails?.last_name)}
                  </h4>
                ) : (
                  <h4 className="text-base font-tb font-semibold whitespace-nowrap leading-none text-slate-800">
                    Hello {logDetails?.role}
                  </h4>
                )}
                <h4 className="text-[12px] font-medium leading-none capitalize text-gray-500 pt-0.5">
                  {logDetails?.role}
                </h4>
              </div>
              {/* Navigation Links and Logout */}
              <div className="flex flex-col flex-1">
                {/* Navigation Links at the Top */}
                <ul className="flex flex-col items-center space-y-1 my-4">
                  {removedArray?.map((item, i) => (
                    <SidebarLink
                      key={i}
                      item={item}
                      isActiveLink={isActiveLink}
                      index={i}
                    />
                  ))}
                </ul>

                {/* Spacer to push Logout to the bottom */}
                <div className="flex-grow"></div>

                {/* Logout Button at the Bottom */}
                <button
                  onClick={logOut}
                  className="px-7 flex items-center space-x-2 py-2 group origin-left"
                >
                  <LogoutCurve size={20} className="text-gray-700 group-hover:text-red-500" />
                  {!isActiveLink && (
                    <h4 className="font-tb text-sm lg:text-lg md:text-base font-semibold group-hover:text-red-500 text-slate-700 capitalize">
                      Logout
                    </h4>
                  )}
                </button>
              </div>
            </div>
          </div>
        </aside >
        {/* ====================== Sidebar End ===================== */}
        < div
          className={
            isActiveLink
              ? "navbar-section-active transition-all duration-700"
              : "navbar-section transition-all duration-700"
          }
        >
          {/* ====================== Navbar Start ===================== */}
          < Navbar setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
          {/* ====================== Navbar End ===================== */}
          < main className="pb-5" >
            {/* ====================== Routes Start ===================== */}
            {children}
            {/* ====================== Routes End ===================== */}
          </main >
        </div >
        <LogoutModal setOpen={setOpen} open={open} />
      </div >
    </>
  );
};

export default Sidebar;