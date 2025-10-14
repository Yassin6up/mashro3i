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

// Protected routes (must be before dynamic routes)
router.get('/seller/my-projects', authenticateToken, isSeller, getSellerProjects);

router.post('/', authenticateToken, isSeller, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'files', maxCount: 10 }
]), createProject);

router.put('/:id', authenticateToken, isSeller, updateProject);
router.delete('/:id', authenticateToken, isSeller, deleteProject);

// Dynamic routes (must be last)
router.get('/:id', getProjectById);

module.exports = router;
