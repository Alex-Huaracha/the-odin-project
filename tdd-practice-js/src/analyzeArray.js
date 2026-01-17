export default function analyzeArray(arr) {
  const length = arr.length;
  if (length === 0) {
    return { average: 0, min: null, max: null, length: 0 };
  }
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const average = sum / length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return { average, min, max, length };
}
