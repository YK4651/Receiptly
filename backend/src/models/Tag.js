const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "The name of the tag"
  }
}, {
  timestamps: true
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;