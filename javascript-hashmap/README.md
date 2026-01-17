# JavaScript HashMap

Simple HashMap implementation in JavaScript with chaining collision resolution and dynamic resizing.

This project is part of The Odin Project curriculum (JavaScript course — Hash Map assignment).

## Features

- String-only keys
- Chaining (each bucket is an array of [key, value] pairs)
- Hash function using a prime multiplier with modulo applied inside the loop to avoid integer overflow
- Automatic resize (doubles capacity) when load factor (default 0.75) is exceeded
- Methods: set, get, has, remove, length, clear, keys, values, entries

## Files

- HashMap.js — HashMap implementation
- HashSet.js — Extra credit: simple HashSet wrapper around HashMap
- index.js — Example runner that exercises the API

## Usage

1. Run the example:
   node index.js

The example in `index.js` inserts test data (apple, banana, ... moon), demonstrates overwrite behavior, forces a resize, and prints results for get/has/remove/keys/values/entries.

## Notes

- get(key) returns `null` if key is not found.
- remove(key) returns `true` if an existing key was removed, otherwise `false`.
- Keys must be strings; non-string keys throw an error.
