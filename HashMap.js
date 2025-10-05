export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    if (initialCapacity <= 0)
      throw new Error('Capacity must be greater than 0');
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity);
  }

  _checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
  }

  _hash(key) {
    if (typeof key !== 'string') {
      throw new Error('Only string keys are supported');
    }
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  _insertWithoutResize(key, value) {
    const index = this._hash(key);
    this._checkIndex(index);
    let bucket = this.buckets[index];
    if (!bucket) {
      bucket = [];
      this.buckets[index] = bucket;
    }
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
  }

  set(key, value) {
    this._insertWithoutResize(key, value);
    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this._hash(key);
    this._checkIndex(index);
    const bucket = this.buckets[index];
    if (!bucket) return null;
    for (let pair of bucket) {
      if (pair[0] === key) return pair[1];
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this._hash(key);
    this._checkIndex(index);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        if (bucket.length === 0) {
          this.buckets[index] = undefined;
        }
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      for (const pair of bucket) {
        keysArray.push(pair[0]);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      for (const pair of bucket) {
        valuesArray.push(pair[1]);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      if (!bucket) continue;
      for (const pair of bucket) {
        entriesArray.push([pair[0], pair[1]]);
      }
    }
    return entriesArray;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    // Rehash all existing entries using _insertWithoutResize
    for (const bucket of oldBuckets) {
      if (!bucket) continue;
      for (const pair of bucket) {
        this._insertWithoutResize(pair[0], pair[1]);
      }
    }
  }
}
