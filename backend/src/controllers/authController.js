const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const normalizeEmail = (email) => {
  const safeEmail = String(email || '').trim().toLowerCase();
  return safeEmail;
};

const isValidEmail = (email) => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain || domain.startsWith('.') || domain.endsWith('.')) return false;
  return domain.includes('.');
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  const safeEmail = normalizeEmail(email);
  if (!isValidEmail(safeEmail)) {
    res.status(400);
    throw new Error('Invalid email format');
  }
  const existingUser = await User.findOne({ email: safeEmail });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const isFirstUser = (await User.countDocuments()) === 0;

  const user = await User.create({
    name: String(name).trim(),
    email: safeEmail,
    password,
    role: isFirstUser ? 'admin' : 'user',
  });

  res.status(201).json({
    user: sanitizeUser(user),
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const safeEmail = normalizeEmail(email);
  if (!isValidEmail(safeEmail)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const user = await User.findOne({ email: safeEmail });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    user: sanitizeUser(user),
    token: generateToken(user._id),
  });
});

const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

module.exports = { registerUser, loginUser, getProfile };
