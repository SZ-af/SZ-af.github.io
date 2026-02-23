/**********************************************
 * File: app.js
 * Description: A simple Tic-Tac-Toe game
 * Author: [Sophia Zhang]
 **********************************************/

// Select the status display element from the DOM.
// We'll use this to display messages to the user.
const statusDisplay = document.querySelector(".game--status");

// Set initial game state values
let gameActive = true; // This keeps track of whether the game is active or has ended
let currentPlayer = "X"; // This tracks whose turn it currently is
let gameState = ["", "", "", "", "", "", "", "", ""]; // Represents the 9 cells in the game board
let playerXScore = 0; // Score for Player X
let playerOScore = 0; // Score for Player O

// A function to return the current player's turn message
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// A function to keep track of score for the players
const XScoreboard = document.querySelector('#playerXScore');
const OScoreboard = document.querySelector('#playerOScore');

// Display the initial status message in the DOM
statusDisplay.innerHTML = currentPlayerTurn();

// Define the possible winning conditions for Tic-Tac-Toe
// Each array within this array represents a set of indices in 'gameState'
// that forms a winning line
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6] // Diagonal from top-right to bottom-left
];

/**
 * handleCellPlayed
 * ----------------
 * Updates the gameState array and the clicked cell with the current player's symbol.
 * @param {HTMLElement} clickedCell - The cell that was clicked in the UI.
 * @param {number} clickedCellIndex - The index of the clicked cell in the gameState.
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Update the game state to reflect the move
  // Display the current player's symbol in the clicked cell
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

/**
 * handlePlayerChange
 * ------------------
 * Switches the active player from X to O or O to X.
 * Also updates the UI text to notify whose turn it is.
 */
function handlePlayerChange() {
  // Toggle the current player
  // Update the status text to reflect the new player's turn
  if (currentPlayer === "X") {
    currentPlayer = "O";
  }
  else {
    currentPlayer = "X";
  }
  statusDisplay.innerHTML = currentPlayerTurn();
}

/**
 * handleResultValidation
 * ----------------------
 * Checks if the current move caused a win or a draw.
 * If a win, display a win message and end the game.
 * If a draw, display a draw message and end the game.
 * Otherwise, switch players.
 */
function handleResultValidation() {
  let roundWon = false;

  // Iterate through each winning condition
  for (let i =0; i <= 7; i++) {
    const winCondition = winningConditions[i];
  // Destructure the three cell indices that form a potential win
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
  // If any cell is empty, skip this iteration
    if (a === "" || b === "" || c === "") {
        continue;
    }
  // Check if these three positions match, indicating a win
    if (a === b && b === c) {
        roundWon = true;
        break;
    }
}
  // If the round is won, display the winner and end the game
    if (roundWon) {
        statusDisplay.innerHTML = 'Player ' + currentPlayer + ' has won!';
        gameActive = false;
        //Update the score for the winning player
        if (currentPlayer === "X") {
            playerXScore++;
            XScoreboard.innerHTML = playerXScore;
        }
        else {
            playerOScore++;
            OScoreboard.innerHTML = playerOScore;
        }
        return;
    }
  // If there are no empty cells in 'gameState', it's a draw
  if (!gameState.includes("")) {
    statusDisplay.innerHTML = "Game ended in a draw!";
    gameActive = false;
    return;
  }
  // If the game is neither won nor drawn, switch to the next player
  handlePlayerChange();
}

/**
 * handleCellClick
 * ---------------
 * This function is triggered whenever a cell in the board is clicked.
 * It determines which cell was clicked, checks if that cell is already used
 * or if the game is inactive, and if valid, calls the functions to update the game state.
 * @param {Event} clickedCellEvent - The click event on one of the cells.
 */
function handleCellClick(clickedCellEvent) {
  // The clicked cell element
  const clickedCell = clickedCellEvent.target;
  // The index of the cell based on its data attribute
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
  // If the cell is already filled or the game is not active, don't do anything
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
  // Otherwise, handle the cell being played and validate results
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

/**
 * handleRestartGame
 * -----------------
 * Resets the game to its initial state:
 *  - Clears the board
 *  - Resets the 'gameState' array
 *  - Reactivates the game
 *  - Sets the current player to X
 *  - Updates the status display
 */
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();

  // Clear each cell in the UI
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add event listeners to each cell for a click event
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// Add event listener to the restart button
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);