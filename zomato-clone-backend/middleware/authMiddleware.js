const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify tokenmakw
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
