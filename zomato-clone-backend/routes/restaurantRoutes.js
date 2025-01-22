// routes/restaurantRoutes.js
const express = require('express');
const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
} = require('../controllers/restaurantController');

// Create the router
const router = express.Router();

// Define the routes
router.route('/')
  .get(getRestaurants)
  .post(createRestaurant);

router.route('/:id')
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

// Export the router using CommonJS syntax
module.exports = router;
