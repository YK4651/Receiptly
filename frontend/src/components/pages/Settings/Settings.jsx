// src/components/Settings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessModal from "./SuccessBox";

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    location: "",
    defaultCurrency: "CAD",
    language: "English",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // New state to control showing/hiding the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example: get the user ID from localStorage
  const userId = localStorage.getItem("userId");
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch user data on mount
    axios
      .get(`${VITE_API_BASE_URL}/users/${userId}`)
      .then((response) => {
        const { name, email, dateOfBirth, country, defaultCurrency, language } =
          response.data;
        setUser({
          name: name || "",
          email: email || "",
          dateOfBirth: dateOfBirth
            ? new Date(dateOfBirth).toISOString().split("T")[0]
            : "",
          // Rename "country" to "location" to match your UI
          location: country || "",
          defaultCurrency: defaultCurrency || "CAD",
          language: language || "English",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId, VITE_API_BASE_URL]);

  // Handle text/select changes for user fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle password field changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  // Submit all changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      ...user,
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    };

    axios
      .put(`${VITE_API_BASE_URL}/users/${userId}`, updateData)
      .then((response) => {
        // Show modal
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setMessage("Error updating user");
      });
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      <h1 className="text-2xl font-semibold mb-2">Account Settings</h1>
      <p className="text-gray-600 mb-6">
        Manage your account details, password, and preferences.
      </p>

      {/* Optional: If you still want to show a text message as well */}
      {message && <div className="mb-4 text-green-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white border border-gray-300 rounded-md shadow">
          <h2 className="text-md p-6 font-light font-semibold border-b border-gray-300 mb-4">
            Profile Information
          </h2>
          <div className="p-6">
            <div className="mb-6 flex justify-center items-center">
              <div className="w-30 h-30 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-4">
                <span className="text-gray-400">Photo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                  className="block w-full p-1 px-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  className="block w-full p-1 px-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="block w-full p-1 px-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  required
                  className="block w-full p-1 px-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-gray-300 rounded-md shadow">
          <h2 className="text-lg p-6 font-semibold border-b border-gray-300 mb-2">
            Change Password
          </h2>
          <div className="grid grid-cols-1 p-6 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="block w-full rounded-md p-1 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="block w-full rounded-md p-1 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="block w-full rounded-md p-1 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-md border border-gray-300 shadow">
          <h2 className="text-lg p-6 font-semibold border-b border-gray-300 mb-4">
            Preferences
          </h2>
          <div className="grid grid-cols-1 p-6 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Currency
              </label>
              <select
                name="defaultCurrency"
                value={user.defaultCurrency}
                onChange={handleChange}
                className="block w-full rounded-md p-1 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                name="language"
                value={user.language}
                onChange={handleChange}
                className="block w-full rounded-md p-1 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* SuccessModal is rendered conditionally based on isModalOpen */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDashboard={() => {
          // Example: navigate to a dashboard route, or simply close modal
          console.log("Navigating to dashboard (or any other action)...");
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Settings;
