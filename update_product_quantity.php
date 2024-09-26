<?php
header('Content-Type: application/json');

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vending_machine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the input data
$pd_id = $_POST['id'];
$quantity = $_POST['quantity'];

// Prepare and execute the update query
$stmt = $conn->prepare("UPDATE product_det SET pd_quantity = ? WHERE pd_id = ?");
$stmt->bind_param('ii', $quantity, $pd_id);

$success = $stmt->execute();

$stmt->close();
$conn->close();

echo json_encode(['success' => $success]);
?>
