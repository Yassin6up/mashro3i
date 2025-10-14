const pool = require('../config/database');

// Admin authorization middleware
const isAdmin = async (req, res, next) => {
  try {
    // Verify admin status from database (not from JWT alone)
    const result = await pool.query(
      'SELECT is_admin FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    if (result.rows[0].is_admin === true) {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Authorization check failed' 
    });
  }
};

module.exports = { isAdmin };
