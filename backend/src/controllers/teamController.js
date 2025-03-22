const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = new Team({
      name,
      ownerId: req.user._id,
      members: [req.user._id]
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

// Get all teams for a user
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ ownerId: req.user._id }).populate('members', 'name email');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving teams', error });
  }
};

// Add a member to a team
exports.addMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    team.members.push(userId);
    await team.save();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error adding member to team', error });
  }
};