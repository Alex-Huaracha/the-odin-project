import Gameboard from './gameboard.js';
import { createDefaultFleet } from './shipConfig.js';

class Player {
  constructor(name, type = 'human') {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
    this.fleet = createDefaultFleet();
    this.isFleetPlaced = false;

    // Properties for smart AI
    this.aiMode = 'hunt'; // 'hunt', 'target', 'destroy'
    this.lastHit = null; // Last coordinate that was a hit
    this.targetQueue = []; // Queue of coordinates to attack
    this.currentDirection = null; // Current direction of the ship
    this.shipStart = null; // Start of the found ship
  }

  placeFleet(shipPlacements) {
    if (this.isFleetPlaced) {
      throw new Error('Fleet already placed');
    }

    if (shipPlacements.length !== this.fleet.length) {
      throw new Error('Must place exactly 5 ships');
    }

    shipPlacements.forEach((placement, index) => {
      const { startCoordinate, orientation } = placement;
      const ship = this.fleet[index];
      this.gameboard.placeShip(ship, startCoordinate, orientation);
    });

    this.isFleetPlaced = true;
  }

  makeAttack(coordinate, enemyGameboard) {
    if (this.type !== 'human') {
      throw new Error('Only human players can make manual attacks');
    }

    return enemyGameboard.receiveAttack(coordinate);
  }

  hasLost() {
    return this.gameboard.allShipsSunk();
  }

  canAttack() {
    return this.isFleetPlaced;
  }

  makeRandomAttack(enemyGameboard) {
    if (this.type !== 'computer') {
      throw new Error('Only computer players can make random attacks');
    }

    let attackCoordinate;

    // Smart AI based on current mode
    if (this.aiMode === 'hunt') {
      attackCoordinate = this._getHuntTarget(enemyGameboard);
    } else if (this.aiMode === 'target') {
      attackCoordinate = this._getTargetCoordinate(enemyGameboard);
    } else if (this.aiMode === 'destroy') {
      attackCoordinate = this._getDestroyCoordinate(enemyGameboard);
    }

    const result = enemyGameboard.receiveAttack(attackCoordinate);
    this._updateAIState(result, attackCoordinate, enemyGameboard);

    return result;
  }

  _getHuntTarget(enemyGameboard) {
    const availableCoordinates = this._getAvailableCoordinates(enemyGameboard);

    // Use checkerboard pattern for efficiency
    const checkerboardTargets = availableCoordinates.filter(
      ([x, y]) => (x + y) % 2 === 0
    );

    if (checkerboardTargets.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * checkerboardTargets.length
      );
      return checkerboardTargets[randomIndex];
    }

    // If no checkerboard targets, use any available
    const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
    return availableCoordinates[randomIndex];
  }

  _getTargetCoordinate(enemyGameboard) {
    if (this.targetQueue.length > 0) {
      return this.targetQueue.shift();
    }

    // If no targets in queue, return to hunt mode
    this.aiMode = 'hunt';
    return this._getHuntTarget(enemyGameboard);
  }

  _getDestroyCoordinate(enemyGameboard) {
    const [x, y] = this.lastHit;
    const [dx, dy] = this.currentDirection;
    const nextCoordinate = [x + dx, y + dy];

    // Check if next coordinate is valid
    if (this._isValidTarget(nextCoordinate, enemyGameboard)) {
      return nextCoordinate;
    }

    // If can't continue in that direction, try the opposite
    const oppositeDirection = [-dx, -dy];
    const [startX, startY] = this.shipStart;
    const oppositeCoordinate = [
      startX + oppositeDirection[0],
      startY + oppositeDirection[1],
    ];

    if (this._isValidTarget(oppositeCoordinate, enemyGameboard)) {
      this.currentDirection = oppositeDirection;
      this.lastHit = this.shipStart;
      return oppositeCoordinate;
    }

    // If can't continue, return to target mode
    this.aiMode = 'target';
    return this._getTargetCoordinate(enemyGameboard);
  }

  _updateAIState(result, attackCoordinate, enemyGameboard) {
    if (result.hit) {
      this.lastHit = attackCoordinate;

      if (result.sunk) {
        // Ship sunk - return to hunt mode
        this._resetAIState();
      } else {
        // Hit but not sunk
        if (this.aiMode === 'hunt') {
          // First hit - switch to target mode
          this.aiMode = 'target';
          this.shipStart = attackCoordinate;
          this._addAdjacentTargets(attackCoordinate, enemyGameboard);
        } else if (this.aiMode === 'target') {
          // Second hit - switch to destroy mode
          this.aiMode = 'destroy';
          this.currentDirection = this._getDirection(
            this.shipStart,
            attackCoordinate
          );
        }
        // If already in destroy mode, continue in that direction
      }
    } else {
      // Miss
      if (this.aiMode === 'destroy') {
        // Change direction or return to target
        const oppositeDirection = [
          -this.currentDirection[0],
          -this.currentDirection[1],
        ];
        const [startX, startY] = this.shipStart;
        const oppositeCoordinate = [
          startX + oppositeDirection[0],
          startY + oppositeDirection[1],
        ];

        if (this._isValidTarget(oppositeCoordinate, enemyGameboard)) {
          this.currentDirection = oppositeDirection;
          this.lastHit = this.shipStart;
        } else {
          this.aiMode = 'target';
        }
      }
    }
  }

  _addAdjacentTargets(coordinate, enemyGameboard) {
    const [x, y] = coordinate;
    const adjacentCoordinates = [
      [x - 1, y], // Left
      [x + 1, y], // Right
      [x, y - 1], // Up
      [x, y + 1], // Down
    ];

    adjacentCoordinates.forEach((coord) => {
      if (this._isValidTarget(coord, enemyGameboard)) {
        this.targetQueue.push(coord);
      }
    });

    // Shuffle the queue to avoid being predictable
    this._shuffleArray(this.targetQueue);
  }

  _isValidTarget(coordinate, enemyGameboard) {
    const [x, y] = coordinate;
    if (
      x < 0 ||
      x >= enemyGameboard.size ||
      y < 0 ||
      y >= enemyGameboard.size
    ) {
      return false;
    }

    const coordKey = `${x},${y}`;
    return !enemyGameboard.attackedCoordinates.has(coordKey);
  }

  // Calculate direction between two points
  _getDirection(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Normalize direction
    if (dx !== 0) return [Math.sign(dx), 0];
    if (dy !== 0) return [0, Math.sign(dy)];
    return [0, 0];
  }

  // Reset AI state
  _resetAIState() {
    this.aiMode = 'hunt';
    this.lastHit = null;
    this.targetQueue = [];
    this.currentDirection = null;
    this.shipStart = null;
  }

  // Shuffle array randomly
  _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  _getAvailableCoordinates(enemyGameboard) {
    const available = [];

    for (let x = 0; x < enemyGameboard.size; x++) {
      for (let y = 0; y < enemyGameboard.size; y++) {
        const coordKey = `${x},${y}`;
        if (!enemyGameboard.attackedCoordinates.has(coordKey)) {
          available.push([x, y]);
        }
      }
    }

    return available;
  }
}

export default Player;
