const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware function wich checks if the token given is valid
function verifyToken(req, res, next) {
  // Checking if user sends a token
  const token = req.header(process.env.JWT_HEADER_NAME);
  if (!token) {
    return res.status(401).send('Access denied');
  }

  // Checking if the token is valid
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();

  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
}

module.exports = verifyToken;