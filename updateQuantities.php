<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Database connection
$servername = "localhost"; // Change to your server details
$username = "username"; // Change to your database username
$password = "password"; // Change to your database password
$dbname = "vending_machine"; // Change to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (empty($data)) {
    echo json_encode(['error' => 'No data received']);
    exit;
}


// Prepare and bind
$stmt = $conn->prepare("UPDATE product_det SET pd_quantity = pd_quantity - ? WHERE pd_id = ?");
$stmt->bind_param("ii", $pd_quantity, $pd_id);

// Update each quantity in the database
foreach ($data as $item) {
    $pd_id = $item['pd_id'];
    $pd_quantity = $item['pd_quantity'];
    $stmt->execute();
}

$stmt->close();
$conn->close();

// Return response
echo json_encode(['message' => 'Quantities updated successfully']);
?>
