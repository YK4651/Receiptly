const User = require('../models/User');
const Team = require('../models/Team');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    businessName,
    businessIndustry,
    country,
    businessAddress,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      passwordHash: hashedPassword,
      createdAt: new Date(),
      businessName,
      businessIndustry,
      country,
      businessAddress,
    });

    await user.save();

    // Create a new team for the user
    const team = new Team({
      name: `${businessName}'s Team`,
      ownerId: user._id,
      members: [user._id]
    });
    await team.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, userId: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Fetch the team associated with the user
    const team = await Team.findOne({ ownerId: user._id });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, teamId: team._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id, email: user.email, name: user.name, teamId: team._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};