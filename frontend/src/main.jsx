import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ClientLayout from "./layouts/ClientLayout.jsx";
import AuthMiddleware from "./components/Auth/AuthMiddleware.jsx";
import Reports from "./components/Reports.jsx"
import "./index.css"; // Import Tailwind CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<AuthMiddleware><App /></AuthMiddleware>} />
          <Route path="/reports" element={<AuthMiddleware><Reports /></AuthMiddleware>} />
          </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);