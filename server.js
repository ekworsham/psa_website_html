// Main server file for ProScapes Training Portal (Node.js)
// Sets up Express app and API routes

const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const verifyRoute = require('./routes/verify');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API routes
app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/verify', verifyRoute);

// Default route
app.get('/', (req, res) => {
  res.send('ProScapes Training Portal API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
