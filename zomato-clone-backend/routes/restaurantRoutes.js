const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
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

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the "uploads/" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

const upload = multer({ storage }); // Initialize multer

// Serve static files from "uploads" so images can be accessed
router.use('/uploads', express.static(uploadDir));

router.route('/')
  .get(getRestaurants)
  .post(isAuthenticated, isAdmin, upload.single('image'), createRestaurant);

router.route('/:id')
  .get(getRestaurantById)
  .put(isAuthenticated, isAdmin, upload.single('image'), updateRestaurant) // Allow optional image update
  .delete(isAuthenticated, isAdmin, deleteRestaurant);

module.exports = router;
