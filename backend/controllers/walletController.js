const pool = require('../db');

const getWallet = async (req, res) => {
    const userId = req.user.id 

    try {
        const wallet = await pool.query('SELECT * FROM wallets WHERE user_id = $1', [userId]);
        if (wallet.rows.length === 0) {
            return res.status(400).json({message: 'Wallet not found '});
        }

        res.status(200).json(wallet.rows[0]);

    } catch (error) {
        console.error('Error fetching wallet: ', error);
        res.status(500).json({message: 'Server error'})   
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
