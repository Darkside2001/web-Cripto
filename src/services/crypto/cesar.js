export const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Cifra una letra individual usando el cifrado César
 * @param {string} char - Carácter a cifrar
 * @param {number} desplazamiento - Desplazamiento (0-25)
 * @returns {string} Carácter cifrado
 */
export function cifrarLetra(char, desplazamiento) {
  const idx = ABECEDARIO.indexOf(char.toUpperCase());
  
  // Si no es una letra del abecedario, retornar sin cambios
  if (idx === -1) return char;

  const newIndex = (idx + desplazamiento) % ABECEDARIO.length;
  return ABECEDARIO[newIndex];
}

/**
 * Cifra un mensaje completo
 * @param {string} mensaje - Mensaje a cifrar
 * @param {number} desplazamiento - Desplazamiento (0-25)
 * @returns {string} Mensaje cifrado
 */
export function cifrarMensaje(mensaje, desplazamiento) {
  return mensaje
    .split('')
    .map(char => cifrarLetra(char, desplazamiento))
    .join('');
}

/**
 * Descifra un mensaje (usa desplazamiento negativo)
 * @param {string} mensaje - Mensaje cifrado
 * @param {number} desplazamiento - Desplazamiento usado para cifrar
 * @returns {string} Mensaje descifrado
 */
export function descifrarMensaje(mensaje, desplazamiento) {
  const desplazamientoInverso = (26 - desplazamiento) % 26;
  return cifrarMensaje(mensaje, desplazamientoInverso);
}

/**
 * Valida si un carácter es parte del alfabeto
 * @param {string} char - Carácter a validar
 * @returns {boolean}
 */
export function esLetraValida(char) {
  return ABECEDARIO.includes(char.toUpperCase());
}

/**
 * Obtiene el índice de una letra en el abecedario
 * @param {string} char - Carácter
 * @returns {number} Índice (0-25) o -1 si no es válida
 */
export function obtenerIndicLetra(char) {
  return ABECEDARIO.indexOf(char.toUpperCase());
}