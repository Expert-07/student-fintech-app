const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const verifyToken = require('../middlewares/verifyToken');

// Add a new income (POST /api/incomes)
router.post('/', verifyToken, incomeController.addIncome);
// Get total monthly income (GET /api/incomes/monthly)
router.get('/monthly', verifyToken, incomeController.getMonthlyIncome);
// Optionally, add more routes for income (get, delete, etc.)

module.exports = router;
