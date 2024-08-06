<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db.php';

if (!isset($pdo)) {
    echo 'Database connection failed';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $result = $_POST['result'];

    if (!in_array($result, ['X', 'O', 'Draw'])) {
        echo 'Invalid result';
        exit;
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO game_results (result) VALUES (:result)');
        $stmt->execute(['result' => $result]);
        echo 'Game result saved successfully';
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo 'Invalid request method';
}
?>
