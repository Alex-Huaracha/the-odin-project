export default function caesarCipher(str, shift) {
  const normalizedShift = ((shift % 26) + 26) % 26;
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char >= 'a' && char <= 'z') {
      const code = ((char.charCodeAt(0) - 97 + normalizedShift) % 26) + 97;
      result += String.fromCharCode(code);
    } else if (char >= 'A' && char <= 'Z') {
      const code = ((char.charCodeAt(0) - 65 + normalizedShift) % 26) + 65;
      result += String.fromCharCode(code);
    } else {
      result += char;
    }
  }
  return result;
}
