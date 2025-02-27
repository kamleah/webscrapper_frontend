import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faChartBar, faList, faUser, faSignOutAlt, faAddressCard, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DirectRight, DirectLeft } from "iconsax-react"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Category from '../pages/master/category/Category';
import BrandList from '../pages/master/brand/BrandList';
import LogoutConfirmation from '../pages/logout/LogoutConfirmation';
import PackSize from '../pages/master/packsize/PackSize';
import PackSizeList from '../pages/master/packsize/PackSizeList';

  

const PrivateLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Set initial sidebar state based on screen size
  const [selectedModule, setSelectedModule] = useState('Dashboard');
  const [isMasterOpen, setIsMasterOpen] = useState(false); // State to manage the Master dropdown
  const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false);
  const loggedUser = useSelector((state) => state.user.logged_user);
  const navigate  = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleIcon = isOpen ? faTimes : faBars;

  const modules = [
    { name: 'Dashboard', endPoint: "/dashboard", icon: faHome },
    { name: 'Users', endPoint: "/users", icon: faUser },
  ];

  const handleModuleClick = (moduleName) => {
    setSelectedModule(moduleName);
  };

  const handleMasterClick = () => {
    setIsMasterOpen(!isMasterOpen);
    setSelectedModule('Configuration'); // Set Configuration as the selected module when clicked
  };

  const masterModules = [
    { name: 'Add Product', endPoint: "/addproducts", icon: faChartBar },
    { name: 'List Products', endPoint: "/products", icon: faList },
    { name: 'Brand', endPoint: "/brand", component: <BrandList /> },
    { name: 'Grade', endPoint: "/grade", component: <div>Grade Component</div> },
    { name: 'Unit', endPoint: "/unit", component: <div>Unit Component</div> },
    { name: 'PackSize', endPoint: "/pack-size", component: <PackSizeList /> },
    { name: 'LeadTime', endPoint: "/lead-time", component: <div>LeadTime Component</div> },
    { name: 'Category', endPoint: "/category", component: <Category /> },
  ];
  const handleLogout = () => {
    setIsLogoutConfirmVisible(true);
  };

  const confirmLogout = () => {

    return navigate("/login")
  };

  const cancelLogout = () => {
    setIsLogoutConfirmVisible(false);
  };

  return (
    <div className="flex bg-gray-100">
       {isLogoutConfirmVisible && (
        <LogoutConfirmation onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
      <aside className={`bg-[#F2EAE0] min-h-screen p-6 flex flex-col transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'} relative`}>
        <header className="flex justify-between items-center mb-6 absolute top-0 right-0 transform translate-x-1/2 p-2">
          <button onClick={toggleSidebar} className="text-2xl">
            {!isOpen ? <DirectRight size="32" color="#FF8A65" variant="Bold" /> : <DirectLeft size="32" color="#FF8A65" variant="Bold" />}
          </button>
        </header>
        <div className={`flex flex-col items-center mb-10 mt-12`}>
          <div className="flex items-center space-x-2">
            <div className={`text-gradient text-xl font-extrabold text-center text-gray-600 mb-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Siverce</div>
          </div>
          <img
            className={`rounded-full mt-4 transition-all duration-300 transform ${isOpen ? 'w-20 h-20 rotate-[360deg]' : 'rotate-[-360deg]'}`}
            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=2000"
            alt="User"
          />
          <h2 className={`text-xl font-bold mt-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{loggedUser.first_name ?? 'Hello'} {loggedUser.last_name ?? 'Guest'}</h2>
          <p className={`text-sm text-gray-500 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {(loggedUser.is_superuser && loggedUser.is_staff) ? 'Super User' : 'Staff'}
          </p>
        </div>
        <nav className="flex-1 max-h-lvh overflow-scroll">
          <ul>
            {modules.map((module) => (
              <li key={module.name} className="mb-4">
                <Link to={module?.endPoint} className={`flex items-center text-gray-700 font-semibold ${selectedModule === module.name ? 'bg-slate-50 text-gray-950 rounded-lg h-10 w-full' : ''}`} onClick={() => handleModuleClick(module.name)}>
                  <span className="m-2">
                    <FontAwesomeIcon icon={module.icon} />
                  </span>
                  <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{module.name}</span>
                </Link>
              </li>
            ))}

            <li className="mb-4">
              <div className={`flex items-center justify-between text-gray-700 font-semibold cursor-pointer ${selectedModule === 'Configuration' ? 'bg-slate-50 text-gray-950 rounded-lg h-10 w-full' : ''}`} onClick={handleMasterClick}>
                <div className="flex items-center">
                  <span className="m-2">
                    <FontAwesomeIcon icon={faList} />
                  </span>
                  {isOpen && <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Configuration</span>}
                </div>
                {isOpen && <FontAwesomeIcon icon={isMasterOpen ? faChevronDown : faChevronRight} />}
              </div>
              {isMasterOpen && (
                <ul className="mt-2 ml-6">
                  {masterModules.map((module) => (
                    <li key={module.name} className="mb-2">
                      <Link to={module?.endPoint} className={`flex items-center text-gray-700 font-semibold pl-2 ${selectedModule === module.name ? 'bg-slate-50 text-gray-950 rounded-lg h-10 w-full' : ''}`} onClick={() => handleModuleClick(module.name)}>
                        <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{module.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <button className="mt-auto flex items-center text-gray-700" onClick={handleLogout}>
          <span className="text-lg mr-2">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Log out</span>
        </button>
      </aside>
      <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'pl-4' : 'pl-4'}`}>
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
