document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.createElement("div");
  const resetButton = document.createElement("button");

  resetButton.textContent = "Reset Game";
  document.body.appendChild(statusDisplay);
  document.body.appendChild(resetButton);

  async function fetchGameState() {
    const response = await fetch("api/game.php");
    const gameState = await response.json();
    updateUI(gameState);
  }

  async function handleClick(event) {
    const index = Array.from(cells).indexOf(event.target);
    await fetch("api/game.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `index=${index}`,
    });
    fetchGameState();
  }

  async function resetGame() {
    await fetch("api/game.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "reset=true",
    });
    fetchGameState();
  }

  function updateUI(gameState) {
    gameState.board.forEach((value, index) => {
      cells[index].textContent = value;
    });
    if (gameState.winner) {
      statusDisplay.textContent = `${gameState.winner} wins!`;
    } else if (!gameState.board.includes(null)) {
      statusDisplay.textContent = `It's a tie!`;
    } else {
      statusDisplay.textContent = `Current Player: ${gameState.currentPlayer}`;
    }
  }

  cells.forEach((cell) => cell.addEventListener("click", handleClick));
  resetButton.addEventListener("click", resetGame);

  fetchGameState();
});
