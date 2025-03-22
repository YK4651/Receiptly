// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  country: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
