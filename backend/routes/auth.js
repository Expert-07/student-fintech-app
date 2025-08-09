const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/user', verifyToken, getUser);

module.exports = router;