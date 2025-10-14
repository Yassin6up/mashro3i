const pool = require('../config/database');

// Get User Notifications
const getUserNotifications = async (req, res) => {
  try {
    const { is_read } = req.query;
    
    let query = 'SELECT * FROM notifications WHERE user_id = $1';
    const params = [req.user.id];

    if (is_read !== undefined) {
      query += ' AND is_read = $2';
      params.push(is_read === 'true');
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark All Notifications as Read
const markAllAsRead = async (req, res) => {
  try {
    await pool.query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1',
      [req.user.id]
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Unread Count
const getUnreadCount = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false',
      [req.user.id]
    );

    res.json({
      success: true,
      data: { count: parseInt(result.rows[0].count) }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
};
