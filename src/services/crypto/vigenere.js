/**
 * ABECEDARIO es una lista con todas las letras del alfabeto
 * Se usa como referencia para saber la posición numérica de cada letra
 */
export const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Cifra un texto completo usando el cifrado Vigenère
 * 
 * Esta es la función principal que toma tu mensaje secreto y lo convierte
 * en un mensaje cifrado usando una palabra clave
 * 
 * @param {string} text - El texto que queremos cifrar (ejemplo: "HOLA MUNDO")
 * @param {string} key - La palabra clave para cifrar (ejemplo: "CLAVE")
 * @returns {string} El texto cifrado (ejemplo: "JSZG ASQHS")
 */
export function encrypt(text, key) {
  // Si no hay texto o no hay clave, devolvemos un texto vacío
  // (no podemos cifrar sin estos datos)
  if (!text || !key) return '';
  
  // Limpiamos la clave: quitamos espacios, números y símbolos, solo dejamos letras
  // También la convertimos a mayúsculas para trabajar más fácil
  // Ejemplo: "Mi Clave 123!" se convierte en "MICLAVE"
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  // Si después de limpiar la clave no quedan letras, devolvemos el texto sin cifrar
  if (cleanKey.length === 0) return text;
  
  // keyIndex lleva la cuenta de qué letra de la clave estamos usando
  // Empieza en 0 (primera letra de la clave)
  let keyIndex = 0;
  
  return text
    // Separamos el texto en letras individuales
    .split('')
    // Procesamos cada letra del texto una por una
    .map(char => {
      // Verificamos si el carácter es una letra MAYÚSCULA (A-Z)
      // Usamos códigos ASCII: 'A'=65, 'Z'=90
      if (char >= 'A' && char <= 'Z') {
        // Obtenemos el código numérico de la letra (A=65, B=66, etc.)
        const charCode = char.charCodeAt(0);
        
        // Calculamos cuánto debemos desplazar esta letra
        // Usamos % para repetir la clave cuando llegamos al final
        // Ejemplo: si la clave es "ABC" y estamos en la 4ta letra, usamos 'A' de nuevo
        // Restamos 65 para convertir: A=0, B=1, C=2, etc.
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        
        // Aplicamos el desplazamiento:
        // 1. Convertimos la letra a número (0-25): charCode - 65
        // 2. Sumamos el desplazamiento de la clave
        // 3. Usamos % 26 para que si pasamos de Z, volvamos a A
        // 4. Sumamos 65 para volver a código ASCII
        const shifted = ((charCode - 65 + keyShift) % 26) + 65;
        
        // Avanzamos al siguiente carácter de la clave
        keyIndex++;
        
        // Convertimos el código numérico de vuelta a letra
        return String.fromCharCode(shifted);
      }
      // Verificamos si el carácter es una letra minúscula (a-z)
      // Usamos códigos ASCII: 'a'=97, 'z'=122
      else if (char >= 'a' && char <= 'z') {
        // Mismo proceso que con mayúsculas, pero usando 97 como base
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        const shifted = ((charCode - 97 + keyShift) % 26) + 97;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Si no es una letra (espacio, número, símbolo), lo dejamos igual
      // Los espacios y signos de puntuación no se cifran
      return char;
    })
    // Unimos todas las letras cifradas de nuevo en un texto completo
    .join('');
}

/**
 * Descifra un texto que fue cifrado con Vigenère
 * 
 * Hace el proceso inverso al cifrado: usa la misma clave para recuperar
 * el mensaje original
 * 
 * @param {string} text - El texto cifrado que queremos descifrar (ejemplo: "JSZG")
 * @param {string} key - La palabra clave usada para cifrar (ejemplo: "CLAVE")
 * @returns {string} El texto original descifrado (ejemplo: "HOLA")
 */
export function decrypt(text, key) {
  // Validamos que tengamos texto y clave
  if (!text || !key) return '';
  
  // Limpiamos la clave igual que en la función encrypt
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return text;
  
  // Contador para saber qué letra de la clave usar
  let keyIndex = 0;
  
  return text
    .split('')
    .map(char => {
      // Procesamos letras MAYÚSCULAS
      if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        
        // Para descifrar, RESTAMOS el desplazamiento en lugar de sumarlo
        // Sumamos 26 antes de hacer % para evitar números negativos
        // Ejemplo: si ciframos A+3=D, desciframos D-3=A
        const shifted = ((charCode - 65 - keyShift + 26) % 26) + 65;
        
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Procesamos letras minúsculas
      else if (char >= 'a' && char <= 'z') {
        const charCode = char.charCodeAt(0);
        const keyShift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        // Mismo proceso pero con base 97 (código ASCII de 'a')
        const shifted = ((charCode - 97 - keyShift + 26) % 26) + 97;
        keyIndex++;
        return String.fromCharCode(shifted);
      }
      // Caracteres no alfabéticos permanecen sin cambios
      return char;
    })
    .join('');
}

/**
 * Muestra el patrón de la clave repetida
 * 
 * Esta función es útil para visualizar cómo se aplica la clave a cada letra
 * del texto. Muestra qué letra de la clave se usa para cifrar cada letra del texto.
 * 
 * Ejemplo: Texto "HOLA AMIGO", Clave "SOL"
 * Resultado: "SOLS OLSOL" (muestra qué letra de "SOL" cifra cada letra del texto)
 * 
 * @param {string} text - El texto original (ejemplo: "HOLA")
 * @param {string} key - La palabra clave (ejemplo: "SOL")
 * @returns {string} El patrón de la clave repetida (ejemplo: "SOLS")
 */
export function getKeyPattern(text, key) {
  // Validamos que tengamos texto y clave
  if (!text || !key) return '';
  
  // Limpiamos la clave
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanKey.length === 0) return '';
  
  // Contador para saber en qué posición de la clave estamos
  let keyIndex = 0;
  
  // Variable donde construimos el patrón resultado
  let pattern = '';
  
  // Recorremos cada carácter del texto
  for (let char of text) {
    // Si es una letra (mayúscula o minúscula)
    if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
      // Agregamos la letra correspondiente de la clave
      // Usamos % para repetir la clave cuando llegamos al final
      pattern += cleanKey[keyIndex % cleanKey.length];
      keyIndex++;
    } else {
      // Si no es letra (espacio, número, etc.), agregamos un espacio al patrón
      // Esto mantiene alineado el patrón con el texto original
      pattern += ' ';
    }
  }
  
  return pattern;
}

