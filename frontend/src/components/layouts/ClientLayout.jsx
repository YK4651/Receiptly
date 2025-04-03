import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../navigation/Sidebar";
import Navbar from "../navigation/Navbar";

const ClientLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/receipts"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Navbar */}
        {!hideNavbarPaths.includes(location.pathname) && (
          <div className="sticky top-0 z-10 bg-white shadow-md">
            <Navbar />
          </div>
        )}

        {/* Main Content Area */}
        <main className="p-6 flex-grow bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;