/**
 * CIFRADO XOR
 * 
 * ¿Qué es el cifrado XOR?
 * XOR (eXclusive OR, "O exclusivo") es una operación matemática especial que
 * compara dos números bit por bit (en binario) y produce un resultado.
 * 
 * La magia del XOR:
 * - Si aplicamos XOR dos veces con la misma clave, recuperamos el original
 * - Ejemplo: A XOR B = C, entonces C XOR B = A (¡volvemos a A!)
 * - Por eso la misma operación sirve para cifrar Y descifrar
 * 
 * ¿Cómo funciona?
 * 1. Tomamos cada letra del texto y la convertimos a un número (código ASCII)
 * 2. Tomamos una letra de la clave y también la convertimos a número
 * 3. Aplicamos la operación XOR entre ambos números
 * 4. Convertimos el resultado a formato hexadecimal (base 16) para mostrarlo
 * 
 * Ejemplo visual:
 * Texto: "A" (código ASCII: 65, en binario: 01000001)
 * Clave: "K" (código ASCII: 75, en binario: 01001011)
 * XOR:                                     00001010 = 10 (en hexadecimal: 0A)
 * 
 * Regla XOR: 0 XOR 0 = 0, 1 XOR 1 = 0, 0 XOR 1 = 1, 1 XOR 0 = 1
 * (El resultado es 1 solo cuando los bits son diferentes)
 */

/**
 * Cifra un texto usando el algoritmo XOR
 * 
 * Esta función toma tu mensaje y lo convierte en una cadena hexadecimal
 * ilegible usando una clave secreta
 * 
 * @param {string} text - El texto que queremos cifrar (ejemplo: "HOLA")
 * @param {string} key - La clave secreta para cifrar (ejemplo: "CLAVE")
 * @returns {string} El texto cifrado en formato hexadecimal (ejemplo: "0B1F1A03")
 */
export function encrypt(text, key) {
  // Si no hay texto o clave, devolvemos un texto vacío
  if (!text || !key) return '';
  
  // Variable donde guardaremos el resultado cifrado
  let result = '';
  
  // Procesamos cada carácter del texto uno por uno
  for (let i = 0; i < text.length; i++) {
    // Paso 1: Convertimos el carácter del texto a su código numérico ASCII
    // Ejemplo: 'H' → 72, 'O' → 79, 'L' → 76, 'A' → 65
    const textChar = text.charCodeAt(i);
    
    // Paso 2: Obtenemos el carácter correspondiente de la clave
    // Usamos % (módulo) para repetir la clave si es más corta que el texto
    // Ejemplo: si la clave es "SOL" y estamos en la posición 5,
    // usamos 5 % 3 = 2, que corresponde a 'L' (la tercera letra)
    const keyChar = key.charCodeAt(i % key.length);
    
    // Paso 3: Aplicamos la operación XOR (^)
    // Esta es la operación mágica que cifra el texto
    // Compara los bits de textChar y keyChar y produce un número nuevo
    // Ejemplo: 72 ^ 83 = 27 (en binario: 01001000 XOR 01010011 = 00011011)
    const xored = textChar ^ keyChar;
    
    // Paso 4: Convertimos el resultado a hexadecimal (base 16)
    // Hexadecimal usa dígitos 0-9 y letras A-F
    // toString(16) convierte a hexadecimal
    // padStart(2, '0') asegura que siempre tenga 2 dígitos
    // Ejemplo: 27 → "1b" → "1B" (después lo convertimos a mayúsculas)
    result += xored.toString(16).padStart(2, '0');
  }
  
  // Convertimos todo a mayúsculas para que se vea más profesional
  // "1b2c3d" → "1B2C3D"
  return result.toUpperCase();
}

