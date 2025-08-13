<?php
include("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$username = "guest"; // default user for now
$algorithm = $data['algorithm'];
$reference_string = $data['reference_string'];
$frames = $data['frames'];
$hits = $data['hits'];
$faults = $data['faults'];
$hit_ratio = $data['hit_ratio'];
$miss_ratio = $data['miss_ratio'];

$sql = "INSERT INTO simulation_history (username, algorithm, reference_string, frames, hits, faults, hit_ratio, miss_ratio)
        VALUES ('$username', '$algorithm', '$reference_string', $frames, $hits, $faults, $hit_ratio, $miss_ratio)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
