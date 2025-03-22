const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    description: "The email of the invited user"
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    description: "The team to which the user is invited"
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    description: "The user who sent the invitation"
  },
  role: {
    type: String,
    enum: ['owner', 'admin', 'member'],
    required: true,
    description: "The role of the invited user"
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
    description: "The status of the invitation"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: "When the invitation was created"
  }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;