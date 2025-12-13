const STORAGE_KEY = 'crypto_history';
const MAX_HISTORY_ITEMS = 50;



/**
 * Obtiene todo el historial
 * @returns {Array} Array de registros
 */
export function obtenerHistorial() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer historial:', error);
    return [];
  }
}

/**
 * Guarda un nuevo registro en el historial
 * @param {Object} registro - Datos del cifrado/descifrado
 * @returns {boolean} true si se guardó exitosamente
 */
export function guardarEnHistorial(registro) {
  try {
    const historial = obtenerHistorial();
    
    const nuevoRegistro = {
      id: Date.now().toString(),
      algoritmo: registro.algoritmo,
      operacion: registro.operacion,
      entrada: registro.entrada.substring(0, 100), // Limitar a 100 chars
      clave: registro.clave,
      salida: registro.salida.substring(0, 100), // Limitar a 100 chars
      fecha: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Agregar al inicio del array
    historial.unshift(nuevoRegistro);

    // Mantener solo los últimos MAX_HISTORY_ITEMS
    if (historial.length > MAX_HISTORY_ITEMS) {
      historial.splice(MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
    return true;
  } catch (error) {
    console.error('Error al guardar en historial:', error);
    return false;
  }
}

/**
 * Obtiene el historial filtrado por algoritmo
 * @param {string} algoritmo - Nombre del algoritmo
 * @returns {Array} Registros filtrados
 */
export function obtenerHistorialPorAlgoritmo(algoritmo) {
  const historial = obtenerHistorial();
  return historial.filter(item => item.algoritmo === algoritmo);
}

/**
 * Elimina un registro específico del historial
 * @param {string} id - ID del registro
 * @returns {boolean} true si se eliminó exitosamente
 */
export function eliminarRegistro(id) {
  try {
    const historial = obtenerHistorial();
    const nuevoHistorial = historial.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoHistorial));
    return true;
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    return false;
  }
}

/**
 * Limpia todo el historial
 * @returns {boolean} true si se limpió exitosamente
 */
export function limpiarHistorial() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar historial:', error);
    return false;
  }
}

/**
 * Exporta el historial como JSON
 * @returns {string} JSON string del historial
 */
export function exportarHistorial() {
  const historial = obtenerHistorial();
  return JSON.stringify(historial, null, 2);
}

/**
 * Importa historial desde JSON
 * @param {string} jsonString - JSON string con el historial
 * @returns {boolean} true si se importó exitosamente
 */
export function importarHistorial(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al importar historial:', error);
    return false;
  }
}