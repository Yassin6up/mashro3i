const express = require('express');
const router = express.Router();
const { authenticateToken, isBuyer } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const upload = require('../utils/fileUpload');
const {
  createTransaction,
  uploadProjectFiles,
  reviewTransaction,
  getMyTransactions,
  getTransactionById
} = require('../controllers/transactionsController');

router.post('/', authenticateToken, createTransaction);

router.post('/:transaction_id/upload-files', authenticateToken, upload.array('files', 10), uploadProjectFiles);

router.post('/:transaction_id/review', authenticateToken, reviewTransaction);

router.get('/my-transactions', authenticateToken, getMyTransactions);

router.get('/:id', authenticateToken, getTransactionById);

module.exports = router;
