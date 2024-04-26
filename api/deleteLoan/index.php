<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: DELETE");
include "../db_connect.php";

// Check if the request method is DELETE
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    if ($data && isset($data['loan_id'])) {
        $loan_id = $data['loan_id'];
        
        $dbConnect = new DbConnect();

        try {
            // Connect to the database
            $conn = $dbConnect->connect();

            // Prepare a SQL statement to delete the record
            $stmt = $conn->prepare("DELETE FROM loanrequest WHERE loan_id = :loan_id");

            // Bind the parameter
            $stmt->bindParam(':loan_id', $loan_id);

            // Execute the statement
            $stmt->execute();

            // Check if any rows were affected
            if ($stmt->rowCount() > 0) {
                // Record deleted successfully
                echo json_encode(array("message" => "Record deleted successfully"));
            } else {
                // No record found with the specified id
                echo json_encode(array("error" => "No record found with id = $id"));
            }
        } catch (PDOException $e) {
            // Display an error message if something goes wrong
            echo json_encode(array("error" => "Database Error: " . $e->getMessage()));
        }
    } else {
        // Invalid JSON data or missing id
        echo json_encode(array("error" => "Invalid JSON data or id is missing"));
    }
    exit; // Prevent further execution
}
?>
