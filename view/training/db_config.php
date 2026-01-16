<?php
/**
 * Database Configuration
 * ProScapes Training Portal
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'cpses_proscape_training'); // Verify this name in your hosting panel
define('DB_USER', 'cpses_pr81k8qx4vs');
define('DB_PASS', 'ProPass3374!'); // ADD YOUR DATABASE PASSWORD HERE

// Create database connection
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

// Security: Prevent direct access
if (!defined('DIRECT_ACCESS')) {
    http_response_code(403);
    die('Direct access not permitted');
}
?>
