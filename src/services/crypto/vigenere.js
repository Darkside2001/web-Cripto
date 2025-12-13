/**
 * VIGENÈRE CIPHER
 * Polyalphabetic substitution cipher that uses a keyword to shift letters
 * by different amounts. More secure than César cipher.
 * 
 * Example: With key="KEY", the first letter shifts by K(10), second by E(4), third by Y(24)
 */

/**
 * Alphabet constant for Vigenère table generation
 */
export const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Encrypts text using the Vigenère cipher
 * @param {string} text - The plaintext to encrypt
 * @param {string} key - The keyword to use for encryption
 * @returns {string} The encrypted ciphertext
 */
export function encrypt(text, key) {
  if (!text || !key) return '';
  
  // Remove non-alphabetic characters from key and convert to uppercase
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return text;
  
  let keyIndex = 0;
  
  return text
    .split('')
    .map(char => {
      // Check if character is uppercase letter
      if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        const shifted = ((charCode - 65 + keyShift) % 26) + 65;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Check if character is lowercase letter
      else if (char >= 'a' && char <= 'z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        const shifted = ((charCode - 97 + keyShift) % 26) + 97;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Non-alphabetic characters remain unchanged
      return char;
    })
    .join('');
}

/**
 * Decrypts text using the Vigenère cipher
 * @param {string} text - The ciphertext to decrypt
 * @param {string} key - The keyword used for encryption
 * @returns {string} The decrypted plaintext
 */
export function decrypt(text, key) {
  if (!text || !key) return '';
  
  // Remove non-alphabetic characters from key and convert to uppercase
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return text;
  
  let keyIndex = 0;
  
  return text
    .split('')
    .map(char => {
      // Check if character is uppercase letter
      if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        const shifted = ((charCode - 65 - keyShift + 26) % 26) + 65;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Check if character is lowercase letter
      else if (char >= 'a' && char <= 'z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        const shifted = ((charCode - 97 - keyShift + 26) % 26) + 97;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Non-alphabetic characters remain unchanged
      return char;
    })
    .join('');
}

/**
 * Gets the repeating key pattern for visualization
 * @param {string} text - The text to encrypt/decrypt
 * @param {string} key - The keyword
 * @returns {string} The key repeated to match text length
 */
export function getKeyPattern(text, key) {
  if (!text || !key) return '';
  
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return '';
  
  let keyIndex = 0;
  let pattern = '';
  
  for (let char of text) {
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      pattern += cleanKey[keyIndex % cleanKey.length];
      keyIndex++;
    } else {
      pattern += ' ';
    }
  }
  
  return pattern;
}

/**
 * Validates if a character is a letter
 * @param {string} char - Character to validate
 * @returns {boolean}
 */
export function esLetraValida(char) {
  return ABECEDARIO.includes(char.toUpperCase());
}

/**
 * Gets the index of a letter in the alphabet (0-25)
 * @param {string} char - Character
 * @returns {number} Index (0-25) or -1 if not valid
 */
export function obtenerIndiceLetra(char) {
  return ABECEDARIO.indexOf(char.toUpperCase());
}

/**
 * Encrypts a single character using Vigenère with a given key character
 * @param {string} char - Character to encrypt
 * @param {string} keyChar - Key character for this position
 * @returns {string} Encrypted character
 */
export function cifrarLetraConClave(char, keyChar) {
  if (!esLetraValida(char) || !esLetraValida(keyChar)) return char;
  
  const charIndex = obtenerIndiceLetra(char);
  const keyIndex = obtenerIndiceLetra(keyChar);
  const newIndex = (charIndex + keyIndex) % 26;
  
  return ABECEDARIO[newIndex];
}

/**
 * Decrypts a single character using Vigenère with a given key character
 * @param {string} char - Character to decrypt
 * @param {string} keyChar - Key character for this position
 * @returns {string} Decrypted character
 */
export function descifrarLetraConClave(char, keyChar) {
  if (!esLetraValida(char) || !esLetraValida(keyChar)) return char;
  
  const charIndex = obtenerIndiceLetra(char);
  const keyIndex = obtenerIndiceLetra(keyChar);
  const newIndex = (charIndex - keyIndex + 26) % 26;
  
  return ABECEDARIO[newIndex];
}