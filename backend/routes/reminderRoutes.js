const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const reminderController = require('../controllers/reminderController');

router.get('/:userId', verifyToken, reminderController.getRemindersFromTimetable);

module.exports = router;