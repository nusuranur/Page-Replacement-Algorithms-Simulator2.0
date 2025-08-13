<?php
include("db_connect.php");

$sql = "SELECT algorithm, COUNT(*) as count, AVG(hit_ratio) as avg_hit_ratio
        FROM simulation_history GROUP BY algorithm";

$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
