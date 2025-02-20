const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    description: "The ID of the user who owns this receipt"
  },
  receiptData: {
    type: Array,
    required: true,
    description: "The data extracted from the receipt"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "When the receipt was created"
  }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;