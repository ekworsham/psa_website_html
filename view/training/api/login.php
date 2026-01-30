<?php
/**
 * Login API Endpoint
 * Authenticates users against the database
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

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Include database configuration
require_once '../db_config.php';

// Start session
session_start();

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit();
}

$username = trim($input['username']);
$password = $input['password'];

// Connect to database
$db = getDBConnection();

if (!$db) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

try {

        // Query user by username or work_email only (remove full name for security)
        $stmt = $db->prepare("
            SELECT * FROM users 
            WHERE (username = :username OR work_email = :username)
            AND employee_status = 'Full-Time'
            LIMIT 1
        ");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        exit();
    }
    
    // Verify password hash
    if (empty($user['password_hash']) || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        exit();
    }
    
    // Create session

    $_SESSION['user_id'] = $user['id'] ?? null;
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['work_email'];
    $_SESSION['job_title'] = $user['job_title'];
    $_SESSION['division'] = $user['division'];
    $_SESSION['session_start'] = time();

    // Generate session token
    $token = bin2hex(random_bytes(32));
    $_SESSION['token'] = $token;

    // Log successful login (optional)
    error_log("User logged in: " . $user['work_email']);

    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'token' => $token,
        'username' => $user['username'],
        'email' => $user['work_email'],
        'job_title' => $user['job_title'],
        'division' => $user['division']
    ]);
    
} catch (PDOException $e) {
    error_log("Login Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred during login']);
}
?>
