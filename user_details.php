<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection settings
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

// Fetch userid, username, and password from the database
$sql = "SELECT id, username, password FROM users";
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    // Output data in table format
    echo "<table>
            <tr>
              <th>UserID</th>
              <th>Username</th>
              <th>Password</th>
            </tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . htmlspecialchars($row["id"]) . "</td>
                <td>" . htmlspecialchars($row["username"]) . "</td>
                <td>" . htmlspecialchars($row["password"]) . "</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No users found.";
}

// Close connection
$conn->close();
?>
