const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const verifyToken = require('../middlewares/verifyToken');

// Route to get all posts
router.get('/search', verifyToken, socialController.searchStudents);
// Route to accept a connection request
router.post('/accept', verifyToken, socialController.acceptController);
// Route to reject a connection request
router.post('/reject', verifyToken, socialController.rejectController);
// Route to get relevant posts based on user connections and department/year of study
router.get('/posts/relevant', verifyToken, socialController.getRelevantPosts);
//connect
router.get('/connect', verifyToken, socialController.sendConnectionRequest);

module.exports = router;