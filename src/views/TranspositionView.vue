<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-6xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4">
          <font-awesome-icon :icon="['fas', 'chart-bar']" class="mr-3 text-primary" />
          Transposición Columnar
        </h1>
        <Card variant="default" class="mt-8 text-left mb-6">
          <button @click="acordeonAbierto = !acordeonAbierto"
            class="w-full flex items-center justify-between text-xl font-bold text-text-primary hover:text-primary transition-colors">
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'book-open']" class="text-primary" />
              Cómo Funciona
            </div>
            <font-awesome-icon :icon="['fas', 'chevron-down']"
              :class="['transition-transform duration-300', acordeonAbierto ? 'rotate-180' : '']" />
          </button>

          <transition enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-300 ease-in" enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[1000px] opacity-100" leave-from-class="max-h-[1000px] opacity-100"
            leave-to-class="max-h-0 opacity-0">
            <div v-show="acordeonAbierto" class="overflow-hidden">
              <div class="pt-6 space-y-4">
                <p class="text-text-secondary leading-relaxed">
                  La transposición columnar escribe el mensaje en una cuadrícula con un número
                  específico de columnas, luego lee el texto columna por columna.
                </p>
                <div class="bg-bg-secondary rounded-lg p-6 my-6 border-l-4 border-primary">
                  <p class="font-bold text-primary-light mb-4">Ejemplo con 4 columnas:</p>
                  <div class="my-4">
                    <div class="flex gap-2 mb-2 justify-center">
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        H</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        E</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        L</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        L</div>
                    </div>
                    <div class="flex gap-2 mb-2 justify-center">
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        O</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        W</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        O</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        R</div>
                    </div>
                    <div class="flex gap-2 mb-2 justify-center">
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        L</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        D</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        X</div>
                      <div
                        class="w-12 h-12 flex items-center justify-center bg-bg-tertiary rounded text-text-primary font-mono font-bold">
                        X</div>
                    </div>
                  </div>
                  <p class="mt-4 pt-4 border-t border-white/10 text-text-primary">
                    Resultado: <strong>HOLEWDLOXLRX</strong> (leyendo columna por columna)
                  </p>
                </div>
                <p class="text-text-secondary leading-relaxed">
                  <strong>Historia:</strong> Utilizado desde la antigüedad. Los espartanos usaban
                  la "escítala", un dispositivo de transposición columnar, en el siglo V a.C.
                </p>
                <p class="text-text-secondary leading-relaxed">
                  <strong>Seguridad:</strong> Media. Más difícil de romper que los cifrados de
                  sustitución simples, pero vulnerable al análisis de patrones.
                </p>
              </div>
            </div>
          </transition>
        </Card>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mb-8">
          <!-- Input Section -->
          <Card variant="glass" class="h-full">
            <h3 class="text-xl font-bold mb-6 text-text-primary">Configuración</h3>

            <Input v-model="mensaje" type="textarea" label="Texto de entrada" placeholder="Escribe tu mensaje aquí..."
              :rows="4" :show-counter="true" class="mb-6" />

            <Input v-model.number="columnas" type="number" label="Número de columnas" placeholder="Ej: 4" :min="2"
              :max="10" hint="Entre 2 y 10 columnas" class="mb-6" />

            <div class="flex flex-col gap-4 flex-wrap">
              <Button variant="primary" @click="cifrar" :disabled="!puedeOperar">
                <font-awesome-icon :icon="['fas', 'lock']" class="mr-2" /> Cifrar
              </Button>
              <Button variant="secondary" @click="descifrar" :disabled="!puedeOperar">
                <font-awesome-icon :icon="['fas', 'unlock']" class="mr-2" /> Descifrar
              </Button>
              <Button variant="outline" @click="limpiarTodo">
                <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" /> Limpiar
              </Button>
            </div>
          </Card>

          <!-- Visualization Section -->
          <Card variant="glass" class="h-full flex flex-col">
            <h3 class="text-xl font-bold mb-6 text-text-primary">Visualización Interactiva</h3>

            <!-- Matriz animada -->
            <div v-if="matriz.length > 0" class="mb-6 bg-bg-secondary rounded-lg p-6 overflow-x-auto custom-scrollbar">
              <div class="flex flex-col gap-2 w-max mx-auto">
                <div v-for="(fila, filaIdx) in matriz" :key="'fila-' + filaIdx" class="flex gap-2">
                  <div v-for="(celda, colIdx) in fila" :key="'celda-' + filaIdx + '-' + colIdx" :class="[
                    'min-w-[50px] h-12 flex items-center justify-center rounded font-mono font-bold text-lg transition-all duration-500',
                    getCeldaClass(filaIdx, colIdx)
                  ]">
                    {{ celda }}
                  </div>
                </div>
              </div>

              <!-- Indicador de lectura -->
              <div v-if="leyendoColumna >= 0" class="mt-6 p-4 bg-primary/20 rounded-lg border border-primary">
                <div class="flex items-center justify-center gap-4">
                  <font-awesome-icon :icon="['fas', 'arrow-down']" class="text-primary text-2xl animate-bounce" />
                  <span class="text-text-primary font-bold">
                    Leyendo columna {{ leyendoColumna + 1 }}
                  </span>
                  <font-awesome-icon :icon="['fas', 'arrow-down']" class="text-primary text-2xl animate-bounce" />
                </div>
              </div>

              <!-- Proceso de escritura -->
              <div v-if="escribiendoFila >= 0" class="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500">
                <div class="flex items-center justify-center gap-4">
                  <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-green-400 text-2xl" />
                  <span class="text-text-primary font-bold">
                    Escribiendo en fila {{ escribiendoFila + 1 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Texto original con resaltado -->
            <div v-if="mensaje && matriz.length > 0" class="mb-6 p-4 bg-bg-secondary rounded-lg border border-white/10">
              <label class="block text-sm font-semibold text-text-secondary mb-2">Texto procesado:</label>
              <div class="font-mono text-lg tracking-wide break-all">
                <span v-for="(char, i) in textoLimpio.split('')" :key="'char-' + i" :class="[
                  'inline-block transition-all duration-300',
                  i === indiceActual ? 'text-yellow-400 scale-125 font-bold bg-yellow-400/20 px-1 rounded' : 'text-text-primary'
                ]">
                  {{ char }}
                </span>
              </div>
            </div>

            <!-- Resultado -->
            <h3 class="text-xl font-bold mb-4 text-text-primary">Resultado</h3>
            <div class="flex-1 bg-bg-secondary border border-white/10 rounded-lg p-6 min-h-[100px] flex flex-col">
              <div v-if="salida" class="flex flex-col gap-4 flex-1">
                <p class="text-lg text-text-primary break-words leading-relaxed flex-1 font-mono">{{ salida }}</p>
                <div class="mt-auto pt-4 border-t border-white/10">
                  <Button variant="ghost" size="sm" @click="copiarResultado">
                    <font-awesome-icon :icon="['fas', 'clipboard']" class="mr-2" /> Copiar
                  </Button>
                </div>
              </div>
              <div v-else class="flex items-center justify-center h-full text-text-muted italic">
                <p>El resultado aparecerá aquí...</p>
              </div>
            </div>
          </Card>
        </div>

        <HistorialCifrado 
          :algoritmo="'transposition'" 
          @reutilizar="cargarDesdeHistorial" 
          ref="tablaHistorial" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { encrypt, decrypt, visualizeGrid } from '../services/crypto/transposition.js';
import { mostrarAlerta } from "../services/alertas/index.js";
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import HistorialCifrado from '../components/HistorialCifrado.vue';
import { guardarEnHistorial } from "../services/historial/index.js";

// Estado
const mensaje = ref("");
const salida = ref("");
const columnas = ref(4);
const matriz = ref([]);
const indiceActual = ref(-1);
const leyendoColumna = ref(-1);
const escribiendoFila = ref(-1);
const celdaActiva = ref({ fila: -1, col: -1 });
const columnasLeidas = ref(new Set());
const tablaHistorial = ref(null);
const acordeonAbierto = ref(false);

// Computed
const puedeOperar = computed(() => mensaje.value && columnas.value >= 2 && columnas.value <= 10);
const textoLimpio = computed(() => mensaje.value.replace(/[^A-Za-z]/g, '').toUpperCase());

// Obtener clase CSS para cada celda
function getCeldaClass(filaIdx, colIdx) {
  const esActiva = celdaActiva.value.fila === filaIdx && celdaActiva.value.col === colIdx;
  const columnaLeida = columnasLeidas.value.has(colIdx);
  const leyendoEstaColumna = leyendoColumna.value === colIdx;

  if (esActiva) {
    return 'bg-yellow-500 text-black scale-110 shadow-lg';
  }
  if (leyendoEstaColumna) {
    return 'bg-primary text-white border-2 border-primary-light';
  }
  if (columnaLeida) {
    return 'bg-green-500/30 text-green-300 border-2 border-green-500';
  }
  return 'bg-bg-tertiary text-text-primary border-2 border-primary/30';
}

// Delay helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Cifrar con animación
async function cifrar() {
  if (!puedeOperar.value) return;

  salida.value = "";
  matriz.value = [];
  indiceActual.value = -1;
  leyendoColumna.value = -1;
  escribiendoFila.value = -1;
  celdaActiva.value = { fila: -1, col: -1 };
  columnasLeidas.value = new Set();

  const texto = textoLimpio.value;
  if (!texto) {
    mostrarAlerta('', 'El mensaje no contiene letras válidas', '', 'warning');
    return;
  }

  const cols = columnas.value;
  const filas = Math.ceil(texto.length / cols);

  // Crear matriz vacía
  matriz.value = Array(filas).fill(null).map(() => Array(cols).fill(''));

  // Fase 1: Llenar matriz fila por fila con animación
  let idx = 0;
  for (let fila = 0; fila < filas; fila++) {
    escribiendoFila.value = fila;

    for (let col = 0; col < cols; col++) {
      if (idx < texto.length) {
        indiceActual.value = idx;
        celdaActiva.value = { fila, col };

        await delay(300);

        matriz.value[fila][col] = texto[idx];
        idx++;

        await delay(200);
      } else {
        // Rellenar con X
        matriz.value[fila][col] = 'X';
        await delay(150);
      }
    }
  }

  escribiendoFila.value = -1;
  celdaActiva.value = { fila: -1, col: -1 };
  indiceActual.value = -1;
  await delay(500);

  // Fase 2: Leer columna por columna con animación
  for (let col = 0; col < cols; col++) {
    leyendoColumna.value = col;
    await delay(400);

    for (let fila = 0; fila < filas; fila++) {
      celdaActiva.value = { fila, col };
      await delay(300);

      salida.value += matriz.value[fila][col];
      await delay(200);
    }

    columnasLeidas.value.add(col);
    celdaActiva.value = { fila: -1, col: -1 };
    await delay(300);
  }

  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'transposition',
      operacion: 'cifrar',
      entrada: mensaje.value,
      clave: columnas.value,
      salida: salida.value
    });
    
    // Actualizar tabla de historial
    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }
    
  }

  leyendoColumna.value = -1;
}

