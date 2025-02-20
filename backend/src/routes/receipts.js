const express = require('express');
const { 
  analyzeReceipt,
  saveReceipt
} = require('../controllers/receiptController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Analyze a receipt
router.post('/analyze', analyzeReceipt);

// Save a receipt data
router.post('/saveReceipt', saveReceipt);

module.exports = router;