import { Link, Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white">
        <Link to="/">
          <h1 className="text-xl">Receiptly</h1>
        </Link>
        <nav className="mt-4">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/reports" className="mr-4">Reports</Link>
          <Link to="/create-category">Create Category</Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;