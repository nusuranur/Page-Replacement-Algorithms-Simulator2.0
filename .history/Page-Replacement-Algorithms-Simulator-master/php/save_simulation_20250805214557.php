<?php
// Show PHP errors in browser (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connect to the database
include("db_connect.php");

// Only proceed if request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Safely read POST values
    $reference_string = $_POST['reference_string'] ?? '';
    $frames = intval($_POST['frames'] ?? 0);
    $algorithm = $_POST['algorithm'] ?? '';
    $hits = intval($_POST['hits'] ?? 0);
    $faults = intval($_POST['faults'] ?? 0);
    $hit_ratio = floatval($_POST['hit_ratio'] ?? 0);
    $miss_ratio = floatval($_POST['miss_ratio'] ?? 0);

    // Prepare the SQL statement
    $stmt = $conn->prepare(
        "INSERT INTO simulation_results 
        (reference_string, frames, algorithm, hits, faults, hit_ratio, miss_ratio)
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters to the statement
    // s = string, i = integer, d = double/float
    $bind = $stmt->bind_param("sisiiid", 
        $reference_string, 
        $frames, 
        $algorithm, 
        $hits, 
        $faults, 
        $hit_ratio, 
        $miss_ratio
    );

    if (!$bind) {
        die("Bind param failed: " . $stmt->error);
    }

    // Execute the statement
    $exec = $stmt->execute();

    if ($exec) {
        echo "Insert success!";
    } else {
        echo "Insert failed: " . $stmt->error;
    }

    // Clean up
    $stmt->close();
    $conn->close();

} else {
    echo "Invalid request method";
}

