// ABECEDARIO es una lista que contiene todas las letras del alfabeto español (sin Ñ)
// Cada letra está separada en una posición diferente: A=0, B=1, C=2, etc.
export const ABECEDARIO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Cifra una letra individual usando el cifrado César
 * El cifrado César funciona moviendo cada letra un número fijo de posiciones en el alfabeto
 * Por ejemplo: con desplazamiento 3, A→D, B→E, C→F, etc.
 * 
 * @param {string} char - La letra que queremos cifrar (ejemplo: "A")
 * @param {number} desplazamiento - Cuántas posiciones nos movemos (ejemplo: 3)
 * @returns {string} La letra cifrada (ejemplo: "D")
 */
export function cifrarLetra(char, desplazamiento) {
  // Buscamos en qué posición está la letra en nuestro abecedario
  // Por ejemplo: si char es "C", idx será 2 (porque C está en la posición 2)
  const idx = ABECEDARIO.indexOf(char.toUpperCase());
  
  // Si la letra no está en el abecedario (es un número, espacio o símbolo)
  // la devolvemos tal cual, sin cifrarla
  if (idx === -1) return char;

  // Calculamos la nueva posición sumando el desplazamiento
  // El símbolo % (módulo) hace que si llegamos al final del alfabeto, volvamos al inicio
  // Ejemplo: si estamos en Z (posición 25) y sumamos 3, volvemos a C (posición 2)
  const newIndex = (idx + desplazamiento) % ABECEDARIO.length;
  
  // Devolvemos la letra que está en la nueva posición calculada
  return ABECEDARIO[newIndex];
}

/**
 * Cifra un mensaje completo (varias letras o palabras)
 * Esta función toma todo el mensaje y cifra cada letra una por una
 * 
 * @param {string} mensaje - El texto completo que queremos cifrar (ejemplo: "HOLA MUNDO")
 * @param {number} desplazamiento - Cuántas posiciones mover cada letra (ejemplo: 3)
 * @returns {string} El mensaje completamente cifrado (ejemplo: "KROD PXQGR")
 */
export function cifrarMensaje(mensaje, desplazamiento) {
  return mensaje
    // Separamos el mensaje en letras individuales: "HOLA" → ["H", "O", "L", "A"]
    .split('')
    // Ciframos cada letra individual usando la función cifrarLetra
    // map() aplica la función a cada elemento de la lista
    .map(char => cifrarLetra(char, desplazamiento))
    // Unimos todas las letras cifradas de nuevo en un texto completo
    // ["K", "R", "O", "D"] → "KROD"
    .join('');
}

/**
 * Descifra un mensaje (revierte el cifrado César)
 * Para descifrar, simplemente nos movemos en la dirección contraria
 * Si ciframos moviendo 3 posiciones adelante, desciframos moviendo 3 atrás
 * 
 * @param {string} mensaje - El mensaje cifrado que queremos descifrar (ejemplo: "KROD")
 * @param {number} desplazamiento - El desplazamiento que se usó para cifrar (ejemplo: 3)
 * @returns {string} El mensaje original descifrado (ejemplo: "HOLA")
 */
export function descifrarMensaje(mensaje, desplazamiento) {
  // Calculamos el desplazamiento inverso (para movernos en dirección contraria)
  // Si ciframos con 3, desciframos con 23 (porque 26 - 3 = 23)
  // Esto nos hace retroceder 3 posiciones efectivamente
  const desplazamientoInverso = (26 - desplazamiento) % 26;
  
  // Usamos la misma función de cifrar pero con el desplazamiento inverso
  return cifrarMensaje(mensaje, desplazamientoInverso);
}

/**
 * Valida si un carácter es una letra del alfabeto
 * Esta función nos ayuda a verificar si un carácter es válido para cifrar
 * 
 * @param {string} char - El carácter que queremos verificar (ejemplo: "A" o "5")
 * @returns {boolean} true si es una letra (A-Z), false si no lo es
 */
export function esLetraValida(char) {
  // Convertimos a mayúscula y verificamos si existe en nuestro ABECEDARIO
  // Devuelve verdadero para letras (A-Z) y falso para números, símbolos, etc.
  return ABECEDARIO.includes(char.toUpperCase());
}

/**
 * Obtiene la posición numérica de una letra en el abecedario
 * Útil para saber exactamente dónde está una letra: A=0, B=1, C=2, etc.
 * 
 * @param {string} char - La letra de la cual queremos saber su posición
 * @returns {number} La posición (0-25) o -1 si no es una letra válida
 */
export function obtenerIndicLetra(char) {
  // Busca la letra en el ABECEDARIO y devuelve su posición
  // Si no la encuentra (porque no es una letra), devuelve -1
  return ABECEDARIO.indexOf(char.toUpperCase());
}