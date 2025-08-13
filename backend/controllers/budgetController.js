const db = require('../db');

exports.setBudget = async (req, res) => {
    // Add or update a budget
    const user_id = req.user.id;
    const { category, limit_amount } = req.body;
    try {
        // Check for existing entry
        const existing = await db.query(`SELECT * FROM budgets WHERE user_id = $1 AND category = $2`, [user_id, category]);

        let result;
        if (existing.rows.length > 0) {
            result = await db.query(`UPDATE budgets SET limit_amount = $1 WHERE user_id = $2 AND category = $3 RETURNING *`, [limit_amount, user_id, category]);
        } else {
            // Insert a new budget
            result = await db.query(`INSERT INTO budgets (user_id, category, limit_amount) VALUES ($1, $2, $3) RETURNING *`, [user_id, category, limit_amount]);
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error setting budget:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getBudget = async (req, res) => {
    const user_id = req.user.id;

    try {
        const result = await db.query(`SELECT * FROM budgets WHERE user_id = $1 ORDER BY category`, [user_id]);
        res.json(result.rows); // Ensure the result is returned
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getBudgetSummary = async (req, res) => {
    const user_id = req.user.id;

    try {
        const result = await db.query(`SELECT b.category, b.limit_amount, COALESCE(SUM(e.amount), 0) AS total_spent,
            (b.limit_amount - COALESCE(SUM(e.amount), 0)) AS remaining
            FROM budgets b
            LEFT JOIN expenses e ON b.user_id = e.user_id AND b.category = e.category
            WHERE b.user_id = $1
            GROUP BY b.category, b.limit_amount`, [user_id]);
        res.json(result.rows); // Ensure the result is returned
    } catch (error) {
        console.error('Error fetching budget summary:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};