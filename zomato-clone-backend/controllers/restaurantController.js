const Restaurant = require('../models/Restaurant');

// Fetch all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new restaurant
const addRestaurant = async (req, res) => {
  const { name, cuisine, rating } = req.body;

  try {
    // Create a new restaurant with the provided data
    const newRestaurant = new Restaurant({
      name,
      cuisine,
      rating,
    });

    // Save to database
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update restaurant rating
const updateRestaurantRating = async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.rating = rating;
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getRestaurants, 
  addRestaurant, 
  updateRestaurantRating,
};
