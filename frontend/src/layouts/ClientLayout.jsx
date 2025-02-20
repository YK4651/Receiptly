import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ClientLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="min-h-screen" />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="p-6 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;