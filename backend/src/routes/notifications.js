const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Route to create a notification
router.post('/', createNotification);

// Route to get all notifications
router.get('/', getNotifications);

module.exports = router;