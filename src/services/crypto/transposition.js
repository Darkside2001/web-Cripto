/**
 * COLUMNAR TRANSPOSITION CIPHER
 * Rearranges the plaintext by writing it in rows and reading it in columns.
 * The order of columns is determined by a numeric key.
 * 
 * Example: With 3 columns, "HELLO WORLD" becomes a 3-column grid,
 * then read column by column.
 */

/**
 * Encrypts text using columnar transposition
 * @param {string} text - The plaintext to encrypt
 * @param {number} columns - The number of columns (key)
 * @returns {string} The encrypted ciphertext
 */
export function encrypt(text, columns) {
  if (!text) return '';
  
  // Ensure columns is a valid positive integer
  columns = Math.max(1, Math.floor(columns));
  
  // Remove spaces for encryption (optional - can be modified)
  const cleanText = text.replace(/\s/g, '');
  
  // Calculate number of rows needed
  const rows = Math.ceil(cleanText.length / columns);
  
  // Pad the text if necessary to fill the grid
  const paddedText = cleanText.padEnd(rows * columns, 'X');
  
  // Create the grid
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(paddedText.slice(i * columns, (i + 1) * columns).split(''));
  }
  
  // Read column by column
  let result = '';
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      result += grid[row][col];
    }
  }
  
  return result;
}

/**
 * Decrypts text using columnar transposition
 * @param {string} text - The ciphertext to decrypt
 * @param {number} columns - The number of columns (key)
 * @returns {string} The decrypted plaintext
 */
export function decrypt(text, columns) {
  if (!text) return '';
  
  // Ensure columns is a valid positive integer
  columns = Math.max(1, Math.floor(columns));
  
  // Calculate number of rows
  const rows = Math.ceil(text.length / columns);
  
  // Create empty grid
  const grid = Array(rows).fill(null).map(() => Array(columns).fill(''));
  
  // Fill the grid column by column
  let textIndex = 0;
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      if (textIndex < text.length) {
        grid[row][col] = text[textIndex];
        textIndex++;
      }
    }
  }
  
  // Read row by row
  let result = '';
  for (let row = 0; row < rows; row++) {
    result += grid[row].join('');
  }
  
  // Remove padding 'X' characters from the end
  return result.replace(/X+$/, '');
}

/**
 * Creates a visual representation of the grid
 * @param {string} text - The text to visualize
 * @param {number} columns - The number of columns
 * @returns {Array<Array<string>>} 2D array representing the grid
 */
export function visualizeGrid(text, columns) {
  if (!text) return [];
  
  columns = Math.max(1, Math.floor(columns));
  const cleanText = text.replace(/\s/g, '');
  const rows = Math.ceil(cleanText.length / columns);
  const paddedText = cleanText.padEnd(rows * columns, 'X');
  
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(paddedText.slice(i * columns, (i + 1) * columns).split(''));
  }
  
  return grid;
}
