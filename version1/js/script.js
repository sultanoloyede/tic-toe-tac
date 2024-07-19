document.addEventListener("DOMContentLoaded", () => {
  const board = Array(9).fill(null);
  let currentPlayer = "X";
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.createElement("div");
  const resetButton = document.createElement("button");

  resetButton.textContent = "Reset Game";
  document.body.appendChild(statusDisplay);
  document.body.appendChild(resetButton);

  function renderBoard() {
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }

  function handleClick(event) {
    const index = Array.from(cells).indexOf(event.target);
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
    const winner = checkWinner();
    if (winner) {
      statusDisplay.textContent = `${winner} wins!`;
    } else if (!board.includes(null)) {
      statusDisplay.textContent = `It's a tie!`;
    } else {
      statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function resetGame() {
    board.fill(null);
    currentPlayer = "X";
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    renderBoard();
  }

  cells.forEach((cell) => cell.addEventListener("click", handleClick));
  resetButton.addEventListener("click", resetGame);

  renderBoard();
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
});
