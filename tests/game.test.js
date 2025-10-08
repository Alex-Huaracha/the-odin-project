import Game from '../src/game.js';
import Player from '../src/player.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('Constructor and initialization', () => {
    test('should initialize with two players', () => {
      expect(game.player1).toBeInstanceOf(Player);
      expect(game.player2).toBeInstanceOf(Player);
      expect(game.player1.type).toBe('human');
      expect(game.player2.type).toBe('computer');
    });

    test('should initialize with human player as current player', () => {
      expect(game.currentPlayer).toBe(game.player1);
    });

    test('should initialize game as not over', () => {
      expect(game.gameOver).toBe(false);
      expect(game.winner).toBe(null);
    });
  });

  describe('startGame', () => {
    test('should place computer fleet randomly', () => {
      game.startGame();

      expect(game.player2.isFleetPlaced).toBe(true);
      expect(game.player2.gameboard.ships).toHaveLength(5);
    });

    test('should reset game state', () => {
      game.gameOver = true;
      game.winner = game.player1;

      game.startGame();

      expect(game.gameOver).toBe(false);
      expect(game.winner).toBe(null);
    });
  });

  describe('placePlayerShip', () => {
    test('should place ship for human player', () => {
      const result = game.placePlayerShip(0, [0, 0], 'horizontal');

      expect(game.player1.gameboard.ships).toHaveLength(1);
      expect(game.player1.gameboard.board[0][0]).toBe(game.player1.fleet[0]);
    });

    test('should throw error if fleet already placed', () => {
      // Place all ships
      for (let i = 0; i < 5; i++) {
        game.placePlayerShip(i, [0, i * 2], 'horizontal');
      }

      expect(() => {
        game.placePlayerShip(0, [5, 5], 'horizontal');
      }).toThrow('Fleet already placed');
    });

    test('should throw error for invalid ship index', () => {
      expect(() => {
        game.placePlayerShip(-1, [0, 0], 'horizontal');
      }).toThrow('Invalid ship index');

      expect(() => {
        game.placePlayerShip(5, [0, 0], 'horizontal');
      }).toThrow('Invalid ship index');
    });

    test('should mark fleet as placed when all 5 ships are placed', () => {
      expect(game.player1.isFleetPlaced).toBe(false);

      // Place all 5 ships
      for (let i = 0; i < 5; i++) {
        game.placePlayerShip(i, [0, i * 2], 'horizontal');
      }

      expect(game.player1.isFleetPlaced).toBe(true);
    });
  });

  describe('getNextShipToPlace', () => {
    test('should return first ship when no ships placed', () => {
      const nextShip = game.getNextShipToPlace();

      expect(nextShip.index).toBe(0);
      expect(nextShip.ship).toBe(game.player1.fleet[0]);
      expect(nextShip.length).toBe(5); // Carrier
    });

    test('should return correct next ship after placing some ships', () => {
      game.placePlayerShip(0, [0, 0], 'horizontal');
      game.placePlayerShip(1, [0, 2], 'horizontal');

      const nextShip = game.getNextShipToPlace();

      expect(nextShip.index).toBe(2);
      expect(nextShip.ship).toBe(game.player1.fleet[2]);
      expect(nextShip.length).toBe(3); // Cruiser
    });

    test('should return null when all ships are placed', () => {
      // Place all 5 ships
      for (let i = 0; i < 5; i++) {
        game.placePlayerShip(i, [0, i * 2], 'horizontal');
      }

      const nextShip = game.getNextShipToPlace();
      expect(nextShip).toBe(null);
    });
  });

  describe('setupPlayerFleetRandomly', () => {
    test('should place human player fleet randomly', () => {
      game.setupPlayerFleetRandomly();

      expect(game.player1.isFleetPlaced).toBe(true);
      expect(game.player1.gameboard.ships).toHaveLength(5);
    });

    test('should throw error if fleet already placed', () => {
      game.setupPlayerFleetRandomly();

      expect(() => {
        game.setupPlayerFleetRandomly();
      }).toThrow('Fleet already placed');
    });
  });

  describe('startGameplay', () => {
    test('should start gameplay when human fleet is placed', () => {
      game.setupPlayerFleetRandomly();
      game.startGameplay();

      expect(game.player1.isFleetPlaced).toBe(true);
      expect(game.player2.isFleetPlaced).toBe(true);
      expect(game.gameOver).toBe(false);
    });

    test('should throw error if human fleet not placed', () => {
      expect(() => {
        game.startGameplay();
      }).toThrow('Human player must place fleet first');
    });
  });

  describe('processHumanAttack', () => {
    beforeEach(() => {
      game.setupPlayerFleetRandomly();
      game.startGameplay();
    });

    test('should process human attack successfully', () => {
      const result = game.processHumanAttack([5, 5]);

      expect(result).toHaveProperty('hit');
      expect(result).toHaveProperty('coordinate');
      expect(result.coordinate).toEqual([5, 5]);
    });

    test('should switch turn after human attack', () => {
      expect(game.currentPlayer).toBe(game.player1);

      game.processHumanAttack([5, 5]);

      expect(game.currentPlayer).toBe(game.player2);
    });

    test('should throw error when game is over', () => {
      game.gameOver = true;

      expect(() => {
        game.processHumanAttack([5, 5]);
      }).toThrow('Game is over');
    });

    test('should throw error when not human turn', () => {
      game.currentPlayer = game.player2;

      expect(() => {
        game.processHumanAttack([5, 5]);
      }).toThrow('Not human player turn');
    });
  });

  describe('processComputerAttack', () => {
    beforeEach(() => {
      game.setupPlayerFleetRandomly();
      game.startGameplay();
      game.currentPlayer = game.player2; // Set to computer turn
    });

    test('should process computer attack successfully', () => {
      const result = game.processComputerAttack();

      expect(result).toHaveProperty('hit');
      expect(result).toHaveProperty('coordinate');
      expect(Array.isArray(result.coordinate)).toBe(true);
    });

    test('should switch turn after computer attack', () => {
      expect(game.currentPlayer).toBe(game.player2);

      game.processComputerAttack();

      expect(game.currentPlayer).toBe(game.player1);
    });

    test('should throw error when game is over', () => {
      game.gameOver = true;

      expect(() => {
        game.processComputerAttack();
      }).toThrow('Game is over');
    });

    test('should throw error when not computer turn', () => {
      game.currentPlayer = game.player1;

      expect(() => {
        game.processComputerAttack();
      }).toThrow('Not computer player turn');
    });
  });

  describe('switchTurn', () => {
    test('should switch from human to computer', () => {
      expect(game.currentPlayer).toBe(game.player1);

      game.switchTurn();

      expect(game.currentPlayer).toBe(game.player2);
    });

    test('should switch from computer to human', () => {
      game.currentPlayer = game.player2;

      game.switchTurn();

      expect(game.currentPlayer).toBe(game.player1);
    });
  });

  describe('isPlayerTurn', () => {
    test('should return true when human player turn', () => {
      expect(game.isPlayerTurn()).toBe(true);
    });

    test('should return false when computer player turn', () => {
      game.currentPlayer = game.player2;

      expect(game.isPlayerTurn()).toBe(false);
    });
  });

  describe('checkGameEnd', () => {
    beforeEach(() => {
      game.setupPlayerFleetRandomly();
      game.startGameplay();
    });

    test('should end game when player1 loses', () => {
      // Sink all player1 ships
      game.player1.gameboard.ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i++) {
          ship.hit();
        }
      });

      game.checkGameEnd();

      expect(game.gameOver).toBe(true);
      expect(game.winner).toBe(game.player2);
    });

    test('should end game when player2 loses', () => {
      // Sink all player2 ships
      game.player2.gameboard.ships.forEach((ship) => {
        for (let i = 0; i < ship.length; i++) {
          ship.hit();
        }
      });

      game.checkGameEnd();

      expect(game.gameOver).toBe(true);
      expect(game.winner).toBe(game.player1);
    });

    test('should not end game when no player has lost', () => {
      game.checkGameEnd();

      expect(game.gameOver).toBe(false);
      expect(game.winner).toBe(null);
    });
  });

  describe('getGameState', () => {
    test('should return current game state', () => {
      const state = game.getGameState();

      expect(state).toHaveProperty('gameOver');
      expect(state).toHaveProperty('winner');
      expect(state).toHaveProperty('currentPlayer');
      expect(state).toHaveProperty('player1Board');
      expect(state).toHaveProperty('player2Board');

      expect(state.gameOver).toBe(false);
      expect(state.winner).toBe(null);
      expect(state.currentPlayer).toBe(game.player1);
      expect(state.player1Board).toBe(game.player1.gameboard);
      expect(state.player2Board).toBe(game.player2.gameboard);
    });
  });

  describe('resetGame', () => {
    test('should reset all game properties', () => {
      // Modify game state
      game.setupPlayerFleetRandomly();
      game.startGameplay();
      game.gameOver = true;
      game.winner = game.player1;
      game.currentPlayer = game.player2;

      game.resetGame();

      expect(game.player1).toBeInstanceOf(Player);
      expect(game.player2).toBeInstanceOf(Player);
      expect(game.currentPlayer).toBe(game.player1);
      expect(game.gameOver).toBe(false);
      expect(game.winner).toBe(null);
      expect(game.player1.isFleetPlaced).toBe(false);
      expect(game.player2.isFleetPlaced).toBe(false);
    });
  });

  describe('generateRandomPlacements', () => {
    test('should generate 5 ship placements', () => {
      const placements = game.generateRandomPlacements();

      expect(placements).toHaveLength(5);
      expect(placements[0]).toHaveProperty('startCoordinate');
      expect(placements[0]).toHaveProperty('orientation');
    });

    test('should generate valid placements within board bounds', () => {
      const placements = game.generateRandomPlacements();

      placements.forEach((placement) => {
        const [x, y] = placement.startCoordinate;
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
        expect(['horizontal', 'vertical']).toContain(placement.orientation);
      });
    });
  });
});
