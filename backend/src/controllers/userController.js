const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');
const User = require('../models/User');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

const updateUserRole = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid user id');
  }

  if (req.body.role && !['user', 'admin'].includes(req.body.role)) {
    res.status(400);
    throw new Error('Invalid user role');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.role = req.body.role || user.role;
  await user.save();
  res.json({ _id: user._id, role: user.role });
});

module.exports = { getUsers, updateUserRole };
