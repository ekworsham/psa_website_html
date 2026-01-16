<?php
/**
 * Session Verification API Endpoint
 * Verifies if user session is valid
 */

// Allow API access
define('DIRECT_ACCESS', true);

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id']) || !isset($_SESSION['token'])) {
    http_response_code(401);
    echo json_encode([
        'valid' => false,
        'error' => 'No active session'
    ]);
    exit();
}

// Check session timeout (1 hour)
$sessionTimeout = 3600; // 1 hour in seconds
if (isset($_SESSION['session_start']) && (time() - $_SESSION['session_start']) > $sessionTimeout) {
    session_destroy();
    http_response_code(401);
    echo json_encode([
        'valid' => false,
        'error' => 'Session expired'
    ]);
    exit();
}

// Session is valid
http_response_code(200);
echo json_encode([
    'valid' => true,
    'username' => $_SESSION['username'],
    'email' => $_SESSION['email'],
    'job_title' => $_SESSION['job_title'] ?? null,
    'division' => $_SESSION['division'] ?? null
]);
?>
