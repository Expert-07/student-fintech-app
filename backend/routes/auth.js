const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const { getStreak } = require('../controllers/streakController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', verifyToken, getUser);

// Route to get user streak
router.get('/streak', verifyToken, getStreak);

module.exports = router;