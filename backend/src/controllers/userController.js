const UserSettings = require('../models/User');

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSettings.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSettings.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
