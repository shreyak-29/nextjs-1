const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviewRoutes');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes'); // Import the restaurant routes
const path = require('path'); 


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Handle form-data

// Use auth routes
app.use('/api/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded images

// Use review routes
app.use('/api/reviews', reviewRoutes);

app.use('/api/restaurants', restaurantRoutes);  // Add this line for restaurant routes




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
