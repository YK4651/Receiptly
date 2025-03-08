const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController');

const router = express.Router();

// Route to create a notification
router.post('/', createNotification);

// Route to get all notifications
router.get('/', getNotifications);

module.exports = router;