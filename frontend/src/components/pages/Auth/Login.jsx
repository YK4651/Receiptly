import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideImage from "./SideImage";
import Logo from "../../../assets/Receiptly-Blue-Whole.svg";
import { login } from "../../../api/auth";

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.registered) {
      toast.success("Registration successful! Please log in.");
    }
  }, [location.state]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex h-screen">
      <SideImage />
      <div className="flex flex-col items-center h-screen bg-white md:w-1/2 overflow-y-scroll overflow-x-hidden">
        <div className="flex justify-center md:justify-end w-full">
          <p className="text-gray-500 mt-3 md:mr-[60px]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#2E39E6]">
              <u>Sign up</u>
            </Link>
          </p>
        </div>

        <div className="flex justify-start w-full pl-[1rem] pr-[1rem] md:ml-[60px] mt-[10%]">
          <form
            className="bg-white rounded pt-6 pb-8 mb-4"
            onKeyPress={handleKeyPress}
          >
            <img src={Logo} alt="Receiptly logo" className="w-42 mb-[20px] mx-auto md:mx-0 md:ml-[1rem] " />
            <h2 className="md:ml-[1rem] text-3xl text-center md:text-left">Log in to Receiptly</h2>
            <h4 className="md:ml-[1rem] md:text-left text-center py-2 mb-[20px]">
              Access your paperless, organized transactions—anytime, anywhere.
            </h4>

            <div className="mb-4">
              <label
                className="ml-[1rem] block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-[1rem] shadow-xs appearance-none border border-gray-200 rounded w-[90%] md:w-[70%] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="sample@receiptly.com"
              />
            </div>
            <div className="mb-6 relative">
              <label
                className="ml-[1rem] block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-[1rem] shadow-xs appearance-none border border-gray-200 rounded w-[90%] md:w-[70%] py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="password"
              />
              <span
                className="absolute right-10 md:right-40 top-9 text-sm text-blue-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <u className="text-[#2E39E6]">
                  {showPassword ? "Hide" : "Show"}
                </u>
              </span>
            </div>

            <div className="md:ml-[1rem] flex items-center justify-center md:justify-between">
              <button
                type="button"
                onClick={handleLogin}
                className="mt-[28px] bg-[#2E39E6] hover:bg-white text-white hover:text-[#2E39E6] transition duration-300  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[90%] md:w-[70%] hover:border hover:border-[#2E39E6] cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;