/**
 * Descifra un texto que fue cifrado con XOR
 * 
 * La belleza del XOR: ¡usamos exactamente la misma operación para descifrar!
 * Si ciframos A con clave K obtenemos C: A XOR K = C
 * Para descifrar hacemos: C XOR K = A (recuperamos el original)
 * 
 * @param {string} hexText - El texto cifrado en formato hexadecimal (ejemplo: "1B2C3D")
 * @param {string} key - La misma clave usada para cifrar (ejemplo: "CLAVE")
 * @returns {string} El texto original descifrado (ejemplo: "HOLA")
 */
export function decrypt(hexText, key) {
  // Validamos que tengamos texto y clave
  if (!hexText || !key) return '';
  
  // Verificamos que hexText solo contenga caracteres hexadecimales válidos
  // /^[0-9A-Fa-f]*$/ es un patrón que dice: "solo números 0-9 y letras A-F"
  // Si contiene otra cosa (como "XYZ" o "#$%"), lanzamos un error
  if (!/^[0-9A-Fa-f]*$/.test(hexText)) {
    throw new Error('Entrada hexadecimal inválida');
  }
  
  // Verificamos que la longitud sea par (divisible entre 2)
  // Cada carácter original se convierte en 2 dígitos hexadecimales
  // Si la longitud es impar, algo está mal con el texto cifrado
  if (hexText.length % 2 !== 0) {
    throw new Error('La cadena hexadecimal debe tener una longitud par');
  }
  
  // Variable donde construiremos el texto descifrado
  let result = '';
  
  // Procesamos el texto hexadecimal de 2 en 2 caracteres
  // Cada par de dígitos hexadecimales representa un carácter original
  // i += 2 significa que avanzamos de 2 en 2 (0, 2, 4, 6...)
  for (let i = 0; i < hexText.length; i += 2) {
    // Paso 1: Tomamos un par de dígitos hexadecimales
    // substr(i, 2) extrae 2 caracteres comenzando en la posición i
    // Ejemplo: si i=0 en "1B2C", hexPair será "1B"
    const hexPair = hexText.substr(i, 2);
    
    // Paso 2: Convertimos el par hexadecimal a número decimal
    // parseInt(hexPair, 16) dice "convierte esto de base 16 a base 10"
    // Ejemplo: "1B" en hexadecimal = 27 en decimal
    const encryptedChar = parseInt(hexPair, 16);
    
    // Paso 3: Obtenemos el carácter correspondiente de la clave
    // (i / 2) nos da la posición del carácter original (porque cada 2 dígitos hex = 1 carácter)
    // Ejemplo: si i=4, estamos en el tercer carácter (4/2 = 2, posición 2)
    const keyChar = key.charCodeAt((i / 2) % key.length);
    
    // Paso 4: Aplicamos XOR nuevamente (¡la operación mágica!)
    // Como XOR es reversible, esto nos devuelve el carácter original
    // Ejemplo: 27 XOR 83 = 72 (recuperamos 'H')
    const decrypted = encryptedChar ^ keyChar;
    
    // Paso 5: Convertimos el número de vuelta a carácter
    // String.fromCharCode convierte código ASCII a letra
    // Ejemplo: 72 → 'H'
    result += String.fromCharCode(decrypted);
  }
  
  // Devolvemos el texto completamente descifrado
  return result;
}

/**
 * Convierte texto normal a formato hexadecimal
 * 
 * Función auxiliar que muestra cómo se vería un texto en hexadecimal
 * sin aplicar ningún cifrado. Útil para entender el proceso.
 * 
 * @param {string} text - El texto a convertir (ejemplo: "ABC")
 * @returns {string} Representación hexadecimal (ejemplo: "414243")
 */
export function textToHex(text) {
  // Si no hay texto, devolvemos vacío
  if (!text) return '';
  
  // Variable para construir el resultado
  let result = '';
  
  // Procesamos cada carácter
  for (let i = 0; i < text.length; i++) {
    // Convertimos el carácter a su código ASCII, luego a hexadecimal
    // charCodeAt(i) obtiene el código ASCII
    // toString(16) convierte a hexadecimal
    // padStart(2, '0') asegura 2 dígitos (08 en vez de 8)
    // Ejemplo: 'A' → 65 → "41"
    result += text.charCodeAt(i).toString(16).padStart(2, '0');
  }
  
  // Convertimos a mayúsculas para consistencia
  return result.toUpperCase();
}

