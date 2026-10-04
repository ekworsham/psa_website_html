// Session Verification API Endpoint (Node.js)
// Verifies if user session/token is valid

const express = require('express');
const router = express.Router();

// Enable CORS for local development
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle preflight OPTIONS request
router.options('/', (req, res) => {
  res.sendStatus(200);
});

// For demonstration, expects token and user info in request body (or use JWT in production)
router.post('/', (req, res) => {
  const { token, username, email, job_title, division, session_start } = req.body || {};
  if (!token || !username || !email) {
    return res.status(401).json({ valid: false, error: 'No active session' });
  }
  // Check session timeout (1 hour)
  const sessionTimeout = 3600; // seconds
  if (session_start && (Date.now() / 1000 - session_start > sessionTimeout)) {
    return res.status(401).json({ valid: false, error: 'Session expired' });
  }
  return res.status(200).json({
    valid: true,
    username,
    email,
    job_title: job_title || null,
    division: division || null
  });
});

module.exports = router;
