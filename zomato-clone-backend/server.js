const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviewRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes'); // Import the restaurant routes


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// Use review routes
app.use('/api/reviews', reviewRoutes);

app.use('/api/restaurants', restaurantRoutes);  // Add this line for restaurant routes




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