/**
 * Convierte formato hexadecimal a texto normal
 * 
 * Hace el proceso inverso de textToHex: toma números hexadecimales
 * y los convierte de vuelta a caracteres legibles
 * 
 * @param {string} hex - La cadena hexadecimal (ejemplo: "414243")
 * @returns {string} El texto legible (ejemplo: "ABC")
 */
export function hexToText(hex) {
  // Si no hay entrada, devolvemos vacío
  if (!hex) return '';
  
  // Validamos que solo contenga caracteres hexadecimales (0-9, A-F)
  if (!/^[0-9A-Fa-f]*$/.test(hex)) {
    throw new Error('Entrada hexadecimal inválida');
  }
  
  // Verificamos que la longitud sea par
  // (cada carácter necesita 2 dígitos hexadecimales)
  if (hex.length % 2 !== 0) {
    throw new Error('La cadena hexadecimal debe tener una longitud par');
  }
  
  // Variable para el resultado
  let result = '';
  
  // Procesamos de 2 en 2 caracteres
  for (let i = 0; i < hex.length; i += 2) {
    // Tomamos un par de dígitos hexadecimales
    const hexPair = hex.substr(i, 2);
    
    // Convertimos el par hex a número decimal, luego a carácter
    // parseInt(hexPair, 16) convierte hex a decimal
    // String.fromCharCode convierte el número a carácter
    // Ejemplo: "41" → 65 → 'A'
    result += String.fromCharCode(parseInt(hexPair, 16));
  }
  
  return result;
}

/**
 * Visualiza la operación XOR paso a paso
 * 
 * Esta función es educativa: muestra en detalle qué sucede con cada
 * carácter durante el cifrado XOR. Es perfecta para entender el proceso.
 * 
 * Para cada carácter del texto, muestra:
 * - El carácter original y su código ASCII
 * - El carácter de la clave y su código ASCII
 * - El resultado de la operación XOR
 * - El resultado en formato hexadecimal
 * 
 * @param {string} text - El texto a analizar (ejemplo: "AB")
 * @param {string} key - La clave (ejemplo: "K")
 * @returns {Array} Lista de objetos con información detallada de cada paso
 */
export function visualizeXOR(text, key) {
  // Si no hay texto o clave, devolvemos una lista vacía
  if (!text || !key) return [];
  
  // Lista donde guardaremos la información de cada paso
  const steps = [];
  
  // Procesamos cada carácter del texto
  for (let i = 0; i < text.length; i++) {
    // Obtenemos el carácter del texto en esta posición
    const textChar = text[i];
    
    // Obtenemos el carácter correspondiente de la clave
    // (usando % para repetir la clave si es necesaria)
    const keyChar = key[i % key.length];
    
    // Obtenemos los códigos ASCII de ambos caracteres
    const textCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);
    
    // Aplicamos la operación XOR
    const xored = textCode ^ keyCode;
    
    // Agregamos toda esta información a la lista de pasos
    // Esto crea un objeto con todos los detalles de esta operación
    steps.push({
      position: i,                    // Posición en el texto (0, 1, 2...)
      textChar,                       // Carácter del texto (ejemplo: 'A')
      textCode,                       // Código ASCII del texto (ejemplo: 65)
      keyChar,                        // Carácter de la clave (ejemplo: 'K')
      keyCode,                        // Código ASCII de la clave (ejemplo: 75)
      result: xored,                  // Resultado de XOR (ejemplo: 10)
      resultHex: xored.toString(16)   // Resultado en hexadecimal (ejemplo: "0A")
        .padStart(2, '0')             // Aseguramos 2 dígitos
        .toUpperCase()                // En mayúsculas
    });
  }
  
  // Devolvemos la lista completa con todos los pasos
  // Esta información puede mostrarse en una tabla o visualización
  return steps;
}