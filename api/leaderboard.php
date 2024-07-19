<?php
session_start();

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $score = intval($_POST['score']);
    $_SESSION['leaderboard'][] = ['name' => $name, 'score' => $score];
    usort($_SESSION['leaderboard'], function ($a, $b) {
        return $b['score'] - $a['score'];
    });
    $_SESSION['leaderboard'] = array_slice($_SESSION['leaderboard'], 0, 10);
}

header('Content-Type: application/json');
echo json_encode($_SESSION['leaderboard']);
