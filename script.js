const cells = document.querySelectorAll("[data-cell]");
const currentPlayerElement = document.getElementById("currentPlayer");
const gameStatusElement = document.getElementById("gameStatus");
let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  placeMark(cell, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentPlayer) {
  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;
}

function swapTurns() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin(currentPlayer) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer.toLowerCase());
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function endGame(draw) {
  if (draw) {
    gameStatusElement.textContent = "Draw!";
    saveGameResult("Draw");
  } else {
    gameStatusElement.textContent = `${currentPlayer} Wins!`;
    saveGameResult(currentPlayer);
  }
}

function saveGameResult(result) {
  fetch("save_result.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `result=${result}`,
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
