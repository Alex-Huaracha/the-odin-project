class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.createEmptyBoard();
    this.ships = [];
    this.attackedCoordinates = new Set();
  }

  createEmptyBoard() {
    return Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => null)
    );
  }

  _isValidCoordinate(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  _validatePlacement(coordinates) {
    if (coordinates.some(([x, y]) => !this._isValidCoordinate(x, y))) {
      throw new Error('Ship placement out of bounds');
    }

    if (coordinates.some(([x, y]) => this.board[y][x] !== null)) {
      throw new Error('Ship collision detected');
    }
  }

  _placeShipOnBoard(ship, coordinates) {
    coordinates.forEach(([x, y]) => {
      this.board[y][x] = ship;
    });
    this.ships.push(ship);
  }

  placeShip(ship, startCoordinate, orientation) {
    const [x, y] = startCoordinate;

    const coordinates = Array.from({ length: ship.length }, (_, i) =>
      orientation === 'horizontal' ? [x + i, y] : [x, y + i]
    );

    this._validatePlacement(coordinates);
    this._placeShipOnBoard(ship, coordinates);
    return true;
  }

  receiveAttack(coordinate) {
    const [x, y] = coordinate;
    const coordinateKey = `${x},${y}`;

    if (!this._isValidCoordinate(x, y)) {
      throw new Error('Attack coordinates out of bounds');
    }

    if (this.attackedCoordinates.has(coordinateKey)) {
      throw new Error('Coordinate already attacked');
    }

    this.attackedCoordinates.add(coordinateKey);

    const ship = this.board[y][x];

    if (ship) {
      ship.hit();
      return {
        hit: true,
        ship: ship,
        sunk: ship.isSunk(),
        coordinate: [x, y],
      };
    } else {
      return {
        hit: false,
        coordinate: [x, y],
      };
    }
  }

  getMissedAttacks() {
    return Array.from(this.attackedCoordinates)
      .filter((coordKey) => {
        const [x, y] = coordKey.split(',').map(Number);
        return this.board[y][x] === null;
      })
      .map((coordKey) => coordKey.split(',').map(Number));
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
