import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText, FiSettings, FiSearch, FiBarChart2 } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/receipts", label: "Receipt Management", icon: <FiFileText /> },
    { path: "/reports", label: "Reports & Insights", icon: <FiBarChart2 /> },
    { path: "/settings", label: "Account Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 bg-[#131861] fixed shadow-md p-6 flex flex-col min-h-screen border-r border-gray-300">
      <div>
        {/* Logo */}
        <div className="text-sm font-medium text-white font-bold mb-6">
          <span className="bg-[#eaebfd]/15 p-3 rounded-md">LOGO</span>
        </div>

        {/* Search Bar */}
        <div className="mb-4 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border border-gray-300 shadow-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 pt-1">
          <ul className="space-y-2">
            {navItems.map(({ path, label, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex py-2 px-2 rounded-md items-center space-x-2 
                    ${
                      location.pathname === path
                        ? "bg-[#eaebfd]/20 text-white"
                        : "text-gray-400 hover:bg-[#eaebfd]/20 hover:text-white"
                    }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-light text-sm">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* User Info */}
      <div className="mt-auto flex items-center space-x-3 border-t border-gray-600 pt-5 pb-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

        <div>
          <p className="text-gray-300 font-light text-sm">{localStorage.getItem("name")}</p>
          <p className="text-xs font-thin text-gray-400">{localStorage.getItem("email")}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
