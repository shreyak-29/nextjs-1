const mongoose = require('mongoose');

// Assuming you have a User model to reference
const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Store the user's ID
    ref: 'User', // Reference to the User model
    required: true, // Ensure that each review has a user associated with it
  },
});

module.exports = mongoose.model('Review', reviewSchema);
