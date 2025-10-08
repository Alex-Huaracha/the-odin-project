import Gameboard from './gameboard.js';
import { createDefaultFleet } from './shipConfig.js';

class Player {
  constructor(name, type = 'human') {
    this.name = name;
    this.type = type; // 'human' o 'computer'
    this.gameboard = new Gameboard();
    this.fleet = createDefaultFleet();
    this.isFleetPlaced = false;
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

    const availableCoordinates = this._getAvailableCoordinates(enemyGameboard);
    if (availableCoordinates.length === 0) {
      throw new Error('No available coordinates to attack');
    }

    const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
    const attackCoordinate = availableCoordinates[randomIndex];
    return enemyGameboard.receiveAttack(attackCoordinate);
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
