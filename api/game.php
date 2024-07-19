<?php
session_start();

if (!isset($_SESSION['board'])) {
    $_SESSION['board'] = array_fill(0, 9, null);
    $_SESSION['currentPlayer'] = 'X';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['index'])) {
        $index = intval($_POST['index']);
        if ($_SESSION['board'][$index] === null && !checkWinner()) {
            $_SESSION['board'][$index] = $_SESSION['currentPlayer'];
            $_SESSION['currentPlayer'] = $_SESSION['currentPlayer'] === 'X' ? 'O' : 'X';
        }
    }

    if (isset($_POST['reset'])) {
        $_SESSION['board'] = array_fill(0, 9, null);
        $_SESSION['currentPlayer'] = 'X';
    }
}

function checkWinner() {
    $winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    foreach ($winPatterns as $pattern) {
        [$a, $b, $c] = $pattern;
        if ($_SESSION['board'][$a] && $_SESSION['board'][$a] === $_SESSION['board'][$b] && $_SESSION['board'][$a] === $_SESSION['board'][$c]) {
            return $_SESSION['board'][$a];
        }
    }
    return null;
}

$response = [
    'board' => $_SESSION['board'],
    'currentPlayer' => $_SESSION['currentPlayer'],
    'winner' => checkWinner()
];

header('Content-Type: application/json');
echo json_encode($response);
?>
