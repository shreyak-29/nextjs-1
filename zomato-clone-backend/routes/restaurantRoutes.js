const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
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
  .post(authMiddleware, createRestaurant);

router.route('/:id')
  .get(getRestaurantById)
  .put(authMiddleware, updateRestaurant)
  .delete(authMiddleware, deleteRestaurant);

module.exports = router;