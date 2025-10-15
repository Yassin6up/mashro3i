const pool = require('../config/database');

const getSellerBalance = async (req, res) => {
  try {
    const seller_id = req.user.id;

    const result = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as available_balance 
       FROM seller_earnings 
       WHERE seller_id = $1 AND status = 'available'`,
      [seller_id]
    );

    const earningsResult = await pool.query(
      `SELECT * FROM seller_earnings 
       WHERE seller_id = $1 
       ORDER BY created_at DESC`,
      [seller_id]
    );

    res.json({
      success: true,
      data: {
        available_balance: parseFloat(result.rows[0].available_balance),
        earnings: earningsResult.rows
      }
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const requestWithdrawal = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { amount, withdrawal_method_id, account_details } = req.body;
    const seller_id = req.user.id;

    await client.query('BEGIN');

    const balanceResult = await client.query(
      `SELECT COALESCE(SUM(amount), 0) as available_balance 
       FROM seller_earnings 
       WHERE seller_id = $1 AND status = 'available'`,
      [seller_id]
    );

    const available_balance = parseFloat(balanceResult.rows[0].available_balance);

    if (available_balance < amount) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient balance. Available: $${available_balance}` 
      });
    }

    const withdrawalResult = await client.query(
      `INSERT INTO withdrawals (seller_id, amount, withdrawal_method_id, account_details, status) 
       VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
      [seller_id, amount, withdrawal_method_id, account_details]
    );

    const earningsToUpdate = await client.query(
      `SELECT id, amount FROM seller_earnings 
       WHERE seller_id = $1 AND status = 'available' 
       ORDER BY created_at ASC`,
      [seller_id]
    );

    let remaining = parseFloat(amount);
    for (const earning of earningsToUpdate.rows) {
      if (remaining <= 0) break;

      const earningAmount = parseFloat(earning.amount);
      
      if (earningAmount <= remaining) {
        await client.query(
          `UPDATE seller_earnings SET status = 'withdrawn', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
          [earning.id]
        );
        remaining -= earningAmount;
      } else {
        await client.query(
          `UPDATE seller_earnings SET amount = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
          [earningAmount - remaining, earning.id]
        );
        
        await client.query(
          `INSERT INTO seller_earnings (seller_id, transaction_id, amount, status, created_at) 
           SELECT seller_id, transaction_id, $1, 'withdrawn', CURRENT_TIMESTAMP 
           FROM seller_earnings WHERE id = $2`,
          [remaining, earning.id]
        );
        
        remaining = 0;
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      data: withdrawalResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Request withdrawal error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

const getMyWithdrawals = async (req, res) => {
  try {
    const seller_id = req.user.id;

    const result = await pool.query(
      `SELECT w.*, wm.name as withdrawal_method_name 
       FROM withdrawals w
       LEFT JOIN withdrawal_methods wm ON w.withdrawal_method_id = wm.id
       WHERE w.seller_id = $1
       ORDER BY w.created_at DESC`,
      [seller_id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get withdrawals error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWithdrawalMethods = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM withdrawal_methods WHERE is_active = TRUE ORDER BY name'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get withdrawal methods error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSellerBalance,
  requestWithdrawal,
  getMyWithdrawals,
  getWithdrawalMethods
};
