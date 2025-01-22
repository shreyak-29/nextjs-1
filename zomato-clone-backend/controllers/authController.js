const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Register user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Prepare the JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };
    // Generate JWT
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err.message); // Log the error for debugging
        return res.status(500).send('Server Error');
      }
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);  // More detailed logging
    res.status(500).send('Server Error');
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Prepare the JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Generate JWT
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err.message);  // More detailed logging
        return res.status(500).send('Server Error');
      }
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error(err.message);  // More detailed logging
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerUser,
  loginUser
};
