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

  const data = response.data;
  const token = data.token;
  const userId = data.userId; // Assuming the response contains userId
  const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId); // Store userId in local storage
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