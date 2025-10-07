import Ship from '../src/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3); // Create a ship of length 3
  });

  test('should initialize with correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('should initialize with zero hits', () => {
    expect(ship.hits).toBe(0);
  });

  test('hit() should increase hits by 1', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() should return false when hits are less than length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() should return true when hits equal length', () => {
    for (let i = 0; i < ship.length; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
  // ...existing code...

  test('isSunk() should return true when hits exceed length', () => {
    for (let i = 0; i < ship.length + 2; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
