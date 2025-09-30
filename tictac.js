let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    draw: 0
};

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

const cells = document.querySelectorAll('.cell');
const currentPlayerElement = document.getElementById('currentPlayer');
const winnerMessageElement = document.getElementById('winnerMessage');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');

// Initialize the game
function initGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
    updateDisplay();
}

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    // Make the move
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    cells[index].disabled = true;

    // Check for winner
    if (checkWinner()) {
        gameActive = false;
        highlightWinningCells();
        scores[currentPlayer]++;
        winnerMessageElement.textContent = `🎉 Player ${currentPlayer} wins!`;
        winnerMessageElement.classList.add('show');
        updateScore();
        return;
    }

    // Check for draw
    if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        scores.draw++;
        winnerMessageElement.textContent = "🤝 It's a draw!";
        winnerMessageElement.classList.add('show');
        updateScore();
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerElement.textContent = currentPlayer;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winning-cells');
            cells[b].classList.add('winning-cells');
            cells[c].classList.add('winning-cells');
        }
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o', 'winning-cells');
    });

    winnerMessageElement.textContent = '';
    winnerMessageElement.classList.remove('show');
    currentPlayerElement.textContent = currentPlayer;
}

function resetScore() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScore();
    resetGame();
}

function updateScore() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
    scoreDrawElement.textContent = scores.draw;
}

function updateDisplay() {
    currentPlayerElement.textContent = currentPlayer;
    updateScore();
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);