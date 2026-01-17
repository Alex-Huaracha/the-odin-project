import Player from '../modules/player.js';
import Gameboard from '../modules/gameboard.js';
import { createDefaultFleet } from '../modules/shipConfig.js';

describe('Player', () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player('Human Player', 'human');
    computer = new Player('Computer', 'computer');
  });

  describe('Constructor and initialization', () => {
    test('should initialize with correct name and type', () => {
      expect(player.name).toBe('Human Player');
      expect(player.type).toBe('human');
      expect(computer.type).toBe('computer');
    });

    test('should default to human type if not specified', () => {
      const defaultPlayer = new Player('Test');
      expect(defaultPlayer.type).toBe('human');
    });

    test('should have own gameboard', () => {
      expect(player.gameboard).toBeInstanceOf(Gameboard);
      expect(computer.gameboard).toBeInstanceOf(Gameboard);
      expect(player.gameboard).not.toBe(computer.gameboard);
    });

    test('should have fleet of 5 ships', () => {
      expect(player.fleet).toHaveLength(5);
      expect(player.fleet[0].length).toBe(5); // Carrier
      expect(player.fleet[1].length).toBe(4); // Battleship
      expect(player.fleet[2].length).toBe(3); // Cruiser
      expect(player.fleet[3].length).toBe(3); // Submarine
      expect(player.fleet[4].length).toBe(2); // Destroyer
    });

    test('should initialize with fleet not placed', () => {
      expect(player.isFleetPlaced).toBe(false);
    });
  });

  describe('placeFleet', () => {
    let shipPlacements;

    beforeEach(() => {
      shipPlacements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' }, // Carrier
        { startCoordinate: [0, 1], orientation: 'horizontal' }, // Battleship
        { startCoordinate: [0, 2], orientation: 'horizontal' }, // Cruiser
        { startCoordinate: [0, 3], orientation: 'horizontal' }, // Submarine
        { startCoordinate: [0, 4], orientation: 'horizontal' }, // Destroyer
      ];
    });

    test('should place all ships correctly', () => {
      player.placeFleet(shipPlacements);

      expect(player.isFleetPlaced).toBe(true);
      expect(player.gameboard.ships).toHaveLength(5);
    });

    test('should throw error if fleet already placed', () => {
      player.placeFleet(shipPlacements);

      expect(() => {
        player.placeFleet(shipPlacements);
      }).toThrow('Fleet already placed');
    });

    test('should throw error if not exactly 5 ships', () => {
      const invalidPlacements = shipPlacements.slice(0, 3); // Only 3 ships

      expect(() => {
        player.placeFleet(invalidPlacements);
      }).toThrow('Must place exactly 5 ships');
    });

    test('should place ships at correct coordinates', () => {
      player.placeFleet(shipPlacements);

      // Check carrier (length 5) at [0,0] horizontal
      expect(player.gameboard.board[0][0]).toBe(player.fleet[0]);
      expect(player.gameboard.board[0][4]).toBe(player.fleet[0]);

      // Check battleship (length 4) at [0,1] horizontal
      expect(player.gameboard.board[1][0]).toBe(player.fleet[1]);
      expect(player.gameboard.board[1][3]).toBe(player.fleet[1]);
    });
  });

  describe('makeAttack', () => {
    let enemyPlayer;

    beforeEach(() => {
      enemyPlayer = new Player('Enemy', 'human');

      const enemyPlacements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' },
        { startCoordinate: [0, 1], orientation: 'horizontal' },
        { startCoordinate: [0, 2], orientation: 'horizontal' },
        { startCoordinate: [0, 3], orientation: 'horizontal' },
        { startCoordinate: [0, 4], orientation: 'horizontal' },
      ];
      enemyPlayer.placeFleet(enemyPlacements);
    });

    test('should allow human player to make attack', () => {
      const result = player.makeAttack([0, 0], enemyPlayer.gameboard);

      expect(result.hit).toBe(true);
      expect(result.coordinate).toEqual([0, 0]);
    });

    test('should throw error if computer tries to make manual attack', () => {
      expect(() => {
        computer.makeAttack([0, 0], enemyPlayer.gameboard);
      }).toThrow('Only human players can make manual attacks');
    });

    test('should return attack result from enemy gameboard', () => {
      const result = player.makeAttack([5, 5], enemyPlayer.gameboard); // Empty space

      expect(result.hit).toBe(false);
      expect(result.coordinate).toEqual([5, 5]);
    });
  });

  describe('makeRandomAttack', () => {
    let enemyPlayer;

    beforeEach(() => {
      enemyPlayer = new Player('Enemy', 'human');

      const enemyPlacements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' },
        { startCoordinate: [0, 1], orientation: 'horizontal' },
        { startCoordinate: [0, 2], orientation: 'horizontal' },
        { startCoordinate: [0, 3], orientation: 'horizontal' },
        { startCoordinate: [0, 4], orientation: 'horizontal' },
      ];
      enemyPlayer.placeFleet(enemyPlacements);
    });

    test('should allow computer to make random attack', () => {
      const result = computer.makeRandomAttack(enemyPlayer.gameboard);

      expect(result).toHaveProperty('hit');
      expect(result).toHaveProperty('coordinate');
      expect(Array.isArray(result.coordinate)).toBe(true);
    });

    test('should throw error if human tries to make random attack', () => {
      expect(() => {
        player.makeRandomAttack(enemyPlayer.gameboard);
      }).toThrow('Only computer players can make random attacks');
    });

    test('should not attack same coordinate twice', () => {
      const firstAttack = computer.makeRandomAttack(enemyPlayer.gameboard);
      const secondAttack = computer.makeRandomAttack(enemyPlayer.gameboard);

      expect(firstAttack.coordinate).not.toEqual(secondAttack.coordinate);
    });

    test('should throw error when no available coordinates', () => {
      // Attack all coordinates to fill the board
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          try {
            enemyPlayer.gameboard.receiveAttack([x, y]);
          } catch (error) {
            // Ignore already attacked coordinates
          }
        }
      }

      expect(() => {
        computer.makeRandomAttack(enemyPlayer.gameboard);
      }).toThrow('No available coordinates to attack');
    });
  });

  describe('hasLost', () => {
    test('should return false when ships are not sunk', () => {
      const placements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' },
        { startCoordinate: [0, 1], orientation: 'horizontal' },
        { startCoordinate: [0, 2], orientation: 'horizontal' },
        { startCoordinate: [0, 3], orientation: 'horizontal' },
        { startCoordinate: [0, 4], orientation: 'horizontal' },
      ];
      player.placeFleet(placements);

      expect(player.hasLost()).toBe(false);
    });

    test('should return true when all ships are sunk', () => {
      const placements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' },
        { startCoordinate: [0, 1], orientation: 'horizontal' },
        { startCoordinate: [0, 2], orientation: 'horizontal' },
        { startCoordinate: [0, 3], orientation: 'horizontal' },
        { startCoordinate: [0, 4], orientation: 'horizontal' },
      ];
      player.placeFleet(placements);

      // Sink all ships
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          try {
            player.gameboard.receiveAttack([x, y]);
          } catch (error) {
            // Ignore out of bounds for shorter ships
          }
        }
      }

      expect(player.hasLost()).toBe(true);
    });
  });

  describe('canAttack', () => {
    test('should return false when fleet not placed', () => {
      expect(player.canAttack()).toBe(false);
    });

    test('should return true when fleet is placed', () => {
      const placements = [
        { startCoordinate: [0, 0], orientation: 'horizontal' },
        { startCoordinate: [0, 1], orientation: 'horizontal' },
        { startCoordinate: [0, 2], orientation: 'horizontal' },
        { startCoordinate: [0, 3], orientation: 'horizontal' },
        { startCoordinate: [0, 4], orientation: 'horizontal' },
      ];
      player.placeFleet(placements);

      expect(player.canAttack()).toBe(true);
    });
  });

  describe('_getAvailableCoordinates', () => {
    let enemyPlayer;

    beforeEach(() => {
      enemyPlayer = new Player('Enemy', 'human');
    });

    test('should return all coordinates when no attacks made', () => {
      const available = computer._getAvailableCoordinates(
        enemyPlayer.gameboard
      );

      expect(available).toHaveLength(100); // 10x10 board
      expect(available).toContainEqual([0, 0]);
      expect(available).toContainEqual([9, 9]);
    });

    test('should exclude attacked coordinates', () => {
      enemyPlayer.gameboard.receiveAttack([0, 0]);
      enemyPlayer.gameboard.receiveAttack([5, 5]);

      const available = computer._getAvailableCoordinates(
        enemyPlayer.gameboard
      );

      expect(available).toHaveLength(98);
      expect(available).not.toContainEqual([0, 0]);
      expect(available).not.toContainEqual([5, 5]);
    });
  });
});
