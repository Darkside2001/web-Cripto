<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-6xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4">
          <font-awesome-icon :icon="['fas', 'gear']" class="mr-3 text-primary" />
          Cifrado XOR
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
                  XOR (eXclusive OR) es una operación binaria que compara dos bits:
                  devuelve 1 si son diferentes, 0 si son iguales.
                </p>
                <div class="bg-bg-secondary rounded-lg p-6 my-6 border-l-4 border-primary">
                  <p class="font-bold text-primary-light mb-4">Tabla de verdad XOR:</p>
                  <div class="grid grid-cols-2 gap-4 my-4 font-mono text-lg">
                    <div class="flex flex-col gap-2">
                      <span class="p-2 bg-bg-tertiary rounded text-center">0 XOR 0 = 0</span>
                      <span class="p-2 bg-bg-tertiary rounded text-center">1 XOR 0 = 1</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <span class="p-2 bg-bg-tertiary rounded text-center">0 XOR 1 = 1</span>
                      <span class="p-2 bg-bg-tertiary rounded text-center">1 XOR 1 = 0</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t border-white/10 text-text-primary">
                    <font-awesome-icon :icon="['fas', 'lightbulb']" class="mr-2 text-warning" /> Propiedad importante:
                    <strong>A XOR B XOR B = A</strong><br>
                    Por eso el mismo proceso sirve para cifrar y descifrar.
                  </div>
                </div>
                <p class="text-text-secondary leading-relaxed">
                  <strong>Uso moderno:</strong> XOR es fundamental en criptografía moderna.
                  Se usa en AES, stream ciphers, y el cifrado de un solo uso (one-time pad).
                </p>
                <p class="text-text-secondary leading-relaxed">
                  <strong>Seguridad:</strong> Con una clave aleatoria del mismo tamaño que el mensaje
                  (one-time pad), es matemáticamente inquebrantable. Con claves cortas que se repiten,
                  es vulnerable.
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

            <div class="flex gap-2 mb-6">
              <Button :variant="modoEntrada === 'text' ? 'primary' : 'ghost'" size="sm" @click="modoEntrada = 'text'">
                Texto
              </Button>
              <Button :variant="modoEntrada === 'hex' ? 'primary' : 'ghost'" size="sm" @click="modoEntrada = 'hex'">
                Hexadecimal
              </Button>
            </div>

            <Input v-if="modoEntrada === 'text'" v-model="mensaje" type="textarea" label="Texto de entrada"
              placeholder="Escribe tu mensaje aquí..." :rows="4" :show-counter="true" class="mb-6" />

            <Input v-else v-model="mensajeHex" type="textarea" label="Entrada hexadecimal" placeholder="Ej: 48656C6C6F"
              :rows="4" hint="Solo caracteres hexadecimales (0-9, A-F)" class="mb-6" />

            <Input v-model="clave" type="text" label="Clave" placeholder="Ej: SECRETO"
              hint="La clave se repetirá para cubrir todo el texto" class="mb-6" />

            <div class="flex flex-col gap-4 flex-wrap">
              <Button variant="primary" @click="procesarXOR" :disabled="!puedeOperar || operacionActual !== null">
                <font-awesome-icon :icon="['fas', 'sync']" class="mr-2" /> Cifrar/Descifrar
              </Button>
              <Button variant="outline" @click="limpiarTodo" :disabled="operacionActual !== null">
                <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" /> Limpiar
              </Button>
            </div>
          </Card>

          <!-- Visualization Section -->
          <Card variant="glass" class="h-full flex flex-col">
            <h3 class="text-xl font-bold mb-6 text-text-primary">Funcionamiento</h3>

            <!-- Visualización binaria animada -->
            <div v-if="operacionActual" class="mb-6 bg-bg-secondary rounded-lg p-6 border-2 border-primary/50">
              <div class="text-center mb-4">
                <span class="text-sm text-text-muted">Procesando carácter {{ indiceActual + 1 }}</span>
              </div>

              <div class="space-y-4">
                <!-- Carácter original -->
                <div class="flex items-center justify-between gap-4">
                  <span class="text-sm text-text-muted w-24">Texto:</span>
                  <div class="flex-1 flex items-center gap-4">
                    <span class="text-2xl font-bold text-yellow-400 bg-yellow-400/20 px-4 py-2 rounded">
                      {{ operacionActual.textChar }}
                    </span>
                    <span class="text-sm text-text-secondary">
                      (ASCII: {{ operacionActual.textCode }})
                    </span>
                    <span class="font-mono text-primary bg-primary/20 px-3 py-1 rounded">
                      {{ operacionActual.textBinary }}
                    </span>
                  </div>
                </div>

                <!-- Carácter de clave -->
                <div class="flex items-center justify-between gap-4">
                  <span class="text-sm text-text-muted w-24">Clave:</span>
                  <div class="flex-1 flex items-center gap-4">
                    <span class="text-2xl font-bold text-green-400 bg-green-400/20 px-4 py-2 rounded">
                      {{ operacionActual.keyChar }}
                    </span>
                    <span class="text-sm text-text-secondary">
                      (ASCII: {{ operacionActual.keyCode }})
                    </span>
                    <span class="font-mono text-green-500 bg-green-500/20 px-3 py-1 rounded">
                      {{ operacionActual.keyBinary }}
                    </span>
                  </div>
                </div>

                <!-- Operación XOR bit por bit -->
                <div class="my-4 p-4 bg-bg-tertiary rounded-lg">
                  <div class="text-center text-sm text-text-muted mb-2">Operación XOR bit por bit:</div>
                  <div class="flex justify-center gap-2 font-mono text-lg">
                    <span v-for="(bit, idx) in operacionActual.textBinary.split('')" :key="'bit-' + idx" :class="[
                      'w-8 h-8 flex items-center justify-center rounded transition-all duration-300',
                      bitActivo === idx ? 'bg-primary text-white scale-125 font-bold' : 'bg-bg-primary text-text-secondary'
                    ]">
                      {{ getBitXOR(operacionActual.textBinary[idx], operacionActual.keyBinary[idx]) }}
                    </span>
                  </div>
                </div>

                <!-- Resultado -->
                <div class="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <span class="text-sm text-text-muted w-24">Resultado:</span>
                  <div class="flex-1 flex items-center gap-4">
                    <span class="text-2xl font-bold text-primary-light bg-primary/20 px-4 py-2 rounded">
                      {{ operacionActual.resultChar }}
                    </span>
                    <span class="text-sm text-text-secondary">
                      (ASCII: {{ operacionActual.result }})
                    </span>
                    <span class="font-mono text-accent bg-accent/20 px-3 py-1 rounded font-bold">
                      {{ operacionActual.resultHex }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabla de operaciones -->
            <div v-if="datosVisualizacion.length > 0" class="mb-6 overflow-auto max-h-[300px] custom-scrollbar">
              <table class="w-full text-sm font-mono border-collapse">
                <thead class="sticky top-0 bg-bg-tertiary z-10">
                  <tr class="text-left text-primary-light">
                    <th class="p-2 border border-white/10">Pos</th>
                    <th class="p-2 border border-white/10">Texto</th>
                    <th class="p-2 border border-white/10">Clave</th>
                    <th class="p-2 border border-white/10">XOR</th>
                    <th class="p-2 border border-white/10">Hex</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(step, idx) in datosVisualizacion" :key="step.position" :class="[
                    'transition-all duration-300',
                    idx === indiceActual ? 'bg-primary/30' : 'hover:bg-white/5',
                    idx < indiceActual ? 'opacity-50' : ''
                  ]">
                    <td class="p-2 border border-white/10 text-text-secondary">{{ step.position }}</td>
                    <td class="p-2 border border-white/10 text-yellow-400">{{ step.textChar }} ({{ step.textCode }})
                    </td>
                    <td class="p-2 border border-white/10 text-green-400">{{ step.keyChar }} ({{ step.keyCode }})</td>
                    <td class="p-2 border border-white/10 text-text-primary">{{ step.result }}</td>
                    <td class="p-2 border border-white/10 text-accent font-bold">{{ step.resultHex }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Resultado final -->
            <h3 class="text-xl font-bold mb-4 text-text-primary">Resultado</h3>

            <div class="flex gap-2 mb-4">
              <Button :variant="modoSalida === 'hex' ? 'primary' : 'ghost'" size="sm" :disabled="true">
                Hexadecimal
              </Button>
              <Button :variant="modoSalida === 'text' ? 'primary' : 'ghost'" size="sm" :disabled="true">
                Texto
              </Button>
            </div>

            <div class="flex-1 bg-bg-secondary border border-white/10 rounded-lg p-6 min-h-[100px] flex flex-col">
              <div v-if="salida" class="flex flex-col gap-4 flex-1">
                <p class="text-base font-mono text-text-primary break-all leading-loose flex-1">{{ salidaMostrada }}</p>
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
          :algoritmo="'xor'" 
          @reutilizar="cargarDesdeHistorial" 
          ref="tablaHistorial" />

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { encrypt, hexToText, visualizeXOR } from '../services/crypto/xor.js';
import { mostrarAlerta } from "../services/alertas/index.js";
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import HistorialCifrado from '../components/HistorialCifrado.vue';
import { guardarEnHistorial } from "../services/historial/index.js";

// Estado
const mensaje = ref("");
const mensajeHex = ref("");
const salida = ref("");
const clave = ref("");
const modoEntrada = ref("text");
const modoSalida = ref("hex");
const datosVisualizacion = ref([]);
const indiceActual = ref(-1);
const operacionActual = ref(null);
const bitActivo = ref(-1);
const tablaHistorial = ref(null);
const acordeonAbierto = ref(false);

watch(modoEntrada, (nuevoModo) => {
  modoSalida.value = nuevoModo === 'text' ? 'hex' : 'text';

});

// Computed
const puedeOperar = computed(() => {
  if (modoEntrada.value === 'text') {
    return mensaje.value && clave.value;
  }
  return mensajeHex.value && clave.value;
});

const salidaMostrada = computed(() => {
  if (!salida.value) return '';

  if (modoSalida.value === 'hex') {
    return salida.value;
  }

  try {
    return hexToText(salida.value);
  } catch (e) {
    return 'Error: Formato hexadecimal inválido';
  }
});

// Función para obtener bit XOR
function getBitXOR(bit1, bit2) {
  return bit1 === bit2 ? '0' : '1';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Procesar XOR con animación
async function procesarXOR() {
  if (!puedeOperar.value) return;

  salida.value = "";
  datosVisualizacion.value = [];
  indiceActual.value = -1;
  operacionActual.value = null;
  bitActivo.value = -1;

  try {
    let textoAProcesar = "";

    if (modoEntrada.value === 'text') {
      textoAProcesar = mensaje.value;
    } else {
      try {
        mostrarAlerta('', 'Procesando entrada hexadecimal...', 'top-end', 'info', false, 1500);
        await delay(500);
        textoAProcesar = hexToText(mensajeHex.value);
      } catch (error) {
        mostrarAlerta('', 'Error: Formato hexadecimal inválido', '', 'error');
        return;
      }
    }

    // Generar datos de visualización
    datosVisualizacion.value = visualizeXOR(textoAProcesar, clave.value);

    // Procesar cada carácter con animación
    for (let i = 0; i < datosVisualizacion.value.length; i++) {
      indiceActual.value = i;
      const step = datosVisualizacion.value[i];

      // Preparar operación actual con binarios
      operacionActual.value = {
        ...step,
        textBinary: step.textCode.toString(2).padStart(8, '0'),
        keyBinary: step.keyCode.toString(2).padStart(8, '0'),
        resultChar: String.fromCharCode(step.result)
      };

      await delay(600);

      // Animar XOR bit por bit
      for (let bit = 0; bit < 8; bit++) {
        bitActivo.value = bit;
        await delay(150);
      }

      bitActivo.value = -1;
      await delay(400);

      // Agregar al resultado
      salida.value += step.resultHex;
    }

    if (salida.value) {
      let entradaRegistro = "";
      if (modoEntrada.value === 'text') {
        entradaRegistro =  mensaje.value;
      }else{
        entradaRegistro =  mensajeHex.value;
      }

      guardarEnHistorial({
        algoritmo: 'xor',
        operacion: 'cifrar/descifrar',
        entrada: entradaRegistro,
        clave: clave.value,
        salida: salidaMostrada.value
      });
      
      // Actualizar tabla de historial
      if (tablaHistorial.value) {
        tablaHistorial.value.actualizarHistorial();
      }
      
    }
    // Limpiar al terminar
    await delay(500);
    operacionActual.value = null;
    indiceActual.value = -1;

  } catch (error) {
    mostrarAlerta('', 'Error: ' + error.message, '', 'error');
  }
}

function limpiarTodo() {
  mensaje.value = '';
  mensajeHex.value = '';
  salida.value = '';
  clave.value = '';
  datosVisualizacion.value = [];
  indiceActual.value = -1;
  operacionActual.value = null;
  bitActivo.value = -1;
}

async function copiarResultado() {
  try {
    await navigator.clipboard.writeText(salidaMostrada.value);
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