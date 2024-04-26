<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include "../db_connect.php";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    if ($data) {
        $id = $data['id'];
        $name = $data['name'];
        $phone = $data['phone'];
        $email = $data['email'];
        $loanAmount = $data['loanAmount'];
        $message = $data['message'];
        
        $dbConnect = new DbConnect();

        try {
            // Connect to the database
            $conn = $dbConnect->connect();

            // Prepare a SQL statement to insert data into the database
            $stmt = $conn->prepare("INSERT INTO loanrequest (id, name, phone, email, loanAmount, message) VALUES (:id, :name, :phone,  :email, :loanAmount, :message)");

            // Bind parameters
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':loanAmount', $loanAmount);
            $stmt->bindParam(':message', $message);

            // Execute the statement
            $stmt->execute();

            // Display a success message
            echo json_encode(array("message" => "Account created successfully"));
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

