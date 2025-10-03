function fibs(n) {
  const result = [];
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}

console.log(fibs(8)); // [0, 1, 1, 2, 3, 5, 8, 13]

function fibsRec(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const arr = fibsRec(n - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return arr;
}

console.log(fibsRec(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
