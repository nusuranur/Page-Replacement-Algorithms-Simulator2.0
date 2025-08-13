<?php
include("db_connect.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ref_string = $_POST["ref_string"];
    $frames = $_POST["frames"];
    $algorithm = $_POST["algorithm"];
    $hits = $_POST["hits"];
    $faults = $_POST["faults"];
    $hit_ratio = $_POST["hit_ratio"];
    $miss_ratio = $_POST["miss_ratio"];

    $query = "INSERT INTO simulation_results (ref_string, frames, algorithm, hits, faults, hit_ratio, miss_ratio)
              VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("sisii dd", $ref_string, $frames, $algorithm, $hits, $faults, $hit_ratio, $miss_ratio);

    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Failed to insert: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

