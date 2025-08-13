
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("db_connect.php");  // Make sure this connects to DB successfully

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and fetch POST variables
    $ref_string = $_POST['ref_string'] ?? '';
    $frames = intval($_POST['frames'] ?? 0);
    $algorithm = $_POST['algorithm'] ?? '';
    $hits = intval($_POST['hits'] ?? 0);
    $faults = intval($_POST['faults'] ?? 0);
    $hit_ratio = floatval($_POST['hit_ratio'] ?? 0);
    $miss_ratio = floatval($_POST['miss_ratio'] ?? 0);

    // Prepare SQL Insert (use prepared statements!)
    $stmt = $conn->prepare("INSERT INTO simulation_results 
        (ref_string, frames, algorithm, hits, faults, hit_ratio, miss_ratio) 
        VALUES (?, ?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sisii dd", $ref_string, $frames, $algorithm, $hits, $faults, $hit_ratio, $miss_ratio);

    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Insert failed: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method";
}
?>


