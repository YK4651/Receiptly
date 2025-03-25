const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "The user's full name",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    description: "The user's email address",
  },
  dateOfBirth: {
    type: Date,
    required: false,
    description: "The user's date of birth", 
  },
  location: {
    type: String,
    required: false,
    description: "The user's location",
  },
  passwordHash: {
    type: String,
    required: true,
    description: "The hashed password of the user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "When the user was created",
  },
  businessName: {
    type: String,
    required: true,
    description: "The name of the business",
  },
  businessIndustry: {
    type: String,
    required: true,
    description: "The field of the business",
  },
  country: {
    type: String,
    required: true,
    description: "The country of the business",
  },
  businessAddress: {
    type: String,
    required: true,
    description: "Where the business is located",
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;