/**
 * Valida si un carácter es una letra del alfabeto
 * 
 * Verifica si el carácter dado es una letra válida (A-Z)
 * 
 * @param {string} char - El carácter a verificar (ejemplo: "A" o "5")
 * @returns {boolean} true si es letra, false si no lo es
 */
export function esLetraValida(char) {
  // Convierte a mayúscula y verifica si existe en nuestro ABECEDARIO
  return ABECEDARIO.includes(char.toUpperCase());
}

/**
 * Obtiene la posición numérica de una letra en el alfabeto
 * 
 * Convierte una letra a su número correspondiente: A=0, B=1, C=2, etc.
 * Útil para cálculos matemáticos con letras
 * 
 * @param {string} char - La letra (ejemplo: "C")
 * @returns {number} Su posición (ejemplo: 2) o -1 si no es letra válida
 */
export function obtenerIndiceLetra(char) {
  // Busca la letra en el ABECEDARIO y devuelve su posición
  // Si no la encuentra, devuelve -1
  return ABECEDARIO.indexOf(char.toUpperCase());
}

/**
 * Cifra una sola letra usando un carácter específico de la clave
 * 
 * Versión simplificada del cifrado para procesar una letra individual
 * con un carácter específico de la clave
 * 
 * @param {string} char - La letra a cifrar (ejemplo: "H")
 * @param {string} keyChar - La letra de la clave para este cifrado (ejemplo: "K")
 * @returns {string} La letra cifrada (ejemplo: "R")
 */
export function cifrarLetraConClave(char, keyChar) {
  // Si alguno de los caracteres no es una letra válida, devolvemos el original
  if (!esLetraValida(char) || !esLetraValida(keyChar)) return char;
  
  // Obtenemos las posiciones numéricas de ambas letras
  // Ejemplo: H=7, K=10
  const charIndex = obtenerIndiceLetra(char);
  const keyIndex = obtenerIndiceLetra(keyChar);
  
  // Sumamos las posiciones y usamos % 26 para mantenernos dentro del alfabeto
  // Ejemplo: (7 + 10) % 26 = 17 (que corresponde a la letra R)
  const newIndex = (charIndex + keyIndex) % 26;
  
  // Devolvemos la letra en la nueva posición
  return ABECEDARIO[newIndex];
}

/**
 * Descifra una sola letra usando un carácter específico de la clave
 * 
 * Hace el proceso inverso de cifrarLetraConClave
 * 
 * @param {string} char - La letra cifrada a descifrar (ejemplo: "R")
 * @param {string} keyChar - La letra de la clave usada (ejemplo: "K")
 * @returns {string} La letra original (ejemplo: "H")
 */
export function descifrarLetraConClave(char, keyChar) {
  // Validamos que ambos caracteres sean letras
  if (!esLetraValida(char) || !esLetraValida(keyChar)) return char;
  
  // Obtenemos las posiciones numéricas
  const charIndex = obtenerIndiceLetra(char);
  const keyIndex = obtenerIndiceLetra(keyChar);
  
  // Para descifrar, RESTAMOS en lugar de sumar
  // Sumamos 26 antes del % para evitar números negativos
  // Ejemplo: (17 - 10 + 26) % 26 = 7 (que corresponde a H)
  const newIndex = (charIndex - keyIndex + 26) % 26;
  
  // Devolvemos la letra descifrada
  return ABECEDARIO[newIndex];
}