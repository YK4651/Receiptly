const Invitation = require('../models/Invitation');
const Team = require('../models/Team');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Send an invitation
exports.sendInvitation = async (req, res) => {
  try {
    const { email, teamId, role, ownerId } = req.body;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the user is already a member of the team
    const user = await User.findOne({ email });
    if (user && team.members.includes(user._id)) {
      return res.status(400).json({ message: 'User is already a member of the team' });
    }

    // Check if an invitation already exists
    const existingInvitation = await Invitation.findOne({ email, teamId, status: 'pending' });
    if (existingInvitation) {
      return res.status(400).json({ message: 'Invitation already exists' });
    }

    const invitation = new Invitation({
      email,
      teamId,
      invitedBy: ownerId,
      status: 'pending',
      role: role
    });
    
    await invitation.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Team Invitation',
      text: `You have been invited to join the team ${team.name}. Please click the link to accept the invitation: ${process.env.FRONTEND_URL}/api/invitations/accept/${invitation._id}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email', error });
      }
      res.status(200).json({ message: 'Invitation sent', invitation });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending invitation', error });
  }
};

// Accept an invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    invitation.status = 'accepted';
    await invitation.save();

    const user = await User.findOne({ email: invitation.email });
    if (user) {
      const team = await Team.findById(invitation.teamId);
      team.members.push(user._id);
      await team.save();
    }

    // Remove the invitation from the database
    await Invitation.findByIdAndDelete(invitationId);

    res.status(200).json({ message: 'Invitation accepted', invitation });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting invitation', error });
  }
};

// Get pending invitations
exports.getPendingInvitations = async (req, res) => {
  try {
    const pendingInvitations = await Invitation.find({ status: 'pending' });
    res.status(200).json(pendingInvitations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending invitations', error });
  }
};