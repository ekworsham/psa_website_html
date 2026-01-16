<?php
/**
 * Logout API Endpoint
 * Destroys user session
 */

// Allow API access
define('DIRECT_ACCESS', true);

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start session
session_start();

// Destroy session
$_SESSION = array();

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

session_destroy();

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
?>
