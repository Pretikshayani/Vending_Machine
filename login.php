<?php
// Database connection
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "vending_machine"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$loginUsername = $_POST['username'];
$loginPassword = $_POST['password'];

// Validate credentials
$sql = "SELECT * FROM users WHERE username='$loginUsername' AND password='$loginPassword'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode(["success" => true, "message" => "Login successful"]);
} else {
  echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}

$conn->close();
?>
