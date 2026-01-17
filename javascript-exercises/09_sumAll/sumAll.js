const sumAll = function (start, end) {
  if (typeof start !== 'number' || typeof end !== 'number') {
    return 'ERROR';
  }
  if (start < 0 || end < 0) {
    return 'ERROR';
  }
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    return 'ERROR';
  }
  if (start > end) {
    [start, end] = [end, start];
  }

  let sumAllNumbers = 0;
  for (let i = start; i <= end; i++) {
    sumAllNumbers += i;
  }
  return sumAllNumbers;
};

// Do not edit below this line
module.exports = sumAll;
