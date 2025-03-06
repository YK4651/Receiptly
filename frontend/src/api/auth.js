import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  // set token and user data in local storage
  const data = response.data;
  const token = data.token;
  const userId = data.userId; 
  const name = data.name; 
  const userEmail = data.email; 
  const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; 

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId); 
  localStorage.setItem("name", name);
  localStorage.setItem("email", userEmail); 
  localStorage.setItem("tokenExpiry", expiryTime);

  return data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    name,
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error("Registration failed");
  }

  return response.data;
};