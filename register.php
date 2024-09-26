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
$regUsername = $_POST['username'];
$regPassword = $_POST['password'];

// Check if username already exists
$sql = "SELECT * FROM users WHERE username='$regUsername'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo json_encode(["success" => false, "message" => "Username already exists"]);
} else {
  // Insert the new user into the database
  $sql = "INSERT INTO users (username, password) VALUES ('$regUsername', '$regPassword')";
  
  if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Registration successful"]);
  } else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
  }
}

$conn->close();
?>