<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include '../db_connect.php';


//api for get all users
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $dbConnect = new DbConnect();
    $conn = $dbConnect->connect();
    $stmt = $conn->query("SELECT * FROM loanrequest");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}