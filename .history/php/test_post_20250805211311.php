<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST received\n";
    var_dump($_POST);
} else {
    echo "Send POST request to test.";
}
