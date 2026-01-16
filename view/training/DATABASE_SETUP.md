# Database Setup for Training Portal

## Overview
This guide will help you connect your training portal to the MySQL database you created in phpMyAdmin.

## Current Database Structure
You have a database named `proscape_training` with a `users` table containing:
- first_name
- last_name
- job_title
- division
- hire_date
- work_email
- employee_status
- password

## Step 1: Add Password Support

Your current `users` table doesn't have a password field. You need to add it:

### Option A: Using phpMyAdmin GUI
1. Open phpMyAdmin
2. Select database: `proscape_training`
3. Click on `users` table
4. Click "Structure" tab
5. Click "Add" to add a new column
6. Add these fields:
   - **Column name:** `password_hash`
   - **Type:** VARCHAR
   - **Length:** 255
   - **Null:** Allow NULL
   - Click "Save"

### Option B: Using SQL Script
1. Open phpMyAdmin
2. Select database: `proscape_training`
3. Click "SQL" tab
4. Copy and paste the contents of `setup_database.sql`
5. Click "Go" to execute

## Step 2: Configure Database Connection

1. Open `db_config.php`
2. Update these settings:
   ```php
   define('DB_HOST', 'localhost');     // Your database host
   define('DB_PORT', '3306');          // Your database port
   define('DB_NAME', 'proscape_training');
   define('DB_USER', 'root');          // Your database username
   define('DB_PASS', '');              // Your database password
   ```

## Step 3: Set User Passwords

You need to hash passwords before storing them. Use this PHP script:

### Create a password hash:
```php
<?php
// Run this in a separate PHP file or in phpMyAdmin's SQL console
$password = 'YourPassword123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo $hash;
?>
```

### Update user password in phpMyAdmin:
1. Go to `users` table
2. Click "Edit" for the user
3. In `password_hash` field, paste the generated hash
4. Click "Go"

**OR** use the SQL query:
```sql
UPDATE users 
SET password_hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE work_email = 'keith@proscapesofatl.com';
```
(This sets password to "temp123" for testing)

## Step 4: Update Login Page JavaScript

Replace the client-side authentication in `login.html` with this:

```javascript
// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Disable button during processing
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    
    try {
        // Send credentials to PHP backend
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store session info
            localStorage.setItem('trainingSessionToken', data.token);
            localStorage.setItem('trainingUsername', data.username);
            const expiryDays = rememberMe ? 30 : 1;
            const expiry = new Date().getTime() + (expiryDays * 24 * 60 * 60 * 1000);
            localStorage.setItem('trainingSessionExpiry', expiry);
            
            showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showAlert(data.error || 'Login failed. Please try again.', 'error');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Connection error. Please try again.', 'error');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});
```

## Step 5: Test the Setup

### Current Test Credentials (after running setup_database.sql):
- **Email:** keith@proscapesofatl.com
- **Password:** temp123

### Test Login Flow:
1. Navigate to `/view/training/login.html`
2. Enter email: `keith@proscapesofatl.com`
3. Enter password: `temp123`
4. Click "Sign In"
5. You should be redirected to the training portal

## Step 6: Server Requirements

Make sure your server has:
- ✅ PHP 7.4 or higher
- ✅ PDO MySQL extension enabled
- ✅ Session support enabled
- ✅ MySQL/MariaDB database

### Check PHP Configuration:
Create a file `test.php`:
```php
<?php
phpinfo();
?>
```
Upload it to your server and visit it in browser to verify PHP is working.

## Security Recommendations

### For Production:
1. **Use HTTPS only** - Never send passwords over HTTP
2. **Strong passwords** - Require complex passwords (8+ chars, mixed case, numbers, symbols)
3. **Rate limiting** - Prevent brute force attacks
4. **CSRF protection** - Add CSRF tokens to forms
5. **Prepared statements** - Already implemented in the API files
6. **Session security** - Use secure session cookies
7. **Password policy** - Implement password expiration
8. **Two-factor authentication** - Consider adding 2FA

### Update db_config.php for production:
```php
// Move credentials to environment variables
define('DB_HOST', getenv('DB_HOST'));
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
```

## Troubleshooting

### "Database connection failed"
- Check MySQL service is running
- Verify credentials in `db_config.php`
- Check MySQL user has proper permissions

### "Invalid username or password"
- Verify user exists in database
- Check password hash is set correctly
- Make sure `employee_status` is "Full-Time"

### "CORS error"
- Make sure PHP files are in same domain as HTML
- Check CORS headers in API files

### "Session not working"
- Verify PHP sessions are enabled
- Check session.save_path is writable
- Make sure cookies are enabled in browser

## File Structure

```
view/training/
├── login.html           (Login page)
├── index.html          (Training portal)
├── db_config.php       (Database configuration)
├── setup_database.sql  (Database setup script)
├── DATABASE_SETUP.md   (This file)
└── api/
    ├── login.php       (Login endpoint)
    ├── verify.php      (Session verification)
    └── logout.php      (Logout endpoint)
```

## Next Steps

1. Run the database setup script
2. Set user passwords
3. Update login.html with new JavaScript
4. Test login functionality
5. Implement additional security measures
6. Add password reset functionality
7. Create admin panel for user management

## Support

For issues or questions, refer to the main README.md in the training folder.
