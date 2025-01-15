const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Protect route
const { getRestaurants, addRestaurant } = require('../controllers/restaurantController'); // Controller methods

const router = express.Router();

// Fetch all restaurants (protected route)
router.get('/', authMiddleware, getRestaurants);

// Add a new restaurant (protected route)
router.post('/', authMiddleware, addRestaurant);

module.exports = router;
