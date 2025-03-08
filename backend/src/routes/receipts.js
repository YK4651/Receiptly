const express = require('express');
const { 
  analyzeReceipt,
  saveReceipt,
  getReceipts,
  getReceiptById,
  updateReceipt
} = require('../controllers/receiptController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Analyze a receipt
router.post('/analyze', analyzeReceipt);

// Save a receipt data
router.post('/saveReceipt', saveReceipt);

// Get all receipts
router.get('/', getReceipts);

// Get a receipt by ID
router.get('/:id', getReceiptById);

// Update a receipt by ID
router.put('/:id', updateReceipt);

module.exports = router;