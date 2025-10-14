const express = require('express');
const router = express.Router();
const { authenticateToken, isBuyer } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const {
  createTransaction,
  releaseEscrow,
  getUserTransactions,
  getTransactionById,
  requestRefund,
  getPlatformEarnings
} = require('../controllers/transactionController');

// Protected routes
router.post('/', authenticateToken, isBuyer, createTransaction);
router.post('/:transaction_id/release', authenticateToken, releaseEscrow);
router.post('/:transaction_id/refund', authenticateToken, isBuyer, requestRefund);
router.get('/', authenticateToken, getUserTransactions);
router.get('/platform/earnings', authenticateToken, isAdmin, getPlatformEarnings);
router.get('/:id', authenticateToken, getTransactionById);

module.exports = router;
