const pool = require('../config/database');
require('dotenv').config();

const PLATFORM_FEE_PERCENTAGE = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 15;

// Create Transaction with Escrow
const createTransaction = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const { project_id, payment_method, installments } = req.body;
    const buyer_id = req.user.id;

    // Get project details
    const projectResult = await client.query(
      'SELECT * FROM projects WHERE id = $1 AND status = $2',
      [project_id, 'active']
    );

    if (projectResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Project not found or not available' });
    }

    const project = projectResult.rows[0];
    const seller_id = project.seller_id;

    // Calculate fees
    const total_amount = parseFloat(project.price);
    const platform_fee = (total_amount * PLATFORM_FEE_PERCENTAGE) / 100;
    const seller_amount = total_amount - platform_fee;

    // Create transaction
    const transactionResult = await client.query(
      `INSERT INTO transactions (buyer_id, seller_id, project_id, total_amount, platform_fee, seller_amount, payment_method, status, review_period_days)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [buyer_id, seller_id, project_id, total_amount, platform_fee, seller_amount, payment_method, 'escrow_held', 7]
    );

    const transaction = transactionResult.rows[0];

    // Create escrow record
    await client.query(
      'INSERT INTO escrow (transaction_id, amount, status) VALUES ($1, $2, $3)',
      [transaction.id, total_amount, 'held']
    );

    // Set escrow release date (7 days from now)
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 7);
    
    await client.query(
      'UPDATE transactions SET escrow_release_date = $1 WHERE id = $2',
      [releaseDate, transaction.id]
    );

    // Handle installments if requested
    if (installments && installments.length > 0) {
      for (const installment of installments) {
        await client.query(
          'INSERT INTO installments (transaction_id, amount, due_date, status) VALUES ($1, $2, $3, $4)',
          [transaction.id, installment.amount, installment.due_date, 'pending']
        );
      }
    }

    // Mark project as sold
    await client.query(
      'UPDATE projects SET status = $1 WHERE id = $2',
      ['sold', project_id]
    );

    // Create notifications
    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        seller_id,
        'new_purchase',
        'مبيعات جديدة!',
        `لديك طلب شراء جديد لمشروع "${project.title}"`,
        `/transactions/${transaction.id}`
      ]
    );

    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        buyer_id,
        'purchase_confirmation',
        'تم تأكيد عملية الشراء',
        `تم تأكيد شرائك لمشروع "${project.title}". الأموال محجوزة في Escrow بشكل آمن.`,
        `/transactions/${transaction.id}`
      ]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create transaction error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

// Release Escrow (Buyer only, manual or after review period)
const releaseEscrow = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const { transaction_id } = req.params;

    // Get transaction details
    const transactionResult = await client.query(
      'SELECT * FROM transactions WHERE id = $1',
      [transaction_id]
    );

    if (transactionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const transaction = transactionResult.rows[0];

    // Only the buyer can release escrow
    if (transaction.buyer_id !== req.user.id) {
      await client.query('ROLLBACK');
      return res.status(403).json({ success: false, message: 'Unauthorized - only buyer can release funds' });
    }

    // Check if already released or completed
    if (transaction.status === 'completed') {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Transaction already completed' });
    }

    // Update escrow status
    await client.query(
      'UPDATE escrow SET status = $1, released_at = CURRENT_TIMESTAMP WHERE transaction_id = $2',
      ['released', transaction_id]
    );

    // Update transaction status
    await client.query(
      'UPDATE transactions SET status = $1 WHERE id = $2',
      ['completed', transaction_id]
    );

    // Record platform earnings
    await client.query(
      'INSERT INTO platform_earnings (transaction_id, amount) VALUES ($1, $2)',
      [transaction_id, transaction.platform_fee]
    );

    // Create notifications
    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        transaction.seller_id,
        'payment_received',
        'تم استلام الدفعة!',
        `تم تحويل مبلغ ${transaction.seller_amount} إلى حسابك بنجاح`,
        `/transactions/${transaction_id}`
      ]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Escrow released successfully',
      data: {
        seller_received: transaction.seller_amount,
        platform_fee: transaction.platform_fee
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Release escrow error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

// Get All Transactions (for user)
const getUserTransactions = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = `
      SELECT t.*, 
             p.title as project_title, p.images as project_images,
             buyer.full_name as buyer_name, buyer.profile_picture as buyer_picture,
             seller.full_name as seller_name, seller.profile_picture as seller_picture
      FROM transactions t
      JOIN projects p ON t.project_id = p.id
      JOIN users buyer ON t.buyer_id = buyer.id
      JOIN users seller ON t.seller_id = seller.id
      WHERE (t.buyer_id = $1 OR t.seller_id = $1)
    `;
    const params = [req.user.id];

    if (status) {
      query += ' AND t.status = $2';
      params.push(status);
    }

    query += ' ORDER BY t.created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT t.*, 
             p.title as project_title, p.description as project_description, p.images as project_images,
             buyer.full_name as buyer_name, buyer.email as buyer_email, buyer.profile_picture as buyer_picture,
             seller.full_name as seller_name, seller.email as seller_email, seller.profile_picture as seller_picture,
             e.status as escrow_status, e.released_at as escrow_released_at
      FROM transactions t
      JOIN projects p ON t.project_id = p.id
      JOIN users buyer ON t.buyer_id = buyer.id
      JOIN users seller ON t.seller_id = seller.id
      LEFT JOIN escrow e ON t.id = e.transaction_id
      WHERE t.id = $1 AND (t.buyer_id = $2 OR t.seller_id = $2)`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Get installments if any
    const installmentsResult = await pool.query(
      'SELECT * FROM installments WHERE transaction_id = $1 ORDER BY due_date',
      [id]
    );

    const data = {
      ...result.rows[0],
      installments: installmentsResult.rows
    };

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Request Refund
const requestRefund = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const { transaction_id } = req.params;
    const { reason } = req.body;

    const transactionResult = await client.query(
      'SELECT * FROM transactions WHERE id = $1 AND buyer_id = $2',
      [transaction_id, req.user.id]
    );

    if (transactionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const transaction = transactionResult.rows[0];

    // Check if within review period
    const now = new Date();
    const releaseDate = new Date(transaction.escrow_release_date);
    
    if (now > releaseDate) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Review period has ended' });
    }

    // Update transaction status
    await client.query(
      'UPDATE transactions SET status = $1 WHERE id = $2',
      ['disputed', transaction_id]
    );

    // Notify seller
    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        transaction.seller_id,
        'dispute',
        'طلب استرداد',
        `المشتري طلب استرداد المبلغ. السبب: ${reason}`,
        `/transactions/${transaction_id}`
      ]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Refund request submitted successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Request refund error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

// Get Platform Earnings (Admin)
const getPlatformEarnings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT SUM(amount) as total_earnings, COUNT(*) as total_transactions
       FROM platform_earnings`
    );

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get platform earnings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTransaction,
  releaseEscrow,
  getUserTransactions,
  getTransactionById,
  requestRefund,
  getPlatformEarnings
};
