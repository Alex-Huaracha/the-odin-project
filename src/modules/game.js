import Player from './player.js';

class Game {
  constructor() {
    this.player1 = new Player('Human', 'human');
    this.player2 = new Player('Computer', 'computer');
    this.currentPlayer = this.player1;
    this.gameOver = false;
    this.winner = null;
  }

  startGame() {
    this.setupRandomFleet(this.player2);
    this.gameOver = false;
    this.winner = null;
  }

  startGameplay() {
    if (!this.player1.isFleetPlaced) {
      throw new Error('Human player must place fleet first');
    }
    this.startGame();
  }

  placePlayerShip(shipIndex, startCoordinate, orientation) {
    if (this.player1.isFleetPlaced) {
      throw new Error('Fleet already placed');
    }

    if (shipIndex < 0 || shipIndex >= 5) {
      throw new Error('Invalid ship index');
    }

    this.player1.gameboard.placeShip(
      this.player1.fleet[shipIndex],
      startCoordinate,
      orientation
    );

    if (this.player1.gameboard.ships.length === 5) {
      this.player1.isFleetPlaced = true;
    }
  }

  getNextShipToPlace() {
    const placedShips = this.player1.gameboard.ships.length;
    if (placedShips >= 5) return null;

    return {
      index: placedShips,
      ship: this.player1.fleet[placedShips],
      length: this.player1.fleet[placedShips].length,
    };
  }

  setupRandomFleet(player) {
    const placements = this.generateRandomPlacements();
    player.placeFleet(placements);
  }

  generateRandomPlacements() {
    const placements = [];
    const shipLengths = [5, 4, 3, 3, 2];
    const occupiedPositions = new Set();

    for (const length of shipLengths) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      while (!placed && attempts < maxAttempts) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const startCoordinate = this.getRandomStartCoordinate(
          length,
          orientation
        );
        const shipPositions = this.calculateShipPositions(
          startCoordinate,
          length,
          orientation
        );

        if (this.isValidPlacement(shipPositions, occupiedPositions)) {
          placements.push({
            startCoordinate,
            orientation,
          });

          shipPositions.forEach((pos) => {
            occupiedPositions.add(`${pos[0]},${pos[1]}`);
          });

          placed = true;
        }

        attempts++;
      }

      if (!placed) {
        throw new Error('Could not place all ships randomly');
      }
    }

    return placements;
  }

  getRandomStartCoordinate(shipLength, orientation) {
    let maxX, maxY;

    if (orientation === 'horizontal') {
      maxX = 10 - shipLength;
      maxY = 9;
    } else {
      maxX = 9;
      maxY = 10 - shipLength;
    }

    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));

    return [x, y];
  }

  calculateShipPositions(startCoordinate, length, orientation) {
    const [x, y] = startCoordinate;
    const positions = [];

    for (let i = 0; i < length; i++) {
      if (orientation === 'horizontal') {
        positions.push([x + i, y]);
      } else {
        positions.push([x, y + i]);
      }
    }

    return positions;
  }

  isValidPlacement(shipPositions, occupiedPositions) {
    for (const pos of shipPositions) {
      const posKey = `${pos[0]},${pos[1]}`;
      if (occupiedPositions.has(posKey)) {
        return false;
      }
    }

    for (const [x, y] of shipPositions) {
      if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        return false;
      }
    }

    return true;
  }

  processHumanAttack(coordinate) {
    if (this.gameOver) {
      throw new Error('Game is over');
    }

    if (this.currentPlayer.type !== 'human') {
      throw new Error('Not human player turn');
    }

    const result = this.currentPlayer.makeAttack(
      coordinate,
      this.player2.gameboard
    );
    this.checkGameEnd();

    if (!this.gameOver) {
      this.switchTurn();
    }

    return result;
  }

  processComputerAttack() {
    if (this.gameOver) {
      throw new Error('Game is over');
    }

    if (this.currentPlayer.type !== 'computer') {
      throw new Error('Not computer player turn');
    }

    const result = this.currentPlayer.makeRandomAttack(this.player1.gameboard);
    this.checkGameEnd();

    if (!this.gameOver) {
      this.switchTurn();
    }

    return result;
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  isPlayerTurn() {
    return this.currentPlayer.type === 'human';
  }

  setupPlayerFleetRandomly() {
    if (this.player1.isFleetPlaced) {
      throw new Error('Fleet already placed');
    }

    this.setupRandomFleet(this.player1);
  }

  checkGameEnd() {
    if (this.player1.hasLost()) {
      this.gameOver = true;
      this.winner = this.player2;
    } else if (this.player2.hasLost()) {
      this.gameOver = true;
      this.winner = this.player1;
    }
  }

  getGameState() {
    return {
      gameOver: this.gameOver,
      winner: this.winner,
      currentPlayer: this.currentPlayer,
      player1Board: this.player1.gameboard,
      player2Board: this.player2.gameboard,
    };
  }

  resetGame() {
    this.player1 = new Player('Human', 'human');
    this.player2 = new Player('Computer', 'computer');
    this.currentPlayer = this.player1;
    this.gameOver = false;
    this.winner = null;
  }
}

export default Game;
