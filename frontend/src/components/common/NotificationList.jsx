import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../../api/notifications';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    getNotifications();
  }, []);

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <div key={notification._id} className="notification-item">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;