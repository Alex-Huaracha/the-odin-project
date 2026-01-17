import analyzeArray from '../src/analyzeArray.js';

describe('analyzeArray', () => {
  test('analyzes array of numbers', () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });

  test('single element array', () => {
    expect(analyzeArray([5])).toEqual({
      average: 5,
      min: 5,
      max: 5,
      length: 1,
    });
  });

  test('empty array returns default values', () => {
    expect(analyzeArray([])).toEqual({
      average: 0,
      min: null,
      max: null,
      length: 0,
    });
  });

  test('handles decimals and negative numbers', () => {
    const input = [-1.5, 2.5, 3];
    const expectedAverage = (-1.5 + 2.5 + 3) / 3;
    const result = analyzeArray(input);
    expect(result.length).toBe(3);
    expect(result.min).toBeCloseTo(-1.5);
    expect(result.max).toBeCloseTo(3);
    expect(result.average).toBeCloseTo(expectedAverage);
  });
});
