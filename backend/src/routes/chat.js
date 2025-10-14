const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  sendMessage,
  getConversations,
  getMessages,
  getUnreadCount
} = require('../controllers/chatController');

// All routes are protected
router.post('/send', authenticateToken, sendMessage);
router.get('/conversations', authenticateToken, getConversations);
router.get('/unread-count', authenticateToken, getUnreadCount);
router.get('/:user_id', authenticateToken, getMessages);

module.exports = router;
