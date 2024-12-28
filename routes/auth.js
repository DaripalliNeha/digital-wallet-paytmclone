const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate user (login)
router.post('/login', authUser);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
