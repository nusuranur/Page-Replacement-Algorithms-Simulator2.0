<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $reference_string = $_POST['reference_string'] ?? '';
    $frames = intval($_POST['frames'] ?? 0);
    $algorithm = $_POST['algorithm'] ?? '';
    $hits = intval($_POST['hits'] ?? 0);
    $faults = intval($_POST['faults'] ?? 0);
    $hit_ratio = floatval($_POST['hit_ratio'] ?? 0);
    $miss_ratio = floatval($_POST['miss_ratio'] ?? 0);

   $stmt = $conn->prepare("INSERT INTO simulation_results (reference_string, frames, algorithm, hits, faults, hit_ratio, miss_ratio) VALUES (?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

// Fixed type string (no space!)
$bind = $stmt->bind_param("sisiiid", $reference_string, $frames, $algorithm, $hits, $faults, $hit_ratio, $miss_ratio);

if (!$bind) {
    die("Bind param failed: " . $stmt->error);
}

$exec = $stmt->execute();

if ($exec) {
    echo "Insert success!";
} else {
    echo "Insert failed: " . $stmt->error;
}

?>
