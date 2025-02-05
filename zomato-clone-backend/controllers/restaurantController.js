const Restaurant = require('../models/restaurantModel');
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
  try {
    const { name, description, rating, cuisine, location, imageUrl } = req.body;

    // Handle file or URL for image
    const image = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    // Create new restaurant       
    const newRestaurant = new Restaurant({
      name,
      description,
      rating,
      cuisine,
      location,
      image,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    let restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Handle file upload or use URL
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || restaurant.image;
    Object.assign(restaurant, { ...req.body, image: imageUrl });

    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (restaurant) {
      res.json({ message: 'Restaurant removed successfully' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error deleting restaurant:', { id: req.body.id, error: error.message });
    res.status(500).json({ message: 'Failed to delete restaurant' });
  }
};

// Export all functions
module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById,
};
