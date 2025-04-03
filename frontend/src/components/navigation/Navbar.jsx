import { FiBell, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { useState, useEffect, useRef } from "react";
import { fetchNotifications } from "../../api/notifications";

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotificationClick = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
      setShowNotifications(!showNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white p-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-300">
      {/* Welcome Message */}
      <div className="mb-4 md:mb-0  hidden md:block">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-700">
          Welcome Back, <span className="px-2">{localStorage.getItem("name")}</span>👋
        </h2>
        <p className="text-sm md:text-md text-gray-500 font-light">
          Here’s what’s happening with your expenses today.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Icon */}
        <div ref={dropdownRef} className="relative">
          <button
            className="relative text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full p-2"
            onClick={handleNotificationClick}
          >
            <FiBell size={20} />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2 z-50">
              <h3 className="text-sm font-semibold px-4 py-2 border-b">Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-700">{notification.message}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 px-4 py-2">No notifications</p>
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 border border-gray-200 rounded-full px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm text-white">
              {localStorage.getItem("name")?.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="hidden md:inline">{localStorage.getItem("name")}</span>
            <FiChevronDown />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;