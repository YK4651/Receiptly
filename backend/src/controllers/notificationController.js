const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }
    const notification = new Notification({
      userId: req.user._id,
      message: req.body.message,
      createdAt: new Date(),
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error });
  }
};

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notifications', error });
  }
};