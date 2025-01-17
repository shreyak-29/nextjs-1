const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllReviews, addReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// Protected Routes
router.get('/', authMiddleware, getAllReviews);
router.post('/', authMiddleware, addReview);
router.delete('/:id', authMiddleware, deleteReview); // Add delete route


module.exports = router;
