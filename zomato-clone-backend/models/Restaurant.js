const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating field added
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
