const db = require('../db');

// Function to calculate streak based on pages read updates
const calculateStreak = async (userId) => {
  try {
    const query = `
      SELECT date, pages_read
      FROM reading_logs
      WHERE user_id = $1
      ORDER BY date DESC
    `;
    const { rows } = await db.query(query, [userId]);

    let streak = 0;
    let currentDate = new Date();

    for (const log of rows) {
      const logDate = new Date(log.date);
      const diffInDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24));

      if (diffInDays === 0 || diffInDays === 1) {
        streak++;
        currentDate = logDate; // Update currentDate to the log date
      } else {
        break; // Streak is broken
      }
    }

    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    throw error;
  }
};

// Controller to handle streak requests
const getStreak = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in the request object

  try {
    const streak = await calculateStreak(userId);
    res.status(200).json({ streak });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch streak', error: error.message });
  }
};

module.exports = {
  getStreak,
};
