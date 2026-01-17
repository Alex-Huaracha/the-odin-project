import capitalize from '../src/capitalize.js';

describe('capitalize', () => {
  test('capitalizes first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('returns empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });

  test('does not change an already capitalized word', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  test('does not lowercase the rest of the string', () => {
    expect(capitalize('hELLo')).toBe('HELLo');
  });

  test('single character is capitalized', () => {
    expect(capitalize('a')).toBe('A');
  });

  test('non-letter first character remains unchanged', () => {
    expect(capitalize('1abc')).toBe('1abc');
    expect(capitalize('!wow')).toBe('!wow');
  });
});
