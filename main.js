// Usage examples
import { LinkedList } from './LinkedList.js';

const list = new LinkedList();

// append / prepend
list.append('dog');
list.append('cat');
list.prepend('mouse');
console.log(list.toString()); // ( mouse ) -> ( dog ) -> ( cat ) -> null

// size / head / tail / at
console.log(list.size()); // 3
console.log(list.head().value); // 'mouse'
console.log(list.tail().value); // 'cat'
console.log(list.at(1).value); // 'dog'

// contains / find
console.log(list.contains('cat')); // true
console.log(list.find('cat')); // 2
console.log(list.contains('fox')); // false
console.log(list.find('fox')); // null

// pop
const removed = list.pop();
console.log(removed.value); // 'cat'
console.log(list.toString()); // ( mouse ) -> ( dog ) -> null

// insertAt
list.insertAt('parrot', 2); // at the end
console.log(list.toString()); // ( mouse ) -> ( dog ) -> ( parrot ) -> null

list.insertAt('hamster', 1); // in the middle
console.log(list.toString()); // ( mouse ) -> ( hamster ) -> ( dog ) -> ( parrot ) -> null

// removeAt
list.removeAt(2); // removes 'dog'
console.log(list.toString()); // ( mouse ) -> ( hamster ) -> ( parrot ) -> null

// edge cases
console.log(list.at(10)); // null (index out of range)
list.insertAt('turtle', 0); // insert at the beginning
console.log(list.toString()); // ( turtle ) -> ( mouse ) -> ( hamster ) -> ( parrot ) -> null
