const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    description: "The ID of the user who owns this receipt"
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    description: "The ID of the team that created this receipt"
  },
  receiptData: {
    type: Array,
    required: true,
    description: "The data extracted from the receipt"
  },
  imageFileNames: {
    type: Array,
    required: true,
    description: "The names of the files associated with the receipt"
  },
  imageUrls: {
    type: Array,
    required: true,
    description: "The files associated with the receipt"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "When the receipt was created"
  }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;