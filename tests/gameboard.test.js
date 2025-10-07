import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  describe('Constructor and initialization', () => {
    test('should initialize with correct size', () => {
      expect(gameboard.size).toBe(10);
    });

    test('should create empty board', () => {
      expect(gameboard.board).toHaveLength(10);
      expect(gameboard.board[0]).toHaveLength(10);
      expect(gameboard.board[5][5]).toBeNull();
    });

    test('should initialize empty ships array', () => {
      expect(gameboard.ships).toEqual([]);
    });

    test('should initialize empty attackedCoordinates set', () => {
      expect(gameboard.attackedCoordinates.size).toBe(0);
    });
  });

  describe('placeShip', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(3);
    });

    test('should place ship horizontally', () => {
      const result = gameboard.placeShip(ship, [2, 3], 'horizontal');

      expect(result).toBe(true);
      expect(gameboard.board[3][2]).toBe(ship);
      expect(gameboard.board[3][3]).toBe(ship);
      expect(gameboard.board[3][4]).toBe(ship);
      expect(gameboard.ships).toContain(ship);
    });

    test('should place ship vertically', () => {
      const result = gameboard.placeShip(ship, [5, 1], 'vertical');

      expect(result).toBe(true);
      expect(gameboard.board[1][5]).toBe(ship);
      expect(gameboard.board[2][5]).toBe(ship);
      expect(gameboard.board[3][5]).toBe(ship);
      expect(gameboard.ships).toContain(ship);
    });

    test('should throw error when ship goes out of bounds horizontally', () => {
      expect(() => {
        gameboard.placeShip(ship, [8, 5], 'horizontal');
      }).toThrow('Ship placement out of bounds');
    });

    test('should throw error when ship goes out of bounds vertically', () => {
      expect(() => {
        gameboard.placeShip(ship, [5, 8], 'vertical');
      }).toThrow('Ship placement out of bounds');
    });

    test('should throw error when ships collide', () => {
      const ship2 = new Ship(2);

      gameboard.placeShip(ship, [2, 2], 'horizontal');

      expect(() => {
        gameboard.placeShip(ship2, [3, 1], 'vertical');
      }).toThrow('Ship collision detected');
    });
  });

  describe('receiveAttack', () => {
    let ship;

    beforeEach(() => {
      ship = new Ship(2);
      gameboard.placeShip(ship, [3, 4], 'horizontal');
    });

    test('should return hit when attacking ship', () => {
      const result = gameboard.receiveAttack([3, 4]);

      expect(result.hit).toBe(true);
      expect(result.ship).toBe(ship);
      expect(result.sunk).toBe(false);
      expect(result.coordinate).toEqual([3, 4]);
      expect(ship.hits).toBe(1);
    });

    test('should return miss when attacking empty space', () => {
      const result = gameboard.receiveAttack([0, 0]);

      expect(result.hit).toBe(false);
      expect(result.ship).toBeUndefined();
      expect(result.coordinate).toEqual([0, 0]);
    });

    test('should sink ship when all parts are hit', () => {
      gameboard.receiveAttack([3, 4]);
      const result = gameboard.receiveAttack([4, 4]);

      expect(result.hit).toBe(true);
      expect(result.sunk).toBe(true);
      expect(ship.isSunk()).toBe(true);
    });

    test('should throw error when attacking same coordinate twice', () => {
      gameboard.receiveAttack([3, 4]);

      expect(() => {
        gameboard.receiveAttack([3, 4]);
      }).toThrow('Coordinate already attacked');
    });

    test('should throw error when attacking out of bounds', () => {
      expect(() => {
        gameboard.receiveAttack([10, 5]);
      }).toThrow('Attack coordinates out of bounds');

      expect(() => {
        gameboard.receiveAttack([-1, 5]);
      }).toThrow('Attack coordinates out of bounds');
    });
  });

  describe('getMissedAtacks', () => {
    test('should return empty array when no attacks made', () => {
      expect(gameboard.getMissedAttacks()).toEqual([]);
    });

    test('should return missed attacks only', () => {
      const ship = new Ship(2);
      gameboard.placeShip(ship, [3, 3], 'horizontal');

      gameboard.receiveAttack([0, 0]); // miss
      gameboard.receiveAttack([3, 3]); // hit
      gameboard.receiveAttack([1, 1]); // miss

      const missedAttacks = gameboard.getMissedAttacks();
      expect(missedAttacks).toHaveLength(2);
      expect(missedAttacks).toContainEqual([0, 0]);
      expect(missedAttacks).toContainEqual([1, 1]);
    });
  });

  describe('allShipsSunk', () => {
    test('should return true when no ships placed', () => {
      expect(gameboard.allShipsSunk()).toBe(true);
    });

    test('should return false when ships are not sunk', () => {
      const ship = new Ship(2);
      gameboard.placeShip(ship, [3, 3], 'horizontal');

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test('should return false when some ships are sunk', () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(2);

      gameboard.placeShip(ship1, [0, 0], 'horizontal');
      gameboard.placeShip(ship2, [3, 3], 'horizontal');

      gameboard.receiveAttack([0, 0]); // sink ship1

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test('should return true when all ships are sunk', () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(2);

      gameboard.placeShip(ship1, [0, 0], 'horizontal');
      gameboard.placeShip(ship2, [3, 3], 'horizontal');

      // Sink both ships
      gameboard.receiveAttack([0, 0]);
      gameboard.receiveAttack([3, 3]);
      gameboard.receiveAttack([4, 3]);

      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});
