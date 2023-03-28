const squares = document.querySelectorAll('td');
const result = document.querySelector('#result');
const restart = document.querySelector('#restart');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let roundWon = false;


const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleSquareClick(event) {
  const square = event.target;
  const squareIndex = parseInt(square.getAttribute('id'));

  if (board[squareIndex] === '' && gameActive) {
    board[squareIndex] = currentPlayer;
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer);
    checkResult();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if(!roundWon && board.includes('')){
    result.textContent = `Player ${currentPlayer} turn`;

  }
}

function checkResult() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    result.textContent = `Player ${currentPlayer} won!`;
    gameActive = false;
  } else if (!board.includes('')) {
    result.textContent = "It's a tie!";
    gameActive = false;
  }
}

function handleRestartClick() {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  roundWon = false;
  result.textContent = 'Player X turn';
  squares.forEach(square => {
    square.textContent = '';
    square.classList.remove('X', 'O');
  });
}

squares.forEach(square => {
  square.addEventListener('click', handleSquareClick);
});

restart.addEventListener('click', handleRestartClick);
