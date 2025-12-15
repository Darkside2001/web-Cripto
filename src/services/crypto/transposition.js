/**
 * Cifra un texto usando transposición columnar
 * 
 * Esta función toma tu mensaje y lo reorganiza escribiéndolo en columnas
 * para hacerlo ilegible sin la clave
 * 
 * @param {string} text - El texto que queremos cifrar (ejemplo: "HOLA MUNDO")
 * @param {number} columns - Número de columnas a usar como clave (ejemplo: 3)
 * @returns {string} El texto cifrado (ejemplo: "HANDOMDLUO")
 */
export function encrypt(text, columns) {
  // Si no hay texto, devolvemos un texto vacío
  if (!text) return '';
  
  // Nos aseguramos de que columns sea un número entero positivo
  // Math.floor elimina decimales (3.7 → 3)
  // Math.max asegura que sea mínimo 1 (si alguien pone 0 o negativo)
  columns = Math.max(1, Math.floor(columns));
  
  // Quitamos todos los espacios del texto para que no interfieran
  // "HOLA MUNDO" se convierte en "HOLAMUNDO"
  // Esto hace que el cifrado sea más limpio
  const cleanText = text.replace(/\s/g, '');
  
  // Calculamos cuántas filas necesitamos
  // Si tenemos 10 letras y 3 columnas: Math.ceil(10/3) = 4 filas
  // Math.ceil redondea hacia arriba (3.3 → 4)
  const rows = Math.ceil(cleanText.length / columns);
  
  // Rellenamos el texto con 'X' si es necesario para completar la tabla
  // Si tenemos 10 letras y necesitamos 12 espacios (4 filas × 3 columnas),
  // agregamos 2 'X' al final: "HOLAMUNDOXX"
  // padEnd significa "rellena al final hasta llegar a este tamaño"
  const paddedText = cleanText.padEnd(rows * columns, 'X');
  
  // Creamos la tabla (grid) vacía donde pondremos las letras
  // Es como crear una hoja cuadriculada con filas y columnas
  const grid = [];
  
  // Llenamos la tabla fila por fila
  for (let i = 0; i < rows; i++) {
    // Para cada fila, tomamos un pedazo del texto
    // slice corta el texto: si i=0, tomamos letras 0-3
    // si i=1, tomamos letras 3-6, etc.
    // split('') convierte el texto en una lista de letras individuales
    // Ejemplo fila 0: "HOL" → ["H", "O", "L"]
    grid.push(paddedText.slice(i * columns, (i + 1) * columns).split(''));
  }
  
  // Ahora leemos la tabla COLUMNA POR COLUMNA (aquí está la magia del cifrado)
  // En lugar de leer de izquierda a derecha, leemos de arriba hacia abajo
  let result = '';
  
  // Recorremos cada columna
  for (let col = 0; col < columns; col++) {
    // Para cada columna, bajamos por todas las filas
    for (let row = 0; row < rows; row++) {
      // Agregamos la letra que está en esta posición
      // grid[row][col] significa: "dame la letra de la fila 'row', columna 'col'"
      result += grid[row][col];
    }
  }
  
  // Devolvemos el texto cifrado
  return result;
}

/**
 * Descifra un texto que fue cifrado con transposición columnar
 * 
 * Hace el proceso inverso: toma el texto cifrado y lo reorganiza
 * para recuperar el mensaje original
 * 
 * @param {string} text - El texto cifrado (ejemplo: "HANDOMDLUO")
 * @param {number} columns - El número de columnas usado para cifrar (ejemplo: 3)
 * @returns {string} El texto original (ejemplo: "HOLAMUNDO")
 */
export function decrypt(text, columns) {
  // Si no hay texto, devolvemos vacío
  if (!text) return '';
  
  // Validamos que columns sea un número entero positivo
  columns = Math.max(1, Math.floor(columns));
  
  // Calculamos cuántas filas tiene la tabla cifrada
  // Si tenemos 12 letras cifradas y 3 columnas: 12 ÷ 3 = 4 filas
  const rows = Math.ceil(text.length / columns);
  
  // Creamos una tabla vacía donde reconstruiremos el mensaje
  // Array(rows) crea una lista con 'rows' espacios
  // .fill(null) llena esos espacios con 'null' (vacío)
  // .map(() => Array(columns).fill('')) crea columnas vacías para cada fila
  // Resultado: una tabla vacía lista para llenar
  const grid = Array(rows).fill(null).map(() => Array(columns).fill(''));
  
  // Llenamos la tabla COLUMNA POR COLUMNA (inverso al cifrado)
  // Vamos leyendo el texto cifrado y lo colocamos columna por columna
  let textIndex = 0; // Lleva la cuenta de qué letra del texto cifrado estamos leyendo
  
  // Recorremos cada columna
  for (let col = 0; col < columns; col++) {
    // Para cada columna, bajamos por todas las filas
    for (let row = 0; row < rows; row++) {
      // Si todavía quedan letras por procesar
      if (textIndex < text.length) {
        // Colocamos la letra en esta posición de la tabla
        grid[row][col] = text[textIndex];
        // Avanzamos a la siguiente letra del texto cifrado
        textIndex++;
      }
    }
  }
  
  // Ahora leemos la tabla FILA POR FILA (de forma normal)
  // Esto recupera el orden original del mensaje
  let result = '';
  
  // Recorremos cada fila de arriba hacia abajo
  for (let row = 0; row < rows; row++) {
    // join('') une todas las letras de esta fila en un texto
    // Ejemplo: ["H", "O", "L"] → "HOL"
    result += grid[row].join('');
  }
  
  // Quitamos las 'X' que agregamos al final al cifrar
  // /X+$/ es una expresión que significa "todas las X que estén al final"
  // Ejemplo: "HOLAMUNDOXX" → "HOLAMUNDO"
  return result.replace(/X+$/, '');
}

/**
 * Crea una representación visual de la tabla (grid)
 * 
 * Esta función es útil para ver cómo se organiza el texto en la tabla.
 * Nos ayuda a entender visualmente el proceso de cifrado.
 * 
 * Ejemplo de salida para "HOLAMUNDO" con 3 columnas:
 * [
 *   ["H", "O", "L"],
 *   ["A", "M", "U"],
 *   ["N", "D", "O"],
 *   ["X", "X", "X"]
 * ]
 * 
 * @param {string} text - El texto a visualizar (ejemplo: "HOLA MUNDO")
 * @param {number} columns - Número de columnas (ejemplo: 3)
 * @returns {Array<Array<string>>} Una tabla 2D (lista de listas) con las letras organizadas
 */
export function visualizeGrid(text, columns) {
  // Si no hay texto, devolvemos una lista vacía
  if (!text) return [];
  
  // Validamos que columns sea un número entero positivo
  columns = Math.max(1, Math.floor(columns));
  
  // Quitamos espacios del texto
  const cleanText = text.replace(/\s/g, '');
  
  // Calculamos cuántas filas necesitamos
  const rows = Math.ceil(cleanText.length / columns);
  
  // Rellenamos con 'X' si es necesario para completar la última fila
  const paddedText = cleanText.padEnd(rows * columns, 'X');
  
  // Creamos la tabla (grid) como una lista de listas
  const grid = [];
  
  // Llenamos la tabla fila por fila
  for (let i = 0; i < rows; i++) {
    // Tomamos un pedazo del texto para esta fila
    // y lo convertimos en una lista de letras
    // Luego lo agregamos como una nueva fila en la tabla
    grid.push(paddedText.slice(i * columns, (i + 1) * columns).split(''));
  }
  
  // Devolvemos la tabla completa para que pueda ser mostrada
  return grid;
}