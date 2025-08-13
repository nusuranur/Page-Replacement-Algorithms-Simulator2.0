<?php
include("db_connect.php");

$sql = "SELECT username, COUNT(*) as total, SUM(hits) as total_hits, SUM(faults) as total_faults
        FROM simulation_history GROUP BY username ORDER BY total_hits DESC LIMIT 10";

$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
