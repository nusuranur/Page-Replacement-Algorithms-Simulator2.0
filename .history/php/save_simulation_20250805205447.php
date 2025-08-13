<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $algorithm = $data['algorithm'];
    $reference_string = $data['reference_string'];
    $frames = $data['frames'];
    $hits = $data['hits'];
    $faults = $data['faults'];
    $hit_ratio = $data['hit_ratio'];
    $miss_ratio = $data['miss_ratio'];

    $stmt = $conn->prepare("INSERT INTO simulation_results (algorithm, reference_string, frames, hits, faults, hit_ratio, miss_ratio)
                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiiidd", $algorithm, $reference_string, $frames, $hits, $faults, $hit_ratio, $miss_ratio);

    if ($stmt->execute()) {
        echo "Simulation saved successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
} else {
    echo "No data received.";
}
?>
