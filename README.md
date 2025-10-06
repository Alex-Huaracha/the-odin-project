# Knights Travails

Simple implementation of a shortest-path solver for a knight on an 8x8 chessboard using Breadth‑First Search (BFS).

This assignment is part of The Odin Project curriculum.

## What it does

Given two coordinates `[x, y]` (0–7), `knightMoves(start, end)` returns the shortest sequence of board squares the knight visits to reach the destination.

Example:

- `knightMoves([0,0], [1,2])` → `[[0,0], [1,2]]`
- Multiple shortest paths are possible; any valid shortest path is accepted.

## Files

- `knightMoves.js` — BFS implementation that returns the path (exported function).
- `main.js` — small runner that prints results for example cases.

## Run

1. Install Node (v20+ recommended).
2. Run project:
   node main.js

You should see printed paths and move counts for the example cases.

## Notes

- Uses BFS because it guarantees the shortest path in an unweighted graph.
- Validates coordinates and handles the `start === end` case.
- Board size is fixed to 8x8 (0–7).
