# TDD Practice - JavaScript

Small test-driven development practice project implementing a set of simple utility functions and their Jest tests. This project is part of the curriculum for The Odin Project.

## What’s included

- capitalize — capitalizes the first character of a string
- reverseString — returns a string reversed
- calculator — add, subtract, multiply, divide
- caesarCipher — shifts letters preserving case and punctuation
- analyzeArray — returns average, min, max, length for a numeric array
- Jest test files for each function in `tests/`

## Quick start

Install dependencies and run tests:

```bash
npm install
npm test
```

## Notes

- Project uses ES modules (`"type": "module"` in package.json).
- Jest is used for testing; Babel is configured to transpile when needed.
- See `src/` for implementations and `tests/` for corresponding tests.
