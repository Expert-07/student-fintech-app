const express = require('express');
const router = express.Router();
const { getWallet } = require('../controllers/walletController');
const { topUpWallet } = require('../controllers/walletController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getWallet);
router.post('/topup', verifyToken, topUpWallet);

module.exports = router;
