import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiFileText,
    FiSettings,
    FiSearch,
    FiBarChart2,
    FiUsers,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { useState } from "react";
import ReceiptlyLogo from "../../assets/Receiptly-White-Whole.svg";

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
        { path: "/receipts", label: "Receipt Management", icon: <FiFileText /> },
        { path: "/reports", label: "Reports & Insights", icon: <FiBarChart2 /> },
        { path: "/teams", label: "Manage Team", icon: <FiUsers /> },
        { path: "/settings", label: "Account Settings", icon: <FiSettings /> },
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
				<button
					onClick={toggleSidebar}
					className="text-white bg-[#0B0F3B] p-2 rounded-md shadow-md"
				>
					{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
				</button>
			</div>

            {/* Sidebar */}
            <aside
            className={`fixed top-0 left-0 z-40 w-64 bg-[#0B0F3B] shadow-md p-6 flex flex-col min-h-screen border-r border-gray-300 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0`}
        >
            <div>
                {/* Logo */}
                <div className="text-sm font-medium text-[#9AA4B2] font-bold mb-6 flex justify-center md:justify-start">
                    <Link to="/dashboard">
                        <img
                            src={ReceiptlyLogo}
                            alt="Receiptly Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full border border-gray-300 shadow-xs rounded-lg focus-within:ring-2 focus-within:border-blue-300 mb-3">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 pl-12 rounded-lg text-gray-200 focus:outline-none placeholder:text-gray-400"
                    />
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 pt-1">
                    <ul className="space-y-2">
                        {navItems.map(({ path, label, icon }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={`flex py-2 px-2 rounded-md items-center space-x-2 ${
                                        location.pathname === path
                                            ? "bg-[#eaebfd]/25 text-[#eaebfd]"
                                            : "text-[#9AA4B2] hover:bg-[#eaebfd]/20 hover:text-white"
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
			</aside>

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
					onClick={toggleSidebar}
				></div>
			)}
        </>
    );
};

export default Sidebar;