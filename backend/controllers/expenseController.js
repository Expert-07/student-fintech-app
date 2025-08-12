// Get savings rate for the current month
exports.getMonthlySavingsRate = async (req, res) => {
  const dayjs = require('dayjs');
  const userId = req.user.id;
  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
  try {
    // Get total income for the month
    const incomeResult = await db.query(
      `SELECT COALESCE(SUM(amount),0) AS total_income FROM incomes WHERE user_id = $1 AND created_at BETWEEN $2 AND $3`,
      [userId, startOfMonth, endOfMonth]
    );
    // Get total expenses for the month
    const expenseResult = await db.query(
      `SELECT COALESCE(SUM(amount),0) AS total_expenses FROM expenses WHERE user_id = $1 AND created_at BETWEEN $2 AND $3`,
      [userId, startOfMonth, endOfMonth]
    );
    const totalIncome = parseFloat(incomeResult.rows[0].total_income);
    const totalExpenses = parseFloat(expenseResult.rows[0].total_expenses);
    let savingsRate = 0;
    if (totalIncome > 0) {
      savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
    }
    res.status(200).json({
      totalIncome,
      totalExpenses,
      savingsRate: Math.max(0, Math.round(savingsRate)),
    });
  } catch (error) {
    console.error('Error calculating savings rate:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
const db = require('../db');

//Add an expense
exports.addExpense = async (req, res) => {
    const { title, amount, category } = req.body;
    const user_id = req.user.id;

    if (!title || !amount) {
        return res.status(400).json({message: 'Title and amount are required'});
    }

    try {
        const result =await db.query(`INSERT INTO expenses (user_id, title, amount, category) VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, title, amount, category]);
       console.log('Query result: ', result);
       
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding expense: ', err);
        res.status(500).json({message: 'Server Error'})
        
    }

};

//Get all expenses for the logged in user
exports.getExpense = async (req, res) => {
    const user_id  = req.user.id;

    try {
        const result = await db.query(`SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC`, [user_id]);
        res.json(result.rows);
        console.log(user_id);
        
    } catch (error) {
        console.error("Error fetching expenses: ", error);
        res.status(500).json({message: 'Server Error'})
        
    }
};

//Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const result = await db.query(`DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *`, [id, user_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({message: 'Expense not found or not yours'});
        }
        res.json({message: 'Expense deleted successfully'});
    } catch (error) {
        console.error('Error deleted expense:', error);
        res.status(500).json({message: 'Server error'});
        
    }
};

// Get expenses grouped by month
// Get expenses grouped by month
exports.getMonthlyExpenses = async (req, res) => {
  const dayjs = require('dayjs');
  const userId = req.user.id;

  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');

  try {
    const result = await db.query(
      `SELECT category, SUM(amount) AS total 
       FROM expenses 
       WHERE user_id = $1 AND created_at BETWEEN $2 AND $3 
       GROUP BY category`,
      [userId, startOfMonth, endOfMonth]
    );
    //
   // console.log('Console Breakdown:', categoryBreakdown.rows);
    

    // Make sure totals are numbers
    const categoryBreakdown = result.rows.map(row => ({
      category: row.category,
      total: parseFloat(row.total), // use parseFloat for decimals
    }));

    // Sum using proper numbers
    const totalSpent = categoryBreakdown.reduce((sum, row) => sum + parseFloat(row.total), 0);
    

    res.status(200).json({ categoryBreakdown, totalSpent });
  } catch (error) {
    console.error('Error fetching monthly expenses:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

//Get expenses weekly
exports.getWeeklyExpenses = async (req, res) => {
    const dayjs = require('dayjs');
    const userId = req.user.id;

    const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD');
    const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD');

    try {
        const result = await db.query(
            `SELECT category, SUM(amount) as total
             FROM expenses
             WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
             GROUP BY category`,
            [userId, startOfWeek, endOfWeek]
        );

        const categoryBreakdown = result.rows.map(row => ({
            category: row.category,
            total: Number(row.total)
        }));

        const totalSpent = categoryBreakdown.reduce((sum, row) => sum + row.total, 0);

        res.status(200).json({ weekStart: startOfWeek, weekEnd: endOfWeek, categoryBreakdown, totalSpent });
    } catch (error) {
        console.error('Error fetching weekly expenses:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
