import { Node } from './Node.js';

class BST {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.buildBalancedTree(
      uniqueSortedArray,
      0,
      uniqueSortedArray.length - 1
    );
  }

  buildBalancedTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildBalancedTree(array, start, mid - 1);
    node.right = this.buildBalancedTree(array, mid + 1, end);
    return node;
  }

  insert(value) {
    if (value === null || value === undefined) return null;
    if (this.find(value)) return null;
    this.root = this.insertNode(this.root, value);
    return this.find(value);
  }

  insertNode(node, value) {
    if (node === null) return new Node(value);
    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) return null;
    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      const minLargerNode = this.findMin(node.right);
      node.data = minLargerNode.data;
      node.right = this.deleteNode(node.right, minLargerNode.data);
    }
    return node;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(node, value) {
    if (node === null || node.data === value) return node;
    return value < node.data
      ? this.findNode(node.left, value)
      : this.findNode(node.right, value);
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error('Callback is required');
    if (this.root === null) return;
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error('Callback is required');
    this.inOrderTraversal(this.root, callback);
  }

  inOrderTraversal(node, callback) {
    if (node) {
      this.inOrderTraversal(node.left, callback);
      callback(node);
      this.inOrderTraversal(node.right, callback);
    }
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error('Callback is required');
    this.preOrderTraversal(this.root, callback);
  }

  preOrderTraversal(node, callback) {
    if (node) {
      callback(node);
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error('Callback is required');
    this.postOrderTraversal(this.root, callback);
  }

  postOrderTraversal(node, callback) {
    if (node) {
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node);
    }
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this.calculateHeight(node);
  }

  calculateHeight(node) {
    if (node === null) return -1;
    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    return this.calculateDepth(this.root, value, 0);
  }

  calculateDepth(node, value, currentDepth) {
    if (node === null) return null;
    if (node.data === value) return currentDepth;
    const leftDepth = this.calculateDepth(node.left, value, currentDepth + 1);
    if (leftDepth !== null) return leftDepth;
    return this.calculateDepth(node.right, value, currentDepth + 1);
  }

  isBalanced() {
    return this.checkBalance(this.root) !== -1;
  }

  checkBalance(node) {
    if (node === null) return 0;
    const leftHeight = this.checkBalance(node.left);
    const rightHeight = this.checkBalance(node.right);
    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    const nodes = [];
    this.inOrderForEach((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

export default BST;
