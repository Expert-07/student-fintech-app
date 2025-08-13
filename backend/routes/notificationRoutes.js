const express = require('express');
const webPush = require('web-push');
const router = express.Router();
const notificationController = require('../controllers/notificationsController');
const verifyToken = require('../middlewares/verifyToken');
const timetableController = require('../controllers/timetableController'); // Import timetable controller

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = []; // Store subscriptions in memory or a database

// Save subscription
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscription saved.' });
});

// Send notification
router.post('/send', async (req, res) => {
  const { title, body } = req.body;

  const payload = JSON.stringify({ title, body });

  try {
    await Promise.all(
      subscriptions.map(sub =>
        webPush.sendNotification(sub, payload).catch(err => console.error(err))
      )
    );
    res.status(200).json({ message: 'Notifications sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending notifications.' });
  }
});

// Send timetable reminders
router.post('/send-timetable-reminders', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const reminders = await timetableController.getUpcomingClass({ params: { userId } });

    if (reminders && reminders.length > 0) {
      const payload = JSON.stringify({
        title: 'Upcoming Class Reminder',
        body: `You have ${reminders.length} upcoming class(es). Check your timetable for details.`
      });

      await Promise.all(
        subscriptions.map(sub =>
          webPush.sendNotification(sub, payload).catch(err => console.error(err))
        )
      );

      res.status(200).json({ message: 'Timetable reminders sent.' });
    } else {
      res.status(200).json({ message: 'No upcoming classes to notify.' });
    }
  } catch (err) {
    console.error('Error sending timetable reminders:', err);
    res.status(500).json({ message: 'Error sending timetable reminders.' });
  }
});

router.get('/:userId', verifyToken, notificationController.getNotifications);
router.patch('/read/:id', verifyToken, notificationController.markAsRead);

module.exports = router;