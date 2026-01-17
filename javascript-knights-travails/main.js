import { knightMoves } from './knightMoves.js';

function printPath(start, end) {
  const path = knightMoves(start, end);
  if (!path) {
    console.log(`No path found from ${start} to ${end}`);
    console.log('---');
    return;
  }
  const moves = path.length - 1;
  console.log(
    `You made it in ${moves} move${moves === 1 ? '' : 's'}! Here's your path:`
  );
  path.forEach((p) => console.log(p));
  console.log('---');
}

printPath([0, 0], [1, 2]);
printPath([0, 0], [3, 3]);
printPath([3, 3], [0, 0]);
printPath([0, 0], [7, 7]);
