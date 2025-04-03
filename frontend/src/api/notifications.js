import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createNotification = async (message) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_BASE_URL}/notifications`, { message }, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const fetchNotifications = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/notifications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};