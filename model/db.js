// Database Configuration for ProScapes Training Portal (Node.js)
// Uses mysql2 for MySQL connections
// Place credentials in environment variables for security

const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_NAME = process.env.DB_NAME || 'proscape_training';
const DB_USER = process.env.DB_USER || 'worsham.keith';
const DB_PASS = process.env.DB_PASS || '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

async function getDBConnection() {
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            charset: 'utf8mb4',
        });
        return connection;
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        return null;
    }
}

module.exports = { getDBConnection };