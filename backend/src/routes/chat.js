const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const chatUpload = require('../middleware/chatUpload');
const {
  sendMessage,
  getConversations,
  getMessages,
  getUnreadCount
} = require('../controllers/chatController');

// All routes are protected
router.post('/send', authenticateToken, chatUpload, sendMessage);
router.get('/conversations', authenticateToken, getConversations);
router.get('/unread-count', authenticateToken, getUnreadCount);
router.get('/messages/:user_id', authenticateToken, getMessages);

module.exports = router;
