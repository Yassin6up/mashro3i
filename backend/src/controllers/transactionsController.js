const pool = require('../config/database');

const createTransaction = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { offer_id, payment_method } = req.body;
    const buyer_id = req.user.id;

    await client.query('BEGIN');

    const offerResult = await client.query(
      'SELECT * FROM offers WHERE id = $1 AND buyer_id = $2 AND status = $3',
      [offer_id, buyer_id, 'accepted']
    );

    if (offerResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Offer not found or not accepted' });
    }

    const offer = offerResult.rows[0];
    const total_amount = parseFloat(offer.amount);
    const platform_fee_percentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || 15);
    const platform_fee = (total_amount * platform_fee_percentage) / 100;
    const seller_amount = total_amount - platform_fee;

    const escrow_release_date = new Date();
    escrow_release_date.setDate(escrow_release_date.getDate() + 7);

    const transactionResult = await client.query(
      `INSERT INTO transactions (buyer_id, seller_id, project_id, total_amount, platform_fee, seller_amount, payment_method, status, escrow_release_date, review_period_days) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'escrow_held', $8, 7) RETURNING *`,
      [buyer_id, offer.seller_id, offer.project_id, total_amount, platform_fee, seller_amount, payment_method, escrow_release_date]
    );

    const transaction = transactionResult.rows[0];

    await client.query(
      `INSERT INTO escrow (transaction_id, amount, status) VALUES ($1, $2, 'held')`,
      [transaction.id, total_amount]
    );

    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'payment_received', 'تم استلام الدفع', $2, $3)`,
      [
        offer.seller_id,
        `تم الدفع من قبل المشتري. يرجى رفع ملفات المشروع والفيديوهات التعليمية.`,
        `/transactions/${transaction.id}/deliver`
      ]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
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

const uploadProjectFiles = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { transaction_id } = req.params;
    const { description } = req.body;
    const seller_id = req.user.id;

    await client.query('BEGIN');

    const transactionResult = await client.query(
      'SELECT * FROM transactions WHERE id = $1 AND seller_id = $2',
      [transaction_id, seller_id]
    );

    if (transactionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const transaction = transactionResult.rows[0];

    if (!req.files || req.files.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadedFiles = [];
    for (const file of req.files) {
      const fileResult = await client.query(
        `INSERT INTO project_files (transaction_id, file_name, file_path, file_type, file_size, description, uploaded_by) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [transaction_id, file.originalname, `/uploads/${file.filename}`, file.mimetype, file.size, description, seller_id]
      );
      uploadedFiles.push(fileResult.rows[0]);
    }

    await client.query(
      `UPDATE transactions SET status = 'pending', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [transaction_id]
    );

    await client.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'project_delivered', 'تم تسليم المشروع', $2, $3)`,
      [
        transaction.buyer_id,
        `تم تسليم المشروع من قبل البائع. يرجى المراجعة خلال 7 أيام.`,
        `/transactions/${transaction_id}/review`
      ]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: uploadedFiles
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Upload files error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

const reviewTransaction = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { transaction_id } = req.params;
    const { status, feedback } = req.body;
    const buyer_id = req.user.id;

    await client.query('BEGIN');

    const transactionResult = await client.query(
      'SELECT * FROM transactions WHERE id = $1 AND buyer_id = $2',
      [transaction_id, buyer_id]
    );

    if (transactionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const transaction = transactionResult.rows[0];

    await client.query(
      `INSERT INTO transaction_reviews (transaction_id, buyer_id, status, feedback) 
       VALUES ($1, $2, $3, $4)`,
      [transaction_id, buyer_id, status, feedback]
    );

    if (status === 'approved') {
      await client.query(
        `UPDATE transactions SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
        [transaction_id]
      );

      await client.query(
        `UPDATE escrow SET status = 'released', released_at = CURRENT_TIMESTAMP WHERE transaction_id = $1`,
        [transaction_id]
      );

      const available_at = new Date();
      await client.query(
        `INSERT INTO seller_earnings (seller_id, transaction_id, amount, status, available_at) 
         VALUES ($1, $2, $3, 'available', $4)`,
        [transaction.seller_id, transaction_id, transaction.seller_amount, available_at]
      );

      await client.query(
        `INSERT INTO platform_earnings (transaction_id, amount) VALUES ($1, $2)`,
        [transaction_id, transaction.platform_fee]
      );

      await client.query(
        `INSERT INTO notifications (user_id, type, title, message, link) 
         VALUES ($1, 'earnings_released', 'تم الإفراج عن أرباحك', $2, $3)`,
        [
          transaction.seller_id,
          `تم الإفراج عن أرباحك من عملية البيع رقم ${transaction_id}.`,
          `/earnings`
        ]
      );
    } else if (status === 'revision_requested') {
      await client.query(
        `INSERT INTO notifications (user_id, type, title, message, link) 
         VALUES ($1, 'revision_requested', 'طلب تعديل', $2, $3)`,
        [
          transaction.seller_id,
          `المشتري طلب تعديلات: ${feedback}`,
          `/transactions/${transaction_id}`
        ]
      );
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: status === 'approved' ? 'Transaction completed successfully' : 'Revision request sent',
      data: { transaction_id, status }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Review transaction error:', error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    client.release();
  }
};

const getMyTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user_type = req.user.user_type;

    let query;
    if (user_type === 'buyer') {
      query = `
        SELECT t.*, p.title as project_title, u.full_name as seller_name
        FROM transactions t
        JOIN projects p ON t.project_id = p.id
        JOIN users u ON t.seller_id = u.id
        WHERE t.buyer_id = $1
        ORDER BY t.created_at DESC
      `;
    } else {
      query = `
        SELECT t.*, p.title as project_title, u.full_name as buyer_name
        FROM transactions t
        JOIN projects p ON t.project_id = p.id
        JOIN users u ON t.buyer_id = u.id
        WHERE t.seller_id = $1
        ORDER BY t.created_at DESC
      `;
    }

    const result = await pool.query(query, [user_id]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT t.*, p.title as project_title, p.description as project_description,
              buyer.full_name as buyer_name, buyer.email as buyer_email,
              seller.full_name as seller_name, seller.email as seller_email
       FROM transactions t
       JOIN projects p ON t.project_id = p.id
       JOIN users buyer ON t.buyer_id = buyer.id
       JOIN users seller ON t.seller_id = seller.id
       WHERE t.id = $1 AND (t.buyer_id = $2 OR t.seller_id = $2)`,
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    const filesResult = await pool.query(
      'SELECT * FROM project_files WHERE transaction_id = $1',
      [id]
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        files: filesResult.rows
      }
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTransaction,
  uploadProjectFiles,
  reviewTransaction,
  getMyTransactions,
  getTransactionById
};
