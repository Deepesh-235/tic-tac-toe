const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const modeSelect = document.getElementById("mode-select");
const gameBoard = document.getElementById("game");
const scoreboard = document.getElementById("scoreboard");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame(mode) {
  vsAI = mode === "ai";
  modeSelect.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  resetButton.classList.remove("hidden");
  scoreboard.classList.remove("hidden");
  resetGame();
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || !gameActive) return;

  makeMove(index, currentPlayer);

  if (vsAI && gameActive && currentPlayer === "O") {
    setTimeout(() => {
      const aiMove = getBestMove();
      makeMove(aiMove, "O");
    }, 400);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `Player ${board[a]} wins!`;
      updateScore(board[a]);
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a tie!";
    gameActive = false;
  }
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    scoreXEl.textContent = scoreX;
  } else {
    scoreO++;
    scoreOEl.textContent = scoreO;
  }
}

function resetGame() {
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player X's turn`;
}

function getRandomMove() {
  const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(i => i !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

function getBestMove() {
  return getRandomMove(); // Simple AI
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
