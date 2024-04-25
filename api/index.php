<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
include 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data from the request body
    $json_data = file_get_contents('php://input');

    // Decode JSON data
    $data = json_decode($json_data, true);

    if ($data) {
        // Extract data
        $name = $data['name'];
        $phone = $data['phone'];
        $password = $data['password'];
        $role = $data['role'];
        $age = $data['age'];
        $email = $data['email'];
        $address = $data['address'];
        $gender = $data['gender'];

        // Create a new DbConnect object
        $dbConnect = new DbConnect();

        try {
            // Connect to the database
            $conn = $dbConnect->connect();

            // Prepare a SQL statement to insert data into the database
            $stmt = $conn->prepare("INSERT INTO account (name, phone, password, role, age, email, address, gender) VALUES (:name, :phone, :password, :role, :age, :email, :address, :gender)");

            // Bind parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':role', $role);
            $stmt->bindParam(':age', $age);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':gender', $gender);

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

//Api for login by phone and password
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    if ($data) {
        $phone = $data['phone'];
        $password = $data['password'];
        $dbConnect = new DbConnect();
        $conn = $dbConnect->connect();
        $stmt = $conn->prepare("SELECT * FROM account WHERE phone = :phone AND password = :password");
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } else {
        echo json_encode(array("error" => "Invalid JSON data"));
    }
}