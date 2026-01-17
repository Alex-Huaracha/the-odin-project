import reverseString from '../src/reverseString.js';

describe('reverseString', () => {
  test('reverses a simple word', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('returns empty string unchanged', () => {
    expect(reverseString('')).toBe('');
  });

  test('single character returns same character', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('palindrome stays the same when reversed', () => {
    expect(reverseString('racecar')).toBe('racecar');
  });

  test('preserves spaces and punctuation', () => {
    expect(reverseString('Hello, World!')).toBe('!dlroW ,olleH');
  });

  test('handles accented characters', () => {
    expect(reverseString('mañana')).toBe('anañam');
  });
});
