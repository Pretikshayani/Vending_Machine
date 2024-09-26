<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// SQL query to fetch product details
$sql = "SELECT pd_id, pd_name, pd_price, pd_quantity FROM product_det";
$result = $conn->query($sql);

$products = array();
if ($result->num_rows > 0) {
    // Fetch each row and add it to the products array
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
} else {
    // No products found
    echo json_encode(array("message" => "No products found"));
    exit;
}

// Return the products as a JSON response
echo json_encode($products);

// Close the database connection
$conn->close();
?>
