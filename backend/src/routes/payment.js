const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get payment methods based on country
router.get('/payment-methods', async (req, res) => {
  try {
    const { country } = req.query;
    
    let query = 'SELECT * FROM payment_methods WHERE is_active = TRUE';
    const params = [];
    
    if (country === 'مصر') {
      query += ' AND (country = $1 OR country IS NULL)';
      params.push(country);
    } else {
      query += ' AND country IS NULL';
    }
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment methods'
    });
  }
});

// Get withdrawal methods based on country
router.get('/withdrawal-methods', async (req, res) => {
  try {
    const { country } = req.query;
    
    let query = 'SELECT * FROM withdrawal_methods WHERE is_active = TRUE';
    const params = [];
    
    if (country === 'مصر') {
      query += ' AND (country = $1 OR country IS NULL)';
      params.push(country);
    } else {
      query += ' AND country IS NULL';
    }
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching withdrawal methods:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching withdrawal methods'
    });
  }
});

// Save user payment preference (Protected route)
router.post('/user-payment-preference', authenticateToken, async (req, res) => {
  try {
    const { payment_method_id, withdrawal_method_id, account_details, is_default } = req.body;
    const user_id = req.user.id; // Get user_id from authenticated user
    
    const result = await pool.query(
      `INSERT INTO user_payment_preferences 
       (user_id, payment_method_id, withdrawal_method_id, account_details, is_default) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [user_id, payment_method_id, withdrawal_method_id, account_details, is_default]
    );
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving payment preference:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving payment preference'
    });
  }
});

// Get user payment preferences (Protected route)
router.get('/user-payment-preference/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Verify that user can only access their own preferences
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه البيانات'
      });
    }
    
    const result = await pool.query(
      `SELECT upp.*, pm.name as payment_method_name, wm.name as withdrawal_method_name
       FROM user_payment_preferences upp
       LEFT JOIN payment_methods pm ON upp.payment_method_id = pm.id
       LEFT JOIN withdrawal_methods wm ON upp.withdrawal_method_id = wm.id
       WHERE upp.user_id = $1`,
      [userId]
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching user payment preference:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user payment preference'
    });
  }
});

module.exports = router;
