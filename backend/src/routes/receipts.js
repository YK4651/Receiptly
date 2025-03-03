const express = require('express');
const { 
  createReceipt, 
  getReceipts, 
  getReceiptById, 
  updateReceipt, 
  deleteReceipt,
  analyzeReceipt,
  saveReceipt
} = require('../controllers/receiptController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Create a new receipt
router.post('/', createReceipt);

// Get all receipts
router.get('/', getReceipts);

// Get a receipt by ID
router.get('/:id', getReceiptById);

// Update a receipt by ID
router.put('/:id', updateReceipt);

// Delete a receipt by ID
router.delete('/:id', deleteReceipt);

// Analyze a receipt
router.post('/analyze', analyzeReceipt);

// Save a receipt
router.post('/saveReceipt', saveReceipt);

module.exports = router;