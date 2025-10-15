const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createOffer,
  acceptOffer,
  counterOffer,
  rejectOffer,
  getMyOffers,
  getOfferById
} = require('../controllers/offersController');

router.post('/', authenticateToken, createOffer);

router.get('/my-offers', authenticateToken, getMyOffers);

router.get('/:id', authenticateToken, getOfferById);

router.put('/:id/accept', authenticateToken, acceptOffer);

router.put('/:id/counter', authenticateToken, counterOffer);

router.put('/:id/reject', authenticateToken, rejectOffer);

module.exports = router;
