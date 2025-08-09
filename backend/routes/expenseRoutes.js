const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const verifyToken = require('../middlewares/verifyToken');
router.post('/', verifyToken, expenseController.addExpense);
router.get('/', verifyToken, expenseController.getExpense);
router.delete('/:id', verifyToken, expenseController.deleteExpense);
router.get('/summary/monthly', verifyToken, expenseController.getMonthlyExpenses);
router.get('/summary/weekly', verifyToken, expenseController.getWeeklyExpenses);

module.exports = router;