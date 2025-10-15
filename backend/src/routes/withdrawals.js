const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getSellerBalance,
  requestWithdrawal,
  getMyWithdrawals,
  getWithdrawalMethods
} = require('../controllers/withdrawalsController');

router.get('/balance', authenticateToken, getSellerBalance);

router.post('/request', authenticateToken, requestWithdrawal);

router.get('/my-withdrawals', authenticateToken, getMyWithdrawals);

router.get('/methods', authenticateToken, getWithdrawalMethods);

module.exports = router;
