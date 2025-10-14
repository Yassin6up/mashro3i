const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} = require('../controllers/notificationController');

// All routes are protected
router.get('/', authenticateToken, getUserNotifications);
router.get('/unread-count', authenticateToken, getUnreadCount);
router.patch('/:id/read', authenticateToken, markAsRead);
router.patch('/mark-all-read', authenticateToken, markAllAsRead);
router.delete('/:id', authenticateToken, deleteNotification);

module.exports = router;
