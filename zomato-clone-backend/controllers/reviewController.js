// reviewController.js

const Review = require('../models/reviewModel'); // Adjust path to your review model

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews', error });
  }
};

// Add a new review
exports.addReview = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required' });
  }

  try {
    const newReview = new Review({
      content,
      user: req.user.id, // Use the authenticated user's ID from req.user
    });

    await newReview.save();
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add review', error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check if the logged-in user is the owner of the review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this review' });
    }

    await review.remove();
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete review', error });
  }
};

