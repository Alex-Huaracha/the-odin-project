function Gameboard() {
  let board = new Array(9).fill('');
  console.log(board);

  function getBoard() {
    return board;
  }

  function resetBoard() {
    board.fill('');
  }

  // Sets a marker ('X' or 'O') at the specified index if the cell is empty.
  // Returns true if the marker was set, false otherwise.
  function setMarker(index, marker) {
    return board[index] === '' ? (board[index] = marker) : false;
  }

  /**
   * Converts 2D coordinates (row, col) to a 1D index for the board array.
   * @param {number} row - The row number (0, 1, or 2).
   * @param {number} col - The column number (0, 1, or 2).
   * @returns {number} The corresponding index in the board array.
   */
  function coordsToIndex(row, col) {
    return row * 3 + col;
  }

  /**
   * Converts a 1D index to 2D coordinates (row, col).
   * @param {number} index - The index in the board array (0 to 8).
   * @returns {Array} An array containing the row and column numbers.
   */
  function indexToCoords(index) {
    return [Math.floor(index / 3), index % 3];
  }

  return {
    getBoard,
    resetBoard,
    setMarker,
    coordsToIndex,
    indexToCoords,
    getCell: (index) => board[index],
    isEmpty: (index) => board[index] === '',
  };
}

function Player(name, marker) {
  return { name, marker };
}

function GameController() {
  const gameboard = Gameboard();
  const players = [Player('Player 1', 'X'), Player('Player 2', 'O')];
  let currentPlayerIndex = 0;
  let gameOver = false;
  let winner = null;

  const WINNING_PATTERNS = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  function getCurrentPlayer() {
    return players[currentPlayerIndex];
  }

  function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }

  function checkWin() {
    const board = gameboard.getBoard();

    for (const pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return true;
      }
    }
    return false;
  }

  // Check for a draw (no empty cells left)
  function checkDraw() {
    return gameboard.getBoard().every((cell) => cell !== '');
  }

  function makeMove(row, col) {
    if (gameOver) {
      return {
        success: false,
        message: 'Game is over. Please reset to play again.',
        gameState: getGameState(),
      };
    }

    const index = gameboard.coordsToIndex(row, col);
    const currentPlayer = getCurrentPlayer();

    if (gameboard.setMarker(index, currentPlayer.marker)) {
      if (checkWin()) {
        gameOver = true;
        winner = currentPlayer;
        return {
          success: true,
          message: `${currentPlayer.name} wins!`,
          gameState: getGameState(),
        };
      }

      if (checkDraw()) {
        gameOver = true;
        return {
          success: true,
          message: 'The game is a draw!',
          gameState: getGameState(),
        };
      }

      // No win or draw, continue the game
      switchPlayer();
      return {
        success: true,
        message: 'Move accepted',
        gameState: getGameState(),
      };
    }

    return {
      success: false,
      message: 'Cell already occupied. Try again.',
      gameState: getGameState(),
    };
  }

  function makeMoveByIndex(index) {
    const [row, col] = gameboard.indexToCoords(index);
    return makeMove(row, col);
  }

  function resetGame() {
    gameboard.resetBoard();
    currentPlayerIndex = 0;
    gameOver = false;
    winner = null;
  }

  function getGameState() {
    return {
      board: gameboard.getBoard(),
      currentPlayer: getCurrentPlayer().name,
      currentPlayerMarker: getCurrentPlayer().marker,
      gameOver,
      winner: winner?.name || null,
      availableMoves: gameboard
        .getBoard()
        .map((cell, index) => (cell === '' ? index : null))
        .filter((index) => index !== null),
    };
  }

  function getBestMove() {
    const availableMoves = getGameState().availableMoves;

    if (availableMoves.length === 0) return null;

    const center = 4;
    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];

    if (availableMoves.includes(center)) return center;

    const availableCorners = corners.filter((corner) =>
      availableMoves.includes(corner)
    );
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    const availableEdges = edges.filter((edge) =>
      availableMoves.includes(edge)
    );
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    return availableMoves[0];
  }

  return {
    makeMove,
    makeMoveByIndex,
    resetGame,
    getCurrentPlayer: () => getCurrentPlayer().name,
    isGameOver: () => gameOver,
    getGameState,
    getBestMove,

    makeAIMove: function () {
      const bestMove = getBestMove();
      if (bestMove !== null) {
        return makeMoveByIndex(bestMove);
      }
      return { success: false, message: 'No moves available' };
    },
  };
}

const gameController = GameController();

console.log('=== Basic Game ===');
console.log(gameController.makeMove(0, 0)); // Player 1 moves
console.log(gameController.makeMove(0, 1)); // Player 2 moves
console.log(gameController.makeMove(1, 1)); // Player 1 moves
console.log(gameController.makeMove(0, 2)); // Player 2 moves
console.log(gameController.makeMove(2, 2)); // Player 1 moves and wins

console.log('\n=== Game status ===');
console.log(gameController.getGameState());

console.log('\n=== Reset Game ===');
gameController.resetGame();
console.log('Game over:', gameController.isGameOver());

console.log('\n=== Game vs IA ===');
gameController.makeMove(0, 0); // Player 1
console.log(gameController.makeAIMove()); // AI move
gameController.makeMove(1, 1); // Player 1
console.log(gameController.makeAIMove()); // AI move
