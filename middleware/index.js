const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 if not in .env
const APP_SECRET = process.env.APP_SECRET;

// Hash a password with bcrypt
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Hashing failed.');
  }
};

// Compare a plain text password with a hashed password
const comparePassword = async (storedPassword, password) => {
  try {
    const passwordMatch = await bcrypt.compare(password, storedPassword);
    return passwordMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Password comparison failed.');
  }
};

// Create a JWT token with a 1-hour expiration
const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, APP_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error creating token:', error);
    throw new Error('Token creation failed.');
  }
};

// Extract the token from the Authorization header
const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (token) {
      res.locals.token = token;
      return next();
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized: No token provided' });
  } catch (error) {
    console.error('Error stripping token:', error);
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error' });
  }
};

// Verify the extracted token and decode the payload
const verifyToken = (req, res, next) => {
  const { token } = res.locals;
  try {
    const payload = jwt.verify(token, APP_SECRET);
    res.locals.payload = payload;
    return next(); // Token is valid, proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).send({ status: 'Error', msg: 'Token Expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).send({ status: 'Error', msg: 'Invalid Token' });
    } else {
      res.status(401).send({ status: 'Error', msg: 'Unauthorized Access' });
    }
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken,
};
