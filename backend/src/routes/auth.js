const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const {
  registerSeller,
  registerCustomer,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');

// Public routes
router.post('/register/seller', upload.single('profile_picture'), registerSeller);
router.post('/register/customer', upload.single('profile_picture'), registerCustomer);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, upload.single('profile_picture'), updateProfile);

module.exports = router;
