import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiSettings, FiLayers } from "react-icons/fi";

const Sidebar = () => {
  //const userImage = localStorage.getItem('userImage') || 'https://www.svgrepo.com/show/382106/user.svg';

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6">LOGO</div>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <FiHome /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/receipts" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <FiFileText /> <span>Receipts</span>
            </Link>
          </li>
          <li>
            <Link to="/expense-categorization" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <FiLayers /> <span>Expense Categorization</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <FiSettings /> <span>Account Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* User Info */}
      <div className="mt-auto flex items-center space-x-3 border-t pt-4">
        {/* <img src={userImage} alt="User" className="w-10 h-10 rounded-full" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

        <div>
          <p className="text-gray-700 font-semibold">{localStorage.getItem('name')}</p>
          <p className="text-sm text-gray-500">{localStorage.getItem('email')}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;