<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include '../db_connect.php';

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