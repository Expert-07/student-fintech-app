const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/:userId', verifyToken, notificationController.getNotifications);
router.patch('/read/:id', verifyToken, notificationController.markAsRead);

module.exports = router;