export class DOMManager {
  constructor() {
    this.playerBoardElement = null;
    this.computerBoardElement = null;
    this.gameStatusElement = null;
    this.controlsElement = null;
  }

  // Initialize DOM elements
  initializeDOM() {
    this.playerBoardElement = document.querySelector('[data-player="human"]');
    this.computerBoardElement = document.querySelector(
      '[data-player="computer"]'
    );
    this.gameStatusElement = document.querySelector('.game-status');
    this.controlsElement = document.querySelector('.game-controls');
  }

  // Render a board (10x10 grid)
  renderBoard(boardElement, gameboard, isPlayerBoard = false) {
    if (!boardElement) return;

    boardElement.innerHTML = '';
    boardElement.className = `game-board`;

    for (let y = 0; y < gameboard.size; y++) {
      for (let x = 0; x < gameboard.size; x++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.x = x;
        cell.dataset.y = y;

        // Show ships only on the player's board
        if (isPlayerBoard && gameboard.board[y][x]) {
          cell.classList.add('ship');
        }

        // Show attacks
        const coordinateKey = `${x},${y}`;
        if (gameboard.attackedCoordinates.has(coordinateKey)) {
          if (gameboard.board[y][x]) {
            const ship = gameboard.board[y][x];

            if (ship.isSunk()) {
              cell.classList.add('sunk');
              cell.textContent = '💀';
            } else {
              cell.classList.add('hit');
              cell.textContent = 'x';
            }
          } else {
            cell.classList.add('miss');
            cell.textContent = '●';
          }
        }

        boardElement.appendChild(cell);
      }
    }
  }

  // Update game status
  updateGameStatus(message) {
    if (this.gameStatusElement) {
      this.gameStatusElement.textContent = message;
    }
  }

  // Show info about the current ship to place
  updateShipPlacementInfo(shipInfo) {
    const shipInfoElement = document.getElementById('current-ship-info');
    const placementDiv = document.getElementById('ship-placement-info');

    if (shipInfo) {
      shipInfoElement.textContent = `${
        shipInfo.ship.constructor.name || 'Ship'
      } (Length: ${shipInfo.length})`;
      placementDiv.style.display = 'block';
    } else {
      placementDiv.style.display = 'none';
    }
  }

  // Get selected orientation
  getSelectedOrientation() {
    const orientationRadio = document.querySelector(
      'input[name="orientation"]:checked'
    );
    return orientationRadio ? orientationRadio.value : 'horizontal';
  }

  // Enable/disable buttons using data-attributes
  updateControls(gameState) {
    const startBtn = document.querySelector('[data-action="start"]');
    const randomBtn = document.querySelector('[data-action="random"]');
    const resetBtn = document.querySelector('[data-action="reset"]');

    if (startBtn && randomBtn && resetBtn) {
      if (gameState === 'initial') {
        startBtn.disabled = false;
        randomBtn.disabled = true;
        resetBtn.disabled = true;
      } else if (gameState === 'placing-ships') {
        startBtn.disabled = true;
        randomBtn.disabled = false;
        resetBtn.disabled = false;
      } else if (gameState === 'playing') {
        startBtn.disabled = true;
        randomBtn.disabled = true;
        resetBtn.disabled = false;
      } else if (gameState === 'game-over') {
        startBtn.disabled = true;
        randomBtn.disabled = true;
        resetBtn.disabled = false;
      }
    }
  }

  // Highlight cells where a ship would be placed
  highlightShipPlacement(startX, startY, length, orientation) {
    this.clearHighlights();

    for (let i = 0; i < length; i++) {
      const x = orientation === 'horizontal' ? startX + i : startX;
      const y = orientation === 'vertical' ? startY + i : startY;

      const cell = this.playerBoardElement.querySelector(
        `[data-x="${x}"][data-y="${y}"]`
      );
      if (cell) {
        cell.classList.add('ship-preview');
      }
    }
  }

  // Clear highlights
  clearHighlights() {
    if (this.playerBoardElement) {
      const previewCells =
        this.playerBoardElement.querySelectorAll('.ship-preview');
      previewCells.forEach((cell) => cell.classList.remove('ship-preview'));
    }
  }

  // Show win/lose message
  showGameResult(winner) {
    const message =
      winner.type === 'human'
        ? 'Congratulations! You won!'
        : 'Game Over! Computer wins!';
    this.updateGameStatus(message);

    // Show modal or alert (you can improve this later)
    setTimeout(() => {
      alert(message);
    }, 500);
  }
}
