import BST from './bst.js';

/* prettyPrint - inline so demo runs without extra files */
function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printTraversals(tree) {
  const level = [];
  tree.levelOrderForEach((node) => level.push(node.data));
  const inOrder = [];
  tree.inOrderForEach((node) => inOrder.push(node.data));
  const pre = [];
  tree.preOrderForEach((node) => pre.push(node.data));
  const post = [];
  tree.postOrderForEach((node) => post.push(node.data));

  console.log('Level Order:', level);
  console.log('In Order   :', inOrder);
  console.log('Pre Order  :', pre);
  console.log('Post Order :', post);
}

function main() {
  const arr = randomArray(15, 100);
  console.log('Random array (<100):', arr);

  const tree = new BST(arr);

  console.log('\nInitial tree (pretty):');
  prettyPrint(tree.root);
  console.log('Balanced?', tree.isBalanced());

  console.log('\nInitial traversals:');
  printTraversals(tree);

  // Unbalance by inserting several numbers > 100 (all to one side)
  const toInsert = [150, 200, 250, 300, 350];
  console.log('\nInserting values to unbalance (>100):', toInsert);
  toInsert.forEach((v) => tree.insert(v));

  console.log('\nTree after inserting (pretty):');
  prettyPrint(tree.root);
  console.log('Balanced now?', tree.isBalanced());

  console.log('\nRebalancing...');
  tree.rebalance();

  console.log('\nTree rebalanced (pretty):');
  prettyPrint(tree.root);
  console.log('Balanced now?', tree.isBalanced());

  console.log('\nFinal traversals:');
  printTraversals(tree);
}

main();
