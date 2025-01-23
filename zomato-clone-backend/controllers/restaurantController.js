const Restaurant = require('../models/restaurantModel');  // Import the Restaurant model
const mongoose = require('mongoose');


// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new restaurant
const createRestaurant = async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update a restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params; // Use route parameter
    const restaurant = await Restaurant.findById(id); // Find by route parameter
    if (restaurant) {
      Object.assign(restaurant, req.body); // Update fields
      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get a single restaurant by ID

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params; // Use the ID from the URL params
    const restaurant = await Restaurant.findById(id); // Find restaurant by ID

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }

    // Find and remove the restaurant by ID
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (restaurant) {
      res.json({ message: 'Restaurant removed successfully' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Error deleting restaurant:', { id: req.body.id, error: error.message });

    // Return a generic error response
    res.status(500).json({ message: 'Failed to delete restaurant' });
  }
};





// Export all functions using CommonJS
module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById
};
