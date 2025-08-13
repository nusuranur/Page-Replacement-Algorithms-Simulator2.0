<?php
include 'db_connect.php';

$sql = "SELECT username, algorithm, pages, faults, (pages - faults) AS hits, ROUND((pages - faults)/pages, 2) AS hit_ratio
        FROM simulation_history
        ORDER BY hit_ratio DESC, timestamp DESC
        LIMIT 10";

$result = $conn->query($sql);

$leaderboard = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($leaderboard);

$conn->close();
?>
