let board = Array(9).fill("");
let gameActive = false;
let currentPlayer = "X";
let gameMode = "pvp"; // default mode

const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function setMode(mode) {
  gameMode = mode;
  resetGame();
}

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    if (cell) div.classList.add(cell);
    div.addEventListener("click", () => handleMove(i));
    gameBoard.appendChild(div);
  });
  if (gameActive) {
    statusText.textContent = `Giliran: ${currentPlayer}`;
  }
}

function handleMove(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  checkWinner();

  if (gameMode === "ai" && gameActive && currentPlayer === "X") {
    renderBoard();
    currentPlayer = "O";
    setTimeout(aiMove, 500);
  } else if (gameMode === "pvp" && gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
  } else {
    renderBoard();
  }
}

function aiMove() {
  const empty = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
  if (empty.length === 0) return;
  const move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = "O";
  checkWinner();
  currentPlayer = "X";
  renderBoard();
}

function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${board[a]} menang! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    statusText.textContent = "Seri! 😐";
    gameActive = false;
  }
}

function resetGame() {
  board = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  renderBoard();
}

setMode("pvp"); // start default in PvP