// Descifrar con animación
async function descifrar() {
  if (!puedeOperar.value) return;

  salida.value = "";
  matriz.value = [];
  indiceActual.value = -1;
  leyendoColumna.value = -1;
  escribiendoFila.value = -1;
  celdaActiva.value = { fila: -1, col: -1 };
  columnasLeidas.value = new Set();

  const texto = textoLimpio.value;
  if (!texto) {
    mostrarAlerta('', 'El mensaje no contiene letras válidas', '', 'warning');
    return;
  }

  const cols = columnas.value;
  const filas = Math.ceil(texto.length / cols);

  // Crear matriz vacía
  matriz.value = Array(filas).fill(null).map(() => Array(cols).fill(''));

  // Fase 1: Llenar matriz columna por columna
  let idx = 0;
  for (let col = 0; col < cols; col++) {
    leyendoColumna.value = col;
    await delay(400);

    for (let fila = 0; fila < filas; fila++) {
      if (idx < texto.length) {
        indiceActual.value = idx;
        celdaActiva.value = { fila, col };

        await delay(250);

        matriz.value[fila][col] = texto[idx];
        idx++;

        await delay(200);
      }
    }

    columnasLeidas.value.add(col);
    celdaActiva.value = { fila: -1, col: -1 };
    await delay(300);
  }

  leyendoColumna.value = -1;
  await delay(500);

  // Fase 2: Leer fila por fila
  for (let fila = 0; fila < filas; fila++) {
    escribiendoFila.value = fila;
    await delay(300);

    for (let col = 0; col < cols; col++) {
      const char = matriz.value[fila][col];
      if (char && char !== 'X') {
        celdaActiva.value = { fila, col };
        await delay(250);

        salida.value += char;
        await delay(200);
      }
    }

    celdaActiva.value = { fila: -1, col: -1 };
    await delay(300);
  }

  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'transposition',
      operacion: 'descifrar',
      entrada: mensaje.value,
      clave: columnas.value,
      salida: salida.value
    });
    
    // Actualizar tabla de historial
    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }
    
  }

  escribiendoFila.value = -1;
}

function limpiarTodo() {
  mensaje.value = '';
  salida.value = '';
  columnas.value = 4;
  matriz.value = [];
  indiceActual.value = -1;
  leyendoColumna.value = -1;
  escribiendoFila.value = -1;
  celdaActiva.value = { fila: -1, col: -1 };
  columnasLeidas.value = new Set();
}

async function copiarResultado() {
  try {
    await navigator.clipboard.writeText(salida.value);
    mostrarAlerta('', '¡Texto copiado al portapapeles!', 'top-end', 'success', false, 1500);
  } catch (err) {
    mostrarAlerta('', 'Error al copiar el texto.', '', 'error');
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}
</style>