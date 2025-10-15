const pool = require('../config/database');

// Send Message (Text, Image, or Voice)
const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message, transaction_id } = req.body;
    const sender_id = req.user.id;
    
    let message_type = 'text';
    let file_path = null;
    let file_size = null;
    let file_type = null;
    let file_name = null;
    let message_text = message;

    // Check if file was uploaded
    if (req.file) {
      file_path = `/uploads/chat/${req.file.filename}`;
      file_size = req.file.size;
      file_type = req.file.mimetype;
      file_name = req.file.originalname;
      
      // Determine message type based on file mimetype
      if (req.file.mimetype.startsWith('image/')) {
        message_type = 'image';
        message_text = message || 'صورة';
      } else if (req.file.mimetype.startsWith('audio/') || req.file.filename.endsWith('.webm')) {
        message_type = 'voice';
        message_text = message || 'رسالة صوتية';
      } else {
        message_type = 'file';
        message_text = message || 'ملف';
      }
    }

    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, transaction_id, message, message_type, file_path, file_size, file_type, file_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [sender_id, receiver_id, transaction_id, message_text, message_type, file_path, file_size, file_type, file_name]
    );

    // Create notification for receiver
    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        receiver_id,
        'new_message',
        'رسالة جديدة',
        message_type === 'image' ? 'أرسل لك صورة' : message_type === 'voice' ? 'أرسل لك رسالة صوتية' : 'لديك رسالة جديدة',
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
    const user_id = req.user.id;
    
    const result = await pool.query(
      `SELECT 
        CASE 
          WHEN m.sender_id = $1 THEN m.receiver_id 
          ELSE m.sender_id 
        END as user_id,
        u.full_name as user_name,
        u.profile_picture as user_picture,
        m.message as last_message,
        m.message_type,
        m.created_at as last_message_time,
        COUNT(CASE WHEN m.receiver_id = $1 AND m.is_read = false THEN 1 END) as unread_count
      FROM messages m
      JOIN users u ON u.id = CASE 
        WHEN m.sender_id = $1 THEN m.receiver_id 
        ELSE m.sender_id 
      END
      WHERE m.sender_id = $1 OR m.receiver_id = $1
      GROUP BY 
        CASE WHEN m.sender_id = $1 THEN m.receiver_id ELSE m.sender_id END,
        u.full_name,
        u.profile_picture,
        m.message,
        m.message_type,
        m.created_at
      ORDER BY m.created_at DESC`,
      [user_id]
    );

    // Get unique conversations
    const conversations = [];
    const seenUserIds = new Set();
    
    for (const row of result.rows) {
      if (!seenUserIds.has(row.user_id)) {
        seenUserIds.add(row.user_id);
        conversations.push(row);
      }
    }

    res.json({
      success: true,
      data: conversations
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
