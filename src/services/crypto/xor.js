/**
 * @param {string} text 
 * @param {string} key
 * @returns {string}
 */
export function encrypt(text, key) {
  if (!text || !key) return '';
  
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    // Obtener códigos ASCII
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    
    // Operacion XOR
    const xored = textChar ^ keyChar;
    
    // Convertir a hexadecimal (2 dígitos, rellenado con 0 si es necesario)
    result += xored.toString(16).padStart(2, '0');
  }
  
  return result.toUpperCase();
}

/**
 * @param {string} hexText - Cadena hexadecimal cifrada
 * @param {string} key - Clave de cifrado
 * @returns {string} Texto descifrado
 */
export function decrypt(hexText, key) {
  if (!hexText || !key) return '';
  
  // Validación de entrada hexadecimal
  if (!/^[0-9A-Fa-f]*$/.test(hexText)) {
    throw new Error('Entrada hexadecimal inválida');
  }
  
  // Asegurarse de que la longitud es par
  if (hexText.length % 2 !== 0) {
    throw new Error('La cadena hexadecimal debe tener una longitud par');
  }
  
  let result = '';
  
  // Process pairs of hex digits
  for (let i = 0; i < hexText.length; i += 2) {
    // Convert hex pair to decimal
    const hexPair = hexText.substr(i, 2);
    const encryptedChar = parseInt(hexPair, 16);
    
    // Get key character
    const keyChar = key.charCodeAt((i / 2) % key.length);
    
    // XOR operation (same as encryption)
    const decrypted = encryptedChar ^ keyChar;
    
    // Convert back to character
    result += String.fromCharCode(decrypted);
  }
  
  return result;
}

/**
 * Converts text to hexadecimal representation
 * @param {string} text - The text to convert
 * @returns {string} Hexadecimal representation
 */
export function textToHex(text) {
  if (!text) return '';
  
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return result.toUpperCase();
}

/**
 * Converts hexadecimal to text
 * @param {string} hex - The hexadecimal string
 * @returns {string} The text representation
 */
export function hexToText(hex) {
  if (!hex) return '';
  
  // Validate hex input
  if (!/^[0-9A-Fa-f]*$/.test(hex)) {
    throw new Error('Entrada hexadecimal inválida');
  }
  
  if (hex.length % 2 !== 0) {
    throw new Error('La cadena hexadecimal debe tener una longitud par');
  }
  
  let result = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexPair = hex.substr(i, 2);
    result += String.fromCharCode(parseInt(hexPair, 16));
  }
  return result;
}

/**
 * Visualizes XOR operation step by step
 * @param {string} text - The plaintext
 * @param {string} key - The key
 * @returns {Array} Array of objects showing each step
 */
export function visualizeXOR(text, key) {
  if (!text || !key) return [];
  
  const steps = [];
  
  for (let i = 0; i < text.length; i++) {
    const textChar = text[i];
    const keyChar = key[i % key.length];
    const textCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);
    const xored = textCode ^ keyCode;
    
    steps.push({
      position: i,
      textChar,
      textCode,
      keyChar,
      keyCode,
      result: xored,
      resultHex: xored.toString(16).padStart(2, '0').toUpperCase()
    });
  }
  
  return steps;
}
