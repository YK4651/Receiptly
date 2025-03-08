import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/pages/App.jsx";
import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Auth/Register.jsx";
import ClientLayout from "./components/layouts/ClientLayout.jsx";
import AuthMiddleware from "./components/pages/Auth/AuthMiddleware.jsx";
import Reports from "./components/pages/Reports/Reports.jsx";
import ResultsTable from "./components/pages/Receipt/ResultsTable.jsx";
import "./index.css"; // Import Tailwind CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<AuthMiddleware><App /></AuthMiddleware>} />
          <Route path="/receipts" element={<AuthMiddleware><ResultsTable /></AuthMiddleware>} />
          {/* <Route path="/receipts" element={<AuthMiddleware><ResultsTable /></AuthMiddleware>} /> */}
          <Route path="/reports" element={<AuthMiddleware><Reports /></AuthMiddleware>} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);