const express = require('express');
const { loginUser, registerUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/me', authLimiter, protect, getProfile);

module.exports = router;
