const pool = require('../db');

const getWallet = async (req, res) => {
    const userId = req.user.id;
    try {
        // Get total income
        const incomeRes = await pool.query('SELECT COALESCE(SUM(amount),0) AS total_income FROM incomes WHERE user_id = $1', [userId]);
        const totalIncome = parseFloat(incomeRes.rows[0].total_income);

        // Get total expenses
        const expenseRes = await pool.query('SELECT COALESCE(SUM(amount),0) AS total_expenses FROM expenses WHERE user_id = $1', [userId]);
        const totalExpenses = parseFloat(expenseRes.rows[0].total_expenses);

        // Calculate total balance
        const totalBalance = totalIncome - totalExpenses;

        res.status(200).json({
            totalBalance,
            totalIncome,
            totalExpenses
        });
    } catch (error) {
        console.error('Error calculating wallet balance: ', error);
        res.status(500).json({message: 'Server error'});
    }
};


const topUpWallet = async (req, res) => {
    const userId = req.user.id;
    const { amount } =  req.body;

    if(!amount || amount <= 0) {
        return res.status(400).json({message: "Invalid amount"});
    }

    try {
        const walletRes = await pool.query('SELECT * FROM wallets WHERE user_id = $1', [userId]);
        if(walletRes.rows.length === 0){
            return res.status(400).json({message: "Wallet not Found"});
        }

        const currentWallet = parseFloat(walletRes.rows[0].balance);
        const newBalance = currentWallet + parseFloat(amount);
        await pool.query('UPDATE wallets SET balance = $1 WHERE user_id = $2', [newBalance, userId]);

        res.status(200).json({message: "Wallet topped up successfully!"})
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    }
};

module.exports = { getWallet, topUpWallet };
