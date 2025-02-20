import { FiBell } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Welcome Message */}
      <div>
        <h2 className="text-lg font-semibold">Welcome Back, {localStorage.getItem('name')} 👋</h2>
        <p className="text-gray-500 text-sm">Here what’s happening with your expenses today.</p>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <FiBell size={20} />
        </button>
        
        {/* User Menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center space-x-2 border rounded-lg px-3 py-1 text-gray-700 hover:bg-gray-100">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">{localStorage.getItem('name')?.split(' ').map(n => n[0]).join('')}</div>
            <span>{localStorage.getItem('name')}</span>
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