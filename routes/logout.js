// Logout API Endpoint (Node.js)
// Destroys user session or instructs client to remove token

const express = require('express');
const router = express.Router();

// Enable CORS for local development
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle preflight OPTIONS request
router.options('/', (req, res) => {
  res.sendStatus(200);
});

// Logout route
router.post('/', (req, res) => {
  // If using sessions, destroy session here
  // If using JWT or token, instruct client to delete token
  // For stateless API, just return success
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
