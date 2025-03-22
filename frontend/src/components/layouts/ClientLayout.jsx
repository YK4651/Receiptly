import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import Navbar from "../navigation/Navbar";

const ClientLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/receipts"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="min-h-screen" />

      {/* Main Content */}
      <div className="flex flex-col ml-[231px] pl-[1.5rem] flex-1">
        {/* Navbar */}
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

        {/* Main Content Area */}
        <main className="p-6 flex-grow bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;