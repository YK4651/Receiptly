const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "The name of the category"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    description: "The user who created this category (if not system-defined)"
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;