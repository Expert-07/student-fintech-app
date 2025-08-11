const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, budgetController.getBudget);
router.post('/', verifyToken, budgetController.setBudget);
router.get('/summary', verifyToken, budgetController.getBudgetSummary); 
module.exports = router;