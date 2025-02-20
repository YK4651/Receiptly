import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onKeyPress={handleKeyPress}>
          <h2 className="text-center text-3xl">Create your account</h2>
          <h4 className="text-center py-2 text-gray-400">Please enter your details</h4>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleRegister}
              className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-gray-500 mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-800"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;