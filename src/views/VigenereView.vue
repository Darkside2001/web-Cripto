<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-6xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4"><font-awesome-icon :icon="['fas', 'key']" class="mr-3 text-primary" />
          Cifrado Vigenère</h1>
        <Card variant="default" class="mt-8 text-left mb-6">
          <button 
            @click="acordeonAbierto = !acordeonAbierto"
            class="w-full flex items-center justify-between text-xl font-bold text-text-primary hover:text-primary transition-colors">
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'book-open']" class="text-primary" /> 
              Cómo Funciona
            </div>
            <font-awesome-icon 
              :icon="['fas', 'chevron-down']" 
              :class="['transition-transform duration-300', acordeonAbierto ? 'rotate-180' : '']" />
          </button>
          
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[1000px] opacity-100"
            leave-from-class="max-h-[1000px] opacity-100"
            leave-to-class="max-h-0 opacity-0">
            <div v-show="acordeonAbierto" class="overflow-hidden">
              <div class="pt-6 space-y-4">
                <p class="text-text-secondary leading-relaxed">
                  El cifrado Vigenère mejora el cifrado César usando una palabra clave. Cada letra
                  de la clave determina cuántas posiciones se desplaza la letra correspondiente del mensaje.
                </p>
                <div class="bg-bg-secondary rounded-lg p-6 my-6 border-l-4 border-primary">
                  <div class="flex gap-4 mb-2 font-mono">
                    <span class="font-bold text-primary-light min-w-[100px]">Mensaje:</span>
                    <span class="text-text-primary">HELLO</span>
                  </div>
                  <div class="flex gap-4 mb-2 font-mono">
                    <span class="font-bold text-primary-light min-w-[100px]">Clave:</span>
                    <span class="text-text-primary">KEY (K=10, E=4, Y=24)</span>
                  </div>
                  <div class="flex gap-4 font-mono">
                    <span class="font-bold text-primary-light min-w-[100px]">Cifrado:</span>
                    <span class="text-text-primary">RIJVS</span>
                  </div>
                </div>
                <p class="text-text-secondary leading-relaxed">
                  <strong>Historia:</strong> Publicado por Blaise de Vigenère en 1586. Fue considerado
                  "le chiffre indéchiffrable" (el cifrado indescifrable) durante casi 300 años.
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

            <Input v-model="mensaje" type="textarea" label="Texto de entrada" 
              placeholder="Escribe tu mensaje aquí..." :rows="3" :show-counter="true" class="mb-6" />

            <Input v-model="clave" type="text" label="Palabra clave" placeholder="Ej: SECRETO"
              hint="Solo letras (A-Z), sin espacios ni números" class="mb-6" />

            <div v-if="clave && mensaje" class="mb-6 p-4 bg-bg-secondary rounded-lg border border-primary/30">
              <label class="block text-sm font-semibold text-text-secondary mb-2">Patrón de clave:</label>
              <div class="font-mono text-sm space-y-1">
                <div class="text-text-primary tracking-widest break-all">
                  <span v-for="(char, i) in mensaje.split('')" :key="'msg-' + i"
                    :class="['transition-all duration-300', i === indiceActual ? 'text-yellow-400 font-bold scale-110 inline-block' : '']">
                    {{ char }}
                  </span>
                </div>
                <div class="text-primary-light tracking-widest font-semibold break-all">
                  <span v-for="(char, i) in patronClave.split('')" :key="'key-' + i"
                    :class="['transition-all duration-300', i === indiceActual ? 'text-green-400 font-bold scale-110 inline-block' : '']">
                    {{ char }}
                  </span>
                </div>
              </div>
            </div>

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
            <h3 class="text-xl font-bold mb-6 text-text-primary">Funcionamiento</h3>

            <!-- Tabla de Vigenère -->
            <div class="mb-6 overflow-auto max-h-[400px] custom-scrollbar">
              <div class="inline-block min-w-full">
                <table class="w-full border-collapse text-xs font-mono">
                  <thead class="sticky top-0 bg-bg-tertiary z-10">
                    <tr>
                      <th class="border border-white/10 p-2 bg-bg-tertiary text-text-muted">↓\→</th>
                      <th v-for="letra in ABECEDARIO" :key="'col-' + letra"
                        :class="['border border-white/10 p-2 transition-all duration-300',
                          letra === letraActual ? 'bg-yellow-500/30 text-yellow-400 font-bold' : 'text-text-secondary']">
                        {{ letra }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(fila, idx) in tablaVigenere" :key="'row-' + idx">
                      <td :class="['border border-white/10 p-2 font-bold transition-all duration-300',
                        ABECEDARIO[idx] === letraClave ? 'bg-green-500/30 text-green-400' : 'text-text-muted bg-bg-tertiary']">
                        {{ ABECEDARIO[idx] }}
                      </td>
                      <td v-for="(letra, colIdx) in fila" :key="'cell-' + idx + '-' + colIdx"
                        :class="['border border-white/10 p-2 text-center transition-all duration-300',
                          esLetraResultado(letra, idx, colIdx) 
                            ? 'bg-primary text-white font-bold scale-110' 
                            : 'text-text-secondary hover:bg-white/5']">
                        {{ letra }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Info actual -->
            <div  
              class="mb-6 p-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border border-primary/50">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-xs text-text-muted mb-1">Letra Original</div>
                  <div class="text-2xl font-bold text-yellow-400">{{ letraActual }}</div>
                  <div class="text-xs text-text-muted">({{ ABECEDARIO.indexOf(letraActual) }})</div>
                </div>
                <div>
                  <div class="text-xs text-text-muted mb-1">Letra de Clave</div>
                  <div class="text-2xl font-bold text-green-400">{{ letraClave }}</div>
                  <div class="text-xs text-text-muted">Despl: {{ ABECEDARIO.indexOf(letraClave) }}</div>
                </div>
                <div>
                  <div class="text-xs text-text-muted mb-1">Resultado</div>
                  <div class="text-2xl font-bold text-primary-light">{{ letraResultado }}</div>
                  <div class="text-xs text-text-muted">({{ letraResultado ? ABECEDARIO.indexOf(letraResultado) : '-' }})</div>
                </div>
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
          :algoritmo="'vigenere'" 
          @reutilizar="cargarDesdeHistorial" 
          ref="tablaHistorial" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ABECEDARIO, encrypt, decrypt, getKeyPattern } from '../services/crypto/vigenere.js';
