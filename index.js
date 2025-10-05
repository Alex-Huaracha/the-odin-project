import { HashMap } from './HashMap.js';

const test = new HashMap(); // capacity 16, loadFactor 0.75

// Inserciones iniciales (12 items)
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(
  'Antes resize -> length:',
  test.length(),
  'capacity:',
  test.capacity,
  'load:',
  test.length() / test.capacity
);

// Sobrescrituras (no deben cambiar length ni capacity)
test.set('apple', 'scarlet');
test.set('banana', 'gold');
console.log(
  'Después overwrite -> length:',
  test.length(),
  'capacity:',
  test.capacity
);

// Insertar 'moon' para forzar resize
test.set('moon', 'silver');
console.log(
  'Después insertar moon -> length:',
  test.length(),
  'capacity:',
  test.capacity,
  'load:',
  test.length() / test.capacity
);

// Sobrescribir post-resize
test.set('lion', 'bronze');
console.log('Después overwrite post-resize -> length:', test.length());

// get / has
console.log("get('apple'):", test.get('apple')); // scarlet
console.log("has('moon'):", test.has('moon')); // true
console.log("get('nonexistent'):", test.get('nonexistent')); // null

// remove
console.log("remove('dog'):", test.remove('dog')); // true
console.log('length tras remove:', test.length());
console.log("remove('no-key'):", test.remove('no-key')); // false

// keys / values / entries
console.log('keys():', test.keys());
console.log('values():', test.values());
console.log('entries():', test.entries());
console.log('length vs keys length:', test.length(), test.keys().length);

// clear
test.clear();
console.log('Tras clear -> length:', test.length(), 'keys:', test.keys());
