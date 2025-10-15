const pool = require('../config/database');

const createOffer = async (req, res) => {
  try {
    const { project_id, amount, message } = req.body;
    const buyer_id = req.user.id;

    const projectResult = await pool.query(
      'SELECT seller_id FROM projects WHERE id = $1',
      [project_id]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const seller_id = projectResult.rows[0].seller_id;

    const result = await pool.query(
      `INSERT INTO offers (project_id, buyer_id, seller_id, amount, message, status) 
       VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING *`,
      [project_id, buyer_id, seller_id, amount, message]
    );

    const buyerResult = await pool.query(
      'SELECT full_name FROM users WHERE id = $1',
      [buyer_id]
    );
    const buyer_name = buyerResult.rows[0]?.full_name || 'مشتري';

    const projectTitleResult = await pool.query(
      'SELECT title FROM projects WHERE id = $1',
      [project_id]
    );
    const project_title = projectTitleResult.rows[0]?.title || 'مشروع';

    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'new_offer', 'عرض جديد', $2, $3)`,
      [
        seller_id,
        `تم إرسال عرض جديد لك من ${buyer_name} بقيمة ${amount}$ بخصوص مشروع "${project_title}".`,
        `/offers/${result.rows[0].id}`
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Offer sent successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create offer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const seller_id = req.user.id;

    const offerResult = await pool.query(
      'SELECT * FROM offers WHERE id = $1 AND seller_id = $2',
      [id, seller_id]
    );

    if (offerResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    const offer = offerResult.rows[0];

    await pool.query(
      `UPDATE offers SET status = 'accepted', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );

    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'offer_accepted', 'تمت الموافقة على عرضك', $2, $3)`,
      [
        offer.buyer_id,
        `تمت الموافقة على عرضك. يمكنك الآن إتمام عملية الدفع.`,
        `/payment/${id}`
      ]
    );

    res.json({
      success: true,
      message: 'Offer accepted successfully',
      data: { ...offer, status: 'accepted' }
    });
  } catch (error) {
    console.error('Accept offer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const counterOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_amount, message } = req.body;
    const seller_id = req.user.id;

    const offerResult = await pool.query(
      'SELECT * FROM offers WHERE id = $1 AND seller_id = $2',
      [id, seller_id]
    );

    if (offerResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    const original_offer = offerResult.rows[0];

    await pool.query(
      `UPDATE offers SET status = 'countered', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );

    const counterResult = await pool.query(
      `INSERT INTO offers (project_id, buyer_id, seller_id, amount, message, status, parent_offer_id) 
       VALUES ($1, $2, $3, $4, $5, 'pending', $6) RETURNING *`,
      [original_offer.project_id, original_offer.buyer_id, seller_id, new_amount, message, id]
    );

    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'counter_offer', 'عرض مضاد من البائع', $2, $3)`,
      [
        original_offer.buyer_id,
        `البائع يطلب سعراً أعلى: ${new_amount}$. ${message || ''}`,
        `/offers/${counterResult.rows[0].id}`
      ]
    );

    res.json({
      success: true,
      message: 'Counter offer sent successfully',
      data: counterResult.rows[0]
    });
  } catch (error) {
    console.error('Counter offer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const seller_id = req.user.id;

    const offerResult = await pool.query(
      'SELECT * FROM offers WHERE id = $1 AND seller_id = $2',
      [id, seller_id]
    );

    if (offerResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    const offer = offerResult.rows[0];

    await pool.query(
      `UPDATE offers SET status = 'rejected', updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );

    await pool.query(
      `INSERT INTO notifications (user_id, type, title, message, link) 
       VALUES ($1, 'offer_rejected', 'تم رفض عرضك', 'عذراً، تم رفض عرضك من قبل البائع.', NULL)`,
      [offer.buyer_id]
    );

    res.json({
      success: true,
      message: 'Offer rejected successfully'
    });
  } catch (error) {
    console.error('Reject offer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOffers = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user_type = req.user.user_type;

    let query;
    if (user_type === 'buyer') {
      query = `
        SELECT o.*, p.title as project_title, p.price as original_price,
               u.full_name as seller_name
        FROM offers o
        JOIN projects p ON o.project_id = p.id
        JOIN users u ON o.seller_id = u.id
        WHERE o.buyer_id = $1
        ORDER BY o.created_at DESC
      `;
    } else {
      query = `
        SELECT o.*, p.title as project_title, p.price as original_price,
               u.full_name as buyer_name
        FROM offers o
        JOIN projects p ON o.project_id = p.id
        JOIN users u ON o.buyer_id = u.id
        WHERE o.seller_id = $1
        ORDER BY o.created_at DESC
      `;
    }

    const result = await pool.query(query, [user_id]);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get my offers error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT o.*, p.title as project_title, p.price as original_price,
              buyer.full_name as buyer_name, seller.full_name as seller_name
       FROM offers o
       JOIN projects p ON o.project_id = p.id
       JOIN users buyer ON o.buyer_id = buyer.id
       JOIN users seller ON o.seller_id = seller.id
       WHERE o.id = $1 AND (o.buyer_id = $2 OR o.seller_id = $2)`,
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get offer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOffer,
  acceptOffer,
  counterOffer,
  rejectOffer,
  getMyOffers,
  getOfferById
};
