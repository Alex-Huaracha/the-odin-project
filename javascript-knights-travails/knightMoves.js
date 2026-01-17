export function knightMoves(start, end) {
  const inBounds = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const key = (p) => `${p[0]},${p[1]}`;
  const deltas = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  if (!inBounds(start[0], start[1]) || !inBounds(end[0], end[1])) {
    throw new Error('Coordinates out of bounds (0-7).');
  }
  if (start[0] === end[0] && start[1] === end[1]) return [start];

  const queue = [start];
  const visited = new Set([key(start)]);
  const parent = new Map();

  while (queue.length) {
    const cur = queue.shift();
    for (const [dx, dy] of deltas) {
      const nxt = [cur[0] + dx, cur[1] + dy];
      const k = key(nxt);
      if (!inBounds(nxt[0], nxt[1]) || visited.has(k)) continue;
      parent.set(k, key(cur));
      if (nxt[0] === end[0] && nxt[1] === end[1]) {
        const path = [];
        let curKey = k;
        while (curKey) {
          const [x, y] = curKey.split(',').map(Number);
          path.push([x, y]);
          curKey = parent.get(curKey);
        }
        // path.push(start);
        path.reverse();
        return path;
      }
      visited.add(k);
      queue.push(nxt);
    }
  }
  return null;
}
