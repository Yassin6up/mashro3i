const express = require('express');
const router = express.Router();
const { authenticateToken, isSeller } = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const {
  createProject,
  getAllProjects,
  getProjectById,
  getSellerProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', authenticateToken, isSeller, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'files', maxCount: 10 }
]), createProject);

router.get('/seller/my-projects', authenticateToken, isSeller, getSellerProjects);
router.put('/:id', authenticateToken, isSeller, updateProject);
router.delete('/:id', authenticateToken, isSeller, deleteProject);

module.exports = router;
