import calculator from '../src/calculator.js';

describe('calculator', () => {
  test('adds two numbers', () => {
    expect(calculator(2, 3, 'add')).toBe(5);
  });

  test('adds decimals correctly', () => {
    expect(calculator(2.5, 1.2, 'add')).toBeCloseTo(3.7, 5);
  });

  test('subtracts two numbers', () => {
    expect(calculator(10, 4, 'subtract')).toBe(6);
  });

  test('handles negative numbers', () => {
    expect(calculator(-2, -3, 'add')).toBe(-5);
    expect(calculator(-5, 3, 'subtract')).toBe(-8);
  });

  test('multiplies two numbers', () => {
    expect(calculator(6, 7, 'multiply')).toBe(42);
  });

  test('divides two numbers', () => {
    expect(calculator(10, 2, 'divide')).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => calculator(1, 0, 'divide')).toThrow('Cannot divide by zero');
  });

  test('throws on unknown operation', () => {
    expect(() => calculator(1, 1, 'pow')).toThrow('Unknown operation');
  });
});
