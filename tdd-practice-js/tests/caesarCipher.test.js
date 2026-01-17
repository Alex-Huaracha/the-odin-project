import caesarCipher from '../src/caesarCipher.js';

describe('caesarCipher', () => {
  test('shifts letters by given amount', () => {
    expect(caesarCipher('abc', 2)).toBe('cde');
  });

  test('wraps from z to a', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc');
  });

  test('preserves letter case', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
  });

  test('does not change punctuation, spaces or non-alphabetical characters', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
  });

  test('handles uppercase wrap correctly', () => {
    expect(caesarCipher('Z', 1)).toBe('A');
  });

  test('normalizes shifts greater than 26', () => {
    expect(caesarCipher('abc', 29)).toBe('def'); // 29 % 26 === 3
  });

  test('handles negative shifts (shifts backwards)', () => {
    expect(caesarCipher('abc', -3)).toBe('xyz');
    expect(caesarCipher('ABC', -3)).toBe('XYZ');
  });

  test('empty string returns empty string', () => {
    expect(caesarCipher('', 5)).toBe('');
  });
});
