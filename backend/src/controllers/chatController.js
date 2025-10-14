const pool = require('../config/database');

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message, transaction_id } = req.body;
    const sender_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, transaction_id, message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [sender_id, receiver_id, transaction_id, message]
    );

    // Create notification for receiver
    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        receiver_id,
        'new_message',
        'رسالة جديدة',
        'لديك رسالة جديدة',
        '/chat'
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Conversations
const getConversations = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (conversation_user_id)
         conversation_user_id,
         u.full_name,
         u.profile_picture,
         m.message as last_message,
         m.created_at as last_message_time,
         m.is_read
       FROM (
         SELECT 
           CASE 
             WHEN sender_id = $1 THEN receiver_id 
             ELSE sender_id 
           END as conversation_user_id,
           *
         FROM messages
         WHERE sender_id = $1 OR receiver_id = $1
       ) m
       JOIN users u ON u.id = m.conversation_user_id
       ORDER BY conversation_user_id, m.created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Messages with User
const getMessages = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT m.*, 
         sender.full_name as sender_name, sender.profile_picture as sender_picture
       FROM messages m
       JOIN users sender ON m.sender_id = sender.id
       WHERE (m.sender_id = $1 AND m.receiver_id = $2) 
          OR (m.sender_id = $2 AND m.receiver_id = $1)
       ORDER BY m.created_at ASC`,
      [req.user.id, user_id]
    );

    // Mark messages as read
    await pool.query(
      `UPDATE messages SET is_read = true 
       WHERE sender_id = $1 AND receiver_id = $2 AND is_read = false`,
      [user_id, req.user.id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Unread Messages Count
const getUnreadCount = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = $1 AND is_read = false',
      [req.user.id]
    );

    res.json({
      success: true,
      data: { count: parseInt(result.rows[0].count) }
    });
  } catch (error) {
    console.error('Get unread messages count error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversations,
  getMessages,
  getUnreadCount
};
