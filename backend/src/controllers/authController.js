const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
require('dotenv').config();

// Register Seller
const registerSeller = async (req, res) => {
  try {
    const { full_name, email, password, phone, country, self_description, programming_skills } = req.body;
    
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file upload
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    // Parse programming skills if it's a string
    let skillsArray = programming_skills;
    if (typeof programming_skills === 'string') {
      skillsArray = [programming_skills];
    }

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, phone, country, user_type, profile_picture, self_description, programming_skills) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [full_name, email, hashedPassword, phone, country, 'seller', profilePicture, self_description, skillsArray]
    );

    const user = result.rows[0];
    delete user.password;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Seller registered successfully',
      data: { user, token }
    });
  } catch (error) {
    console.error('Register seller error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Register Customer/Buyer
const registerCustomer = async (req, res) => {
  try {
    const { full_name, email, password, phone, country, programming_interests } = req.body;
    
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file upload
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    // Parse programming interests if it's a string
    let interestsArray = programming_interests;
    if (typeof programming_interests === 'string') {
      interestsArray = [programming_interests];
    }

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, phone, country, user_type, profile_picture, programming_interests) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [full_name, email, hashedPassword, phone, country, 'buyer', profilePicture, interestsArray]
    );

    const user = result.rows[0];
    delete user.password;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Buyer registered successfully',
      data: { user, token }
    });
  } catch (error) {
    console.error('Register customer error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    delete user.password;

    // Generate JWT token - عمر أطول عند اختيار "تذكرني"
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { id: user.id, email: user.email, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, email, phone, country, user_type, profile_picture, self_description, programming_skills, programming_interests, is_verified, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { full_name, phone, country, self_description, programming_skills, programming_interests } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    let query = 'UPDATE users SET full_name = $1, phone = $2, country = $3, updated_at = CURRENT_TIMESTAMP';
    let params = [full_name, phone, country];
    let paramIndex = 4;

    if (self_description) {
      query += `, self_description = $${paramIndex}`;
      params.push(self_description);
      paramIndex++;
    }

    if (programming_skills) {
      const skillsArray = Array.isArray(programming_skills) ? programming_skills : [programming_skills];
      query += `, programming_skills = $${paramIndex}`;
      params.push(skillsArray);
      paramIndex++;
    }

    if (programming_interests) {
      const interestsArray = Array.isArray(programming_interests) ? programming_interests : [programming_interests];
      query += `, programming_interests = $${paramIndex}`;
      params.push(interestsArray);
      paramIndex++;
    }

    if (profilePicture) {
      query += `, profile_picture = $${paramIndex}`;
      params.push(profilePicture);
      paramIndex++;
    }

    query += ` WHERE id = $${paramIndex} RETURNING *`;
    params.push(req.user.id);

    const result = await pool.query(query, params);
    const user = result.rows[0];
    delete user.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerSeller,
  registerCustomer,
  login,
  getProfile,
  updateProfile
};
