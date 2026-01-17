import { HashMap } from './HashMap.js';

export class HashSet {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.map = new HashMap(initialCapacity, loadFactor);
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  length() {
    return this.map.length();
  }

  clear() {
    this.map.clear();
  }

  values() {
    return this.map.keys();
  }

  keys() {
    return this.values();
  }

  entries() {
    return this.keys().map((k) => [k, k]);
  }
}
