const express = require('express');
const { 
  analyzeReceipt
} = require('../controllers/receiptController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Analyze a receipt
router.post('/analyze', analyzeReceipt);

module.exports = router;