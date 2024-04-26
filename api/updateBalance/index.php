<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
// Allow requests from specific origins (replace '*' with your frontend domain)
header("Access-Control-Allow-Origin: *");

// Allow specified methods (PUT in this case)
header("Access-Control-Allow-Methods: PUT");

// Allow specified headers (content type and any other headers needed)
header("Access-Control-Allow-Headers: Content-Type");

// Respond to preflight requests (OPTIONS method) with 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include '../db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $json_data = file_get_contents('php://input');

    // Decode JSON data
    $data = json_decode($json_data, true);

    if ($data) {
        // Extract data
        $id = $data['id']; // Assuming you have 'user_id' in your JSON data
        $name = $data['name']; // New name to update

        // Create a new DbConnect object
        $dbConnect = new DbConnect();

        try {
            // Connect to the database
            $conn = $dbConnect->connect();

            // Prepare a SQL statement to update the user's name
            $stmt = $conn->prepare("UPDATE account SET name = :name WHERE id = :id");

            // Bind parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':id', $id);

            // Execute the statement
            $stmt->execute();

            // Check if the update was successful
            if ($stmt->rowCount() > 0) {
                // Display a success message
                echo json_encode(array("message" => "Name updated successfully"));
            } else {
                // No rows affected (user not found or no changes made)
                echo json_encode(array("error" => "User not found or no changes made"));
            }
        } catch (PDOException $e) {
            // Display an error message if something goes wrong
            echo json_encode(array("error" => "Database Error: " . $e->getMessage()));
        }
    } else {
        // Invalid JSON data
        echo json_encode(array("error" => "Invalid JSON data"));
    }
    exit; // Prevent further execution
}
?>
