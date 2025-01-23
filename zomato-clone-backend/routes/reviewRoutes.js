const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllReviews, addReview, deleteReview, updateReview } = require('../controllers/reviewController');

const router = express.Router();

// Protected Routes
router.get('/', authMiddleware, getAllReviews);
router.post('/', authMiddleware, addReview);
router.put('/:id', authMiddleware, updateReview); // Add update route
router.delete('/:id', authMiddleware, deleteReview); // Add delete route


module.exports = router;
