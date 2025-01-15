const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); // Assuming you have a User model
const authMiddleware = require('../middleware/authMiddleware'); // Optional: Protect other routes

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate user and send back a JWT
// @access  Public
router.post(
  '/login',
  [
    // Validate email and password
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token (expires in 1 hour)
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token back to the frontend
      res.json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST /api/auth/signup
// @desc    Register a new user and send back a JWT
// @access  Public
router.post(
  '/signup',
  [
    // Validate the input fields
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token (expires in 1 hour)
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send the token back to the frontend
      res.json({ token });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
