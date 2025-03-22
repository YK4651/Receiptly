import { FiBell, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white p-4 pb-0 flex justify-between items-center border-gray-300">
      {/* Welcome Message */}
      <div className="pt-8 pb-8 pl-6">
        <h2 className="text-2xl font-semibold py-1 text-gray-700">Welcome Back, 
          <span className="px-2 pr-3">{localStorage.getItem('name')}</span>👋</h2>
        <p className="text-gray-500 font-light text-md">Here what’s happening with your expenses today.</p>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full px-1.5 py-1.5 mr-6">
          <FiBell size={20} />
        </button>
        
        {/* User Menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2 border border-gray-200 rounded-sm px-3 py-2 text-gray-700 hover:bg-gray-100">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm text-white">{localStorage.getItem('name')?.split(' ').map(n => n[0]).join('')}</div>
            <span className="px-3">{localStorage.getItem('name')}</span>
            <span><FiChevronDown /></span>
          </button>
          
          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;