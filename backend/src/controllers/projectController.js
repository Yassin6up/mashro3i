const pool = require('../config/database');

// Create Project (Seller only)
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      project_type,
      price,
      technologies,
      demo_url,
      video_links,
      video_source,
      is_profitable,
      revenue_type,
      monthly_revenue
    } = req.body;

    // Video links are now optional - tutorial videos can be sent after purchase

    // Parse technologies if it's a string
    let techArray = technologies;
    if (typeof technologies === 'string') {
      techArray = technologies.split(',').map(t => t.trim());
    }

    // Parse video links if it's a string
    let videoLinksArray = video_links;
    if (typeof video_links === 'string') {
      videoLinksArray = video_links.split(',').map(v => v.trim());
    }

    // Handle multiple file uploads
    const images = req.files?.images?.map(file => `/uploads/${file.filename}`) || [];
    const files = req.files?.files?.map(file => `/uploads/${file.filename}`) || [];

    const result = await pool.query(
      `INSERT INTO projects (seller_id, title, description, category, project_type, price, images, files, technologies, demo_url, video_links, video_source, is_profitable, revenue_type, monthly_revenue)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [req.user.id, title, description, category, project_type, price, images, files, techArray, demo_url, videoLinksArray, video_source, is_profitable, revenue_type, monthly_revenue]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const { category, min_price, max_price, is_profitable, search } = req.query;
    
    let query = `
      SELECT p.*, u.full_name as seller_name, u.profile_picture as seller_picture
      FROM projects p
      JOIN users u ON p.seller_id = u.id
      WHERE p.status = 'active'
    `;
    const params = [];
    let paramIndex = 1;

    if (category) {
      query += ` AND p.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (min_price) {
      query += ` AND p.price >= $${paramIndex}`;
      params.push(min_price);
      paramIndex++;
    }

    if (max_price) {
      query += ` AND p.price <= $${paramIndex}`;
      params.push(max_price);
      paramIndex++;
    }

    if (is_profitable === 'true') {
      query += ` AND p.is_profitable = true`;
    }

    if (search) {
      query += ` AND (p.title ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.*, u.full_name as seller_name, u.profile_picture as seller_picture, u.self_description as seller_description
       FROM projects p
       JOIN users u ON p.seller_id = u.id
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Increment views count
    await pool.query('UPDATE projects SET views_count = views_count + 1 WHERE id = $1', [id]);

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Seller's Projects
const getSellerProjects = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE seller_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get seller projects error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      price,
      technologies,
      demo_url,
      is_profitable,
      revenue_type,
      monthly_revenue,
      status
    } = req.body;

    // Verify ownership
    const project = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (project.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    if (project.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const techArray = typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()) : technologies;

    const result = await pool.query(
      `UPDATE projects SET 
        title = $1, description = $2, category = $3, price = $4, technologies = $5, 
        demo_url = $6, is_profitable = $7, revenue_type = $8, monthly_revenue = $9, status = $10, updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
      [title, description, category, price, techArray, demo_url, is_profitable, revenue_type, monthly_revenue, status, id]
    );

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const project = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (project.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    if (project.rows[0].seller_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await pool.query('DELETE FROM projects WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getSellerProjects,
  updateProject,
  deleteProject
};