import { mostrarAlerta } from "../services/alertas/index.js";
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import HistorialCifrado from '../components/HistorialCifrado.vue';
import { guardarEnHistorial } from "../services/historial/index.js";


// Estado
const mensaje = ref("");
const salida = ref("");
const clave = ref("");
const indiceActual = ref(-1);
const letraActual = ref("");
const letraClave = ref("");
const letraResultado = ref("");
const tablaHistorial = ref(null);
const acordeonAbierto = ref(false);

// Computed
const puedeOperar = computed(() => mensaje.value && clave.value);
const patronClave = computed(() => {
  if (!mensaje.value || !clave.value) return '';
  return getKeyPattern(mensaje.value, clave.value);
});

// Generar tabla de Vigenère (26x26)
const tablaVigenere = computed(() => {
  const tabla = [];
  for (let i = 0; i < 26; i++) {
    const fila = [];
    for (let j = 0; j < 26; j++) {
      fila.push(ABECEDARIO[(i + j) % 26]);
    }
    tabla.push(fila);
  }
  return tabla;
});

// Helper para verificar si es la letra resultado actual
function esLetraResultado(letra, filaIdx, colIdx) {
  if (!letraActual.value || !letraClave.value || !letraResultado.value) return false;
  
  const filaCorrecta = ABECEDARIO[filaIdx] === letraClave.value;
  const colCorrecta = ABECEDARIO[colIdx] === letraActual.value;
  const esResultado = letra === letraResultado.value;
  
  return filaCorrecta && colCorrecta && esResultado;
}

// Delay helper
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Cifrar con animación
async function cifrar() {
  await procesarMensaje(true);
  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'vigenere',
      operacion: 'cifrar',
      entrada: mensaje.value,
      clave: clave.value,
      salida: salida.value
    });
    
    // Actualizar tabla de historial
    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }
    
  }
}

// Descifrar con animación
async function descifrar() {
  await procesarMensaje(false);
  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'vigenere',
      operacion: 'descifrar',
      entrada: mensaje.value,
      clave: clave.value,
      salida: salida.value
    });
    
    // Actualizar tabla de historial
    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }
    
  }
}

// Procesar mensaje con visualización
async function procesarMensaje(esCifrado) {
  salida.value = "";
  indiceActual.value = -1;
  letraActual.value = "";
  letraClave.value = "";
  letraResultado.value = "";

  const texto = mensaje.value.toUpperCase();
  const claveNormalizada = clave.value.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (!claveNormalizada) {
    mostrarAlerta('', 'La clave debe contener al menos una letra', '', 'warning');
    return;
  }

  let claveIndex = 0;

  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    
    // Si no es letra, agregar sin procesar
    if (!ABECEDARIO.includes(char)) {
      salida.value += char;
      continue;
    }

    // Resaltar posición actual
    indiceActual.value = i;
    
    // Mostrar letra actual del mensaje
    letraActual.value = char;
    const charIndex = ABECEDARIO.indexOf(char);
    await delay(600);

    // Mostrar letra de la clave
    const claveChar = claveNormalizada[claveIndex % claveNormalizada.length];
    letraClave.value = claveChar;
    const claveCharIndex = ABECEDARIO.indexOf(claveChar);
    await delay(600);

    // Calcular y mostrar resultado
    let nuevoIndex;
    if (esCifrado) {
      nuevoIndex = (charIndex + claveCharIndex) % 26;
    } else {
      nuevoIndex = (charIndex - claveCharIndex + 26) % 26;
    }
    
    const nuevoChar = ABECEDARIO[nuevoIndex];
    letraResultado.value = nuevoChar;
    await delay(800);

    salida.value += nuevoChar;
    claveIndex++;

    // Limpiar para siguiente iteración
    letraActual.value = "";
    letraClave.value = "";
    letraResultado.value = "";
    await delay(300);
  }

  // Limpiar todo al terminar
  indiceActual.value = -1;
}

function limpiarTodo() {
  mensaje.value = '';
  salida.value = '';
  clave.value = '';
  indiceActual.value = -1;
  letraActual.value = '';
  letraClave.value = '';
  letraResultado.value = '';
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