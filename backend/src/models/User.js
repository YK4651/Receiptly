const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "The user's full name"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    description: "The user's email address"
  },
  passwordHash: {
    type: String,
    required: true,
    description: "The hashed password of the user"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "When the user was created"
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;