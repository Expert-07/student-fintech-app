const db = require('../db');

// Add a new reading plan
exports.addReadingPlan = async (req, res) => {
    try {
        const userId = req.user.id;
        const { book_title, total_pages, pages_per_day, start_date, end_date } = req.body;
        if (!book_title || !total_pages || !pages_per_day || !start_date || !end_date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const result = await db.query(
            `INSERT INTO reading_plans (user_id, book_title, total_pages, pages_per_day, start_date, end_date)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userId, book_title, total_pages, pages_per_day, start_date, end_date]
        );
        res.status(201).json({ message: 'Reading plan created', plan: result.rows[0] });
    } catch (err) {
        console.error('Add reading plan error:', err);
        res.status(500).json({ message: 'Failed to create reading plan' });
    }
};

// Get all reading plans for the logged-in user
exports.getReadingPlans = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(
            `SELECT * FROM reading_plans WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        );
        res.json({ plans: result.rows });
    } catch (err) {
        console.error('Get reading plans error:', err);
        res.status(500).json({ message: 'Failed to fetch reading plans' });
    }
};

// Update progress (current_page) for a reading plan
exports.updateProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { planId } = req.params;
        const { current_page } = req.body;
        if (current_page === undefined || isNaN(current_page) || current_page < 0) {
            return res.status(400).json({ message: 'Valid current_page is required.' });
        }
        const result = await db.query(
            `UPDATE reading_plans SET current_page = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING *`,
            [current_page, planId, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Reading plan not found.' });
        }
        res.json({ message: 'Progress updated', plan: result.rows[0] });
    } catch (err) {
        console.error('Update progress error:', err);
        res.status(500).json({ message: 'Failed to update progress' });
    }
};

// Delete a reading plan
exports.deleteReadingPlan = async (req, res) => {
    try {
        const userId = req.user.id;
        const { planId } = req.params;
        const result = await db.query(
            `DELETE FROM reading_plans WHERE id = $1 AND user_id = $2 RETURNING *`,
            [planId, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Reading plan not found.' });
        }
        res.json({ message: 'Reading plan deleted' });
    } catch (err) {
        console.error('Delete reading plan error:', err);
        res.status(500).json({ message: 'Failed to delete reading plan' });
    }
};
