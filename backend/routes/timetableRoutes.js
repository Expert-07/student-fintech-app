const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const timetableController = require('../controllers/timetableController');
const { time } = require('framer-motion');

router.post('/', verifyToken, timetableController.addTimetable);
router.get('/:userId', verifyToken, timetableController.getTimetable);
router.get('/upcoming/:userId', verifyToken, timetableController.getUpcomingClass);
router.get('/checking/:userId', verifyToken, timetableController.addget);
router.delete('/:id', verifyToken, timetableController.deleteTimetable);

// Example Express route
router.get('/timetable/today/:userId', async (req, res) => {
  const userId = req.params.userId;
  const today = new Date();
  const todayDay = today.getDay(); // 0 (Sun) - 6 (Sat)
  try {
    const result = await db.query(
      'SELECT * FROM timetable WHERE user_id = $1 AND day_of_the_week = $2',
      [userId, todayDay]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;