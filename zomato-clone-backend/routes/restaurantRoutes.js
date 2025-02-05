const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
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

require('dotenv').config(); // Load environment variables

const router = express.Router();

// AWS S3 Configuration
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION
});

// Multer-S3 Storage Configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME, // Your S3 Bucket Name
    acl: 'public-read', // Make files publicly accessible
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the correct content type
    key: (req, file, cb) => {
      const fileName = `restaurant-images/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only images (JPG, JPEG, PNG) are allowed!'));
    }
  }
});

// Restaurant Routes
router.route('/')
  .get(getRestaurants)
  .post(isAuthenticated, isAdmin, upload.single('image'), createRestaurant);

router.route('/:id')
  .get(getRestaurantById)
  .put(isAuthenticated, isAdmin, upload.single('image'), updateRestaurant)
  .delete(isAuthenticated, isAdmin, deleteRestaurant);

module.exports = router;
