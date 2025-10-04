import { Node } from './Node.js';

export class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  head() {
    return this.head ? this.head.value : null;
  }

  tail() {
    if (!this.head) return null;
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current.value;
  }

  at(index) {
    if (index < 0) return null;
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) return current.value;
      count++;
      current = current.next;
    }
    return null;
  }

  pop() {
    if (!this.head) return null;
    if (!this.head.next) {
      const value = this.head.value;
      this.head = null;
      return value;
    }
    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    const value = current.next.value;
    current.next = null;
    return value;
  }

  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  find(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let str = '';
    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.next;
    }
    str += 'null';
    return str;
  }

  insertAt(value, index) {
    if (index < 0) return;
    const newNode = new Node(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    let count = 0;
    while (current && count < index - 1) {
      current = current.next;
      count++;
    }
    if (!current) return;
    newNode.next = current.next;
    current.next = newNode;
  }

  removeAt(index) {
    if (index < 0 || !this.head) return;
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    let count = 0;
    while (current.next && count < index - 1) {
      current = current.next;
      count++;
    }
    if (!current.next) return;
    current.next = current.next.next;
  }
}
