# ProScapes Training Portal - Login System

## Overview

This is a secure login system for the ProScapes employee training portal with client-side session management.

## Files Created

1. **login.html** - Login page with authentication
2. **index.html** - Protected training portal page
3. **README.md** - This documentation file

## Features

### Security Features

- ✅ Session-based authentication
- ✅ Password visibility toggle
- ✅ Remember me functionality (30-day sessions)
- ✅ Session expiry warnings
- ✅ Auto-redirect for unauthorized access
- ✅ Secure logout functionality
- ✅ Protected content that requires authentication

### User Experience

- Responsive design for mobile and desktop
- Modern, clean interface
- Form validation
- Loading states
- Error/success messages
- Password recovery link

## Demo Credentials

For testing purposes, these credentials are configured:

```
Username: admin
Password: admin123

Username: employee
Password: employee123

Username: trainer
Password: trainer123
```

## How It Works

### Client-Side Authentication (Current Implementation)

The current implementation uses **client-side authentication** stored in localStorage. This is suitable for:

- Demo/testing environments
- Internal training portals with low security requirements
- Quick prototyping

**How it works:**

1. User enters credentials on `login.html`
2. JavaScript validates against hardcoded credentials
3. If valid, creates a session token in localStorage
4. User is redirected to `index.html`
5. `index.html` checks for valid session before displaying content

### Server-Side Authentication (Recommended for Production)

For production use, you should implement **server-side authentication**:

#### Option 1: Node.js/Express Backend

```javascript
// Example server-side authentication with Express
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Query database for user
  const user = await db.findUser(username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token, username: user.username });
});
```

#### Option 2: PHP Backend

```php
<?php
// Example PHP authentication
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}
?>
```

## Upgrading to Server-Side Authentication

### Step 1: Create Backend API

Choose your backend technology (Node.js, PHP, Python, etc.) and create:

- `/api/login` - Authenticate user
- `/api/logout` - Destroy session
- `/api/verify` - Verify session token

### Step 2: Update login.html JavaScript

Replace the client-side validation with API calls:

```javascript
// Replace the form submit handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", data.username);
      window.location.href = "index.html";
    } else {
      showAlert(data.error || "Login failed", "error");
    }
  } catch (error) {
    showAlert("Server error. Please try again.", "error");
  }
});
```

### Step 3: Add Database

Create a users table:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

### Step 4: Hash Passwords

Never store plain-text passwords. Use bcrypt or similar:

```javascript
// Node.js example
const bcrypt = require("bcrypt");
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
```

## Customization

### Change Valid Credentials

Edit the `VALID_CREDENTIALS` object in `login.html`:

```javascript
const VALID_CREDENTIALS = {
  yourUsername: "yourPassword",
  anotherUser: "anotherPassword",
};
```

### Modify Session Duration

Change the expiry days in `login.html`:

```javascript
const expiryDays = rememberMe ? 30 : 1; // Change these values
```

### Customize Styling

Both files use embedded CSS that can be modified:

- Color scheme: Search for hex colors like `#667eea`, `#764ba2`
- Fonts: Modify `font-family` properties
- Layout: Adjust padding, margins, grid properties

### Add More Training Modules

In `index.html`, add new cards to the `.training-grid`:

```html
<div class="training-card">
  <span class="status not-started">Not Started</span>
  <h3>Your Training Title</h3>
  <p>Your training description here.</p>
  <button class="access-btn">Start Training</button>
</div>
```

## Security Best Practices

### For Production:

1. ✅ Use HTTPS only
2. ✅ Implement server-side authentication
3. ✅ Use secure password hashing (bcrypt, argon2)
4. ✅ Implement CSRF protection
5. ✅ Add rate limiting to prevent brute force
6. ✅ Use secure session tokens (JWT or server sessions)
7. ✅ Implement password complexity requirements
8. ✅ Add two-factor authentication (2FA)
9. ✅ Log authentication attempts
10. ✅ Set secure cookie flags (HttpOnly, Secure, SameSite)

## Access the Portal

1. **Login Page**: Navigate to `/view/training/login.html`
2. **Training Portal**: After successful login, you'll be redirected to `/view/training/index.html`

## Troubleshooting

### Can't Access Training Portal

- Make sure you're logged in via `login.html` first
- Check browser console for errors
- Verify localStorage has `trainingSessionToken`
- Clear browser cache and try again

### Session Expires Too Quickly

- Check the expiry calculation in `login.html`
- Make sure "Remember me" is checked
- Verify localStorage isn't being cleared by browser settings

### Forgot Password Link

Currently shows an alert. To implement:

1. Create a password reset page
2. Send reset emails via backend
3. Update the link handler in `login.html`

## Next Steps

To make this production-ready:

1. Set up a backend server (Node.js, PHP, Python, etc.)
2. Create a database for user management
3. Implement proper password hashing
4. Add email verification
5. Create admin panel for user management
6. Add actual training content/modules
7. Implement progress tracking
8. Add certificate generation upon completion

## Support

For questions or issues, contact Keith Worsham or refer to the main project documentation.
