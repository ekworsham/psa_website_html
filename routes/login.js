// Login API Endpoint (Node.js)
// Authenticates users against the database

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { getDBConnection } = require('../model/db');

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

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const db = await getDBConnection();
  if (!db) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE (username = ? OR work_email = ?) AND employee_status = 'Full-Time' LIMIT 1`,
      [username, username]
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    if (!user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');
    // Optionally, store session info in a session store or JWT
    // Log successful login
    console.log('User logged in:', user.work_email);
    return res.status(200).json({
      success: true,
      token,
      username: user.username,
      email: user.work_email,
      job_title: user.job_title,
      division: user.division
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).json({ error: 'An error occurred during login' });
  } finally {
    db.end();
  }
});

module.exports = router;
