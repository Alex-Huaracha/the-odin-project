import './styles.css';
import Game from './modules/game.js';
import { DOMManager } from './dom.js';

class BattleshipApp {
  constructor() {
    this.game = new Game();
    this.domManager = new DOMManager();
    this.gameState = 'initial';
    this.isPlacingShips = false;
  }

  initialize() {
    this.domManager.initializeDOM();
    this.setupEventListeners();
    this.updateUI();
  }

  setupEventListeners() {
    // Event delegation con data-attributes (moderno)
    document.addEventListener('click', (e) => {
      const action = e.target.dataset.action;

      if (action === 'start') this.startGame();
      if (action === 'random') this.setupRandomPlacement();
      if (action === 'reset') this.resetGame();
    });

    // Event listener para cambio de orientación
    document.addEventListener('change', (e) => {
      if (e.target.name === 'orientation') {
        this.updateShipPreview();
      }
    });

    // Click en tableros usando data-attributes
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('board-cell')) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        const playerType = e.target.closest('[data-player]').dataset.player;

        if (playerType === 'human' && this.isPlacingShips) {
          this.placePlayerShip(x, y);
        } else if (
          playerType === 'computer' &&
          this.gameState === 'playing' &&
          this.game.isPlayerTurn()
        ) {
          this.playerAttack(x, y);
        }
      }
    });
  }

  startGame() {
    this.game.startGame();
    this.gameState = 'placing-ships';
    this.isPlacingShips = true;

    this.domManager.updateGameStatus('Place your ships on the board');
    this.updateUI();
    this.setupShipPlacement();
  }

  setupShipPlacement() {
    const nextShip = this.game.getNextShipToPlace();
    if (nextShip) {
      this.domManager.updateShipPlacementInfo(nextShip);
      this.setupShipHoverEffect(nextShip.length); // ✅ CORREGIDO
    }
  }

  setupShipHoverEffect(shipLength) {
    const playerBoard = document.querySelector('[data-player="human"]');

    if (this.mouseoverHandler) {
      playerBoard.removeEventListener('mouseover', this.mouseoverHandler);
      playerBoard.removeEventListener('mouseleave', this.mouseleaveHandler);
    }

    this.mouseoverHandler = (e) => {
      if (e.target.classList.contains('board-cell')) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        const orientation = this.domManager.getSelectedOrientation();
        this.domManager.highlightShipPlacement(x, y, shipLength, orientation);
      }
    };

    this.mouseleaveHandler = () => {
      this.domManager.clearHighlights();
    };

    playerBoard.addEventListener('mouseover', this.mouseoverHandler);
    playerBoard.addEventListener('mouseleave', this.mouseleaveHandler);
  }

  placePlayerShip(x, y) {
    try {
      const nextShip = this.game.getNextShipToPlace();
      if (!nextShip) return;

      const orientation = this.domManager.getSelectedOrientation();
      this.game.placePlayerShip(nextShip.index, [x, y], orientation);

      this.domManager.renderBoard(
        document.querySelector('[data-player="human"]'),
        this.game.player1.gameboard,
        true
      );

      if (this.game.player1.isFleetPlaced) {
        this.finishShipPlacement();
      } else {
        this.setupShipPlacement();
      }
    } catch (error) {
      this.domManager.updateGameStatus(`Error: ${error.message}`);
    }
  }

  finishShipPlacement() {
    this.isPlacingShips = false;
    this.gameState = 'playing';

    this.game.startGameplay();
    this.domManager.updateGameStatus(
      'Battle begins! Click on enemy board to attack'
    );
    this.domManager.updateShipPlacementInfo(null);
    this.updateUI();
  }

  setupRandomPlacement() {
    try {
      this.game.setupPlayerFleetRandomly();
      this.domManager.renderBoard(
        document.querySelector('[data-player="human"]'),
        this.game.player1.gameboard,
        true
      );
      this.finishShipPlacement();
    } catch (error) {
      this.domManager.updateGameStatus(`Error: ${error.message}`);
    }
  }

  playerAttack(x, y) {
    try {
      const result = this.game.processHumanAttack([x, y]);

      this.domManager.renderBoard(
        document.querySelector('[data-player="computer"]'),
        this.game.player2.gameboard,
        false
      );

      if (result.hit) {
        this.domManager.updateGameStatus(
          result.sunk ? 'Hit! Enemy ship sunk!' : 'Hit!'
        );
      } else {
        this.domManager.updateGameStatus('Miss!');
      }

      if (this.game.gameOver) {
        this.endGame();
      } else {
        setTimeout(() => this.computerAttack(), 1000);
      }
    } catch (error) {
      this.domManager.updateGameStatus(`Error: ${error.message}`);
    }
  }

  computerAttack() {
    try {
      const result = this.game.processComputerAttack();

      this.domManager.renderBoard(
        document.querySelector('[data-player="human"]'),
        this.game.player1.gameboard,
        true
      );

      if (result.hit) {
        this.domManager.updateGameStatus(
          result.sunk
            ? 'Computer hit! Your ship was sunk!'
            : 'Computer hit your ship!'
        );
      } else {
        this.domManager.updateGameStatus('Computer missed! Your turn.');
      }

      if (this.game.gameOver) {
        this.endGame();
      }
    } catch (error) {
      this.domManager.updateGameStatus(`Error: ${error.message}`);
    }
  }

  endGame() {
    this.gameState = 'game-over';
    this.domManager.showGameResult(this.game.winner);
    this.updateUI();
  }

  resetGame() {
    this.game.resetGame();
    this.gameState = 'initial';
    this.isPlacingShips = false;

    this.domManager.renderBoard(
      document.querySelector('[data-player="human"]'),
      this.game.player1.gameboard,
      true
    );
    this.domManager.renderBoard(
      document.querySelector('[data-player="computer"]'),
      this.game.player2.gameboard,
      false
    );

    this.domManager.updateGameStatus('Click "Start Game" to begin');
    this.domManager.updateShipPlacementInfo(null);
    this.updateUI();
  }

  updateUI() {
    this.domManager.updateControls(this.gameState);

    this.domManager.renderBoard(
      document.querySelector('[data-player="human"]'),
      this.game.player1.gameboard,
      true
    );
    this.domManager.renderBoard(
      document.querySelector('[data-player="computer"]'),
      this.game.player2.gameboard,
      false
    );
  }

  updateShipPreview() {
    if (this.isPlacingShips) {
      this.domManager.clearHighlights();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new BattleshipApp();
  app.initialize();
});
