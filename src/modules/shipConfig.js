import Ship from './ship.js';

export const SHIP_TYPES = {
  CARRIER: { name: 'Carrier', length: 5, quantity: 1 },
  BATTLESHIP: { name: 'Battleship', length: 4, quantity: 1 },
  CRUISER: { name: 'Cruiser', length: 3, quantity: 1 },
  SUBMARINE: { name: 'Submarine', length: 3, quantity: 1 },
  DESTROYER: { name: 'Destroyer', length: 2, quantity: 1 },
};

export function createDefaultFleet() {
  const fleet = [];

  Object.values(SHIP_TYPES).forEach((shipType) => {
    for (let i = 0; i < shipType.quantity; i++) {
      fleet.push(new Ship(shipType.length));
    }
  });

  return fleet;
}
