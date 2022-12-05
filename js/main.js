let board = document.querySelector(".board");
let cells = document.querySelectorAll(".cell");
let winnigContainer = document.querySelector(".winning-msg");
let winningMsgText = winnigContainer.querySelector(".win-msg-text");
let restartBtn = document.querySelector(".restart");
let xClass = "x";
let oClass = "o";
let oTurn;

let activeClass;
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

playGame();

restartBtn.addEventListener("click", function () {
  playGame();
});

function handleClick(e) {
  let cell = e.target;
  activeClass = oTurn ? oClass : xClass;
  cell.classList.add(activeClass);
  swapTurn();
  setBoardHover();
  if (isWin(activeClass)) {
    winnigContainer.classList.add("show");
    winningMsgText.innerText = `${activeClass} wins!`;
  } else if (isDraw()) {
    winnigContainer.classList.add("show");
    winningMsgText.innerText = "Draw!";
  }
}

function playGame() {
  winnigContainer.classList.remove("show");
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.removeEventListener("click", handleClick);
  });
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  oTurn = false;
  board.classList.remove(xClass, oClass);
  board.classList.toggle(xClass);
}

function swapTurn() {
  oTurn = !oTurn;
}

function setBoardHover() {
  if (!oTurn) {
    board.classList.remove(oClass);
    board.classList.add(xClass);
  } else {
    board.classList.remove(xClass);
    board.classList.add(oClass);
  }
}

function isWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}
