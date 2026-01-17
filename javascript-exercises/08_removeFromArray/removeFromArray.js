const removeFromArray = function (...args) {
  const array = args[0];
  const elementsToRemove = args.slice(1);
  return array.filter((item) => !elementsToRemove.includes(item));
};

// Do not edit below this line
module.exports = removeFromArray;
