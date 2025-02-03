const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/authMiddleware');
const {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
} = require('../controllers/restaurantController');

const router = express.Router();

router.route('/')
  .get(getRestaurants)
  .post(isAuthenticated, isAdmin, createRestaurant);  // Ensure user is authenticated before checking admin

router.route('/:id')
  .get(getRestaurantById)
  .put(isAuthenticated, isAdmin, updateRestaurant)
  .delete(isAuthenticated, isAdmin, deleteRestaurant);

module.exports = router;
