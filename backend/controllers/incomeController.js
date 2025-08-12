const db = require('../db');

// Add a new income record for the logged-in user
exports.addIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount is required and must be a positive number.' });
        }
        const result = await db.query(
            'INSERT INTO incomes (user_id, amount, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [userId, amount]
        );
        res.status(201).json({ message: 'Income added successfully', income: result.rows[0] });
    } catch (err) {
        console.error('Add income error:', err);
        res.status(500).json({ message: 'Failed to add income' });
    }
};

// Get total income for the current month for the logged-in user
exports.getMonthlyIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        // Get first and last day of current month
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        // Query incomes for this user in the current month
        const result = await db.query(
            `SELECT COALESCE(SUM(amount), 0) AS total_income
             FROM incomes
             WHERE user_id = $1
               AND created_at >= $2
               AND created_at <= $3`,
            [userId, firstDay, lastDay]
        );
        res.json({ totalIncome: result.rows[0].total_income });
    } catch (err) {
        console.error('Get monthly income error:', err);
        res.status(500).json({ message: 'Failed to fetch monthly income' });
    }
};

// Optionally, add more income-related controllers here (e.g., getIncomes, deleteIncome, etc.)
