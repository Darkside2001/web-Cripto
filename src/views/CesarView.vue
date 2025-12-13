<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-6xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4"><font-awesome-icon :icon="['fas', 'file-text']" class="mr-3 text-primary" />
          Cifrado César</h1>
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
                <p>
                  El cifrado César funciona desplazando cada letra del alfabeto un número fijo
                  de posiciones. Por ejemplo, con un desplazamiento de 3:
                </p>
                <div class="bg-bg-secondary rounded-lg p-6 my-6 border-l-4 border-primary">
                  <div class="flex gap-4 mb-2 font-mono">
                    <span class="font-bold text-primary-light min-w-[100px]">Original:</span>
                    <span class="text-text-primary">A B C D E F G</span>
                  </div>
                  <div class="flex gap-4 mb-2 font-mono">
                    <span class="font-bold text-primary-light min-w-[100px]">Cifrado:</span>
                    <span class="text-text-primary">D E F G H I J</span>
                  </div>
                </div>
                <p>
                  <strong>Historia:</strong> Utilizado por Julio César para proteger mensajes
                  militares en el siglo I a.C. A pesar de su simplicidad, fue efectivo en su época
                  debido a las bajas tasas de alfabetización.
                </p>
                <p>
                  <strong>Seguridad:</strong> Muy baja. Solo hay 25 posibles claves, lo que hace
                  trivial romper el cifrado mediante fuerza bruta.
                </p>
              </div>
            </div>
          </transition>
        </Card>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 mb-8">

          <Card variant="glass" class="h-full">
            <h3 class="text-xl font-bold mb-6 text-text-primary">Configuración</h3>

            <Input v-model="mensaje" type="textarea" label="Texto de entrada" placeholder="Escribe tu mensaje aquí..."
              :rows="3" :show-counter="true" class="mb-6" />

            <div class="mb-6">
              <label class="block text-sm font-semibold text-text-secondary mb-2">
                Desplazamiento: <strong class="text-primary-light">{{ shift }}</strong>
              </label>
              <input type="range" v-model.number="shift" min="1" max="25"
                class="w-full h-2 rounded-full bg-bg-tertiary outline-none appearance-none cursor-pointer my-4 accent-primary" />
              <div class="flex justify-between text-xs text-text-muted">
                <span>1</span>
                <span>13 (ROT13)</span>
                <span>25</span>
              </div>
            </div>

            <div class="flex flex-col gap-4 flex-wrap">
              <Button variant="primary" @click="cifrar" :disabled="!mensaje || rotacionInterior !== 0">
                <font-awesome-icon :icon="['fas', 'lock']" class="mr-2" /> Cifrar
              </Button>
              <Button variant="secondary" @click="descifrar" :disabled="!mensaje || rotacionInterior !== 0">
                <font-awesome-icon :icon="['fas', 'unlock']" class="mr-2" /> Descifrar
              </Button>
              <Button variant="outline" @click="limpiarDatos">
                <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" /> Limpiar
              </Button>
            </div>
          </Card>

          <!-- Output Section -->
          <Card variant="glass" class="h-full flex flex-col">

            <h3 class="text-xl font-bold mb-6 text-text-primary">Funcionamiento</h3>

            <div class="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center mb-6">

              <!-- Rueda interior: gira según desplazamiento -->
              <svg class="absolute w-full h-full transition-transform duration-1000"
                :style="{ transform: `rotate(${rotacionInterior}deg)` }" viewBox="0 0 500 500">
                <g v-for="(letra, i) in abecedario" :key="'inner-' + i">
                  <!-- Casillero -->
                  <path :d="getSlicePath(i, 140, 200)" :fill="letra === letraOriginal ? '#facc15' : '#374151'"
                    :stroke="letra === letraOriginal ? '#fbbf24' : '#6b7280'" stroke-width="2"
                    class="transition-all duration-300" />
                  <!-- Letra -->
                  <text :x="getTextPosition(i, 170).x" :y="getTextPosition(i, 170).y" text-anchor="middle"
                    dominant-baseline="middle" :fill="letra === letraOriginal ? '#000' : '#ef4444'"
                    :font-size="letra === letraOriginal ? '20' : '16'"
                    :font-weight="letra === letraOriginal ? 'bold' : 'normal'"
                    :transform="`rotate(${i * gradosPorLetra + 90}, ${getTextPosition(i, 170).x}, ${getTextPosition(i, 170).y})`"
                    class="transition-all duration-300">
                    {{ letra }}
                  </text>
                  <!-- Número pequeño -->
                  <text :x="getTextPosition(i, 150).x" :y="getTextPosition(i, 150).y" text-anchor="middle"
                    dominant-baseline="middle" fill="#9ca3af" font-size="10"
                    :transform="`rotate(${i * gradosPorLetra + 90}, ${getTextPosition(i, 150).x}, ${getTextPosition(i, 150).y})`">
                    {{ i }}
                  </text>
                </g>
              </svg>

              <!-- Rueda exterior: fija -->
              <svg class="absolute w-full h-full" viewBox="0 0 500 500">
                <g v-for="(letra, i) in abecedario" :key="'outer-' + i">
                  <!-- Casillero -->
                  <path :d="getSlicePath(i, 200, 240)" :fill="letra === letraCifrada ? '#22c55e' : '#7c3aed'"
                    :stroke="letra === letraCifrada ? '#16a34a' : '#6d28d9'" stroke-width="2"
                    class="transition-all duration-300" />
                  <!-- Letra -->
                  <text :x="getTextPosition(i, 220).x" :y="getTextPosition(i, 220).y" text-anchor="middle"
                    dominant-baseline="middle" fill="#fff" :font-size="letra === letraCifrada ? '20' : '16'"
                    :font-weight="letra === letraCifrada ? 'bold' : 'normal'"
                    :transform="`rotate(${i * gradosPorLetra + 90}, ${getTextPosition(i, 220).x}, ${getTextPosition(i, 220).y})`"
                    class="transition-all duration-300">
                    {{ letra }}
                  </text>
                </g>
              </svg>

              <!-- Centro con indicador -->
              <div
                class="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-white/20 flex items-center justify-center shadow-2xl">
                <div class="text-center">
                  <div class="text-sm text-gray-400">Desplazamiento</div>
                  <div class="text-3xl font-bold">{{ shift }}</div>
                </div>
              </div>

              <!-- Indicador fijo (flecha) -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2">
                <svg width="20" height="30" viewBox="0 0 20 30">
                  <polygon points="10,0 20,20 10,15 0,20" fill="#ef4444" />
                </svg>
              </div>
            </div>

            <h3 class="text-xl font-bold mb-6 text-text-primary">Resultado</h3>

            <div class="flex-1 bg-bg-secondary border border-white/10 rounded-lg p-6 mb-6 min-h-[100px] flex flex-col">
              <div v-if="salida" class="flex flex-col gap-4 flex-1">
                <p class="text-lg text-text-primary break-words leading-relaxed flex-1">{{ salida }}</p>
                <div class="mt-auto pt-4 border-t border-white/10">
                  <Button variant="ghost" size="sm" @click="copiarResultado">
                    <font-awesome-icon :icon="['fas', 'clipboard']" class="mr-2" /> Copiar
                  </Button>
                </div>
              </div>
              <div v-else class="flex items-center justify-center h-full text-text-muted italic">
                <p>El texto resultante aparecerá aquí...</p>
              </div>
            </div>

            <!-- <div v-if="showBruteForce" class="mt-4 pt-6 border-t border-white/10">
              <h4 class="text-lg font-bold mb-4 text-text-primary">Fuerza Bruta (Todos los desplazamientos)</h4>
              <div class="max-h-[300px] overflow-y-auto bg-bg-secondary rounded-lg p-2 custom-scrollbar">
                <div v-for="result in bruteForceResults" :key="result.shift"
                  class="p-2 mb-1 rounded text-sm font-mono transition-colors hover:bg-white/5"
                  :class="{ 'bg-primary/20 border-l-2 border-primary': result.shift === shift }">
                  <span class="text-primary-light font-bold mr-2">{{ result.shift }}:</span>
                  <span class="text-text-secondary">{{ result.text }}</span>
                </div>
              </div>
            </div> -->
          </Card>
        </div>


        <HistorialCifrado :algoritmo="'cesar'" @reutilizar="cargarDesdeHistorial" ref="tablaHistorial" />

      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";

import { ABECEDARIO, cifrarLetra, esLetraValida } from "../services/crypto/cesar.js";
import { mostrarAlerta } from "../services/alertas/index.js";
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import HistorialCifrado from '../components/HistorialCifrado.vue';
import { guardarEnHistorial } from "../services/historial/index.js";

/* Estado de la UI */
const mensaje = ref("");
const salida = ref("");
const shift = ref(3);
const letraOriginal = ref("");
const letraCifrada = ref("");
const indiceLetraActual = ref(-1);
const tablaHistorial = ref(null);
const acordeonAbierto = ref(false);

/* Configuración de la rueda */
const abecedario = ABECEDARIO; // Usar el alfabeto del módulo
const gradosPorLetra = 360 / abecedario.length;

/* Rotación de la rueda interior */
const rotacionInterior = ref(0);

/* Generar path SVG para cada casillero (slice) */
function getSlicePath(index, innerRadius, outerRadius) {
  const angleStart = (index * gradosPorLetra - gradosPorLetra / 2) * (Math.PI / 180);
  const angleEnd = ((index + 1) * gradosPorLetra - gradosPorLetra / 2) * (Math.PI / 180);

  const x1 = 250 + innerRadius * Math.cos(angleStart);
  const y1 = 250 + innerRadius * Math.sin(angleStart);
  const x2 = 250 + outerRadius * Math.cos(angleStart);
  const y2 = 250 + outerRadius * Math.sin(angleStart);
  const x3 = 250 + outerRadius * Math.cos(angleEnd);
  const y3 = 250 + outerRadius * Math.sin(angleEnd);
  const x4 = 250 + innerRadius * Math.cos(angleEnd);
  const y4 = 250 + innerRadius * Math.sin(angleEnd);

  return `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`;
}

/* Obtener posición del texto */
function getTextPosition(index, radius) {
  const angle = index * gradosPorLetra * (Math.PI / 180);
  return {
    x: 250 + radius * Math.cos(angle),
    y: 250 + radius * Math.sin(angle)
  };
}

/* Helper para delays */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* Función principal de cifrado con animación */
async function cifrar() {
  await procesarMensaje(parseInt(shift.value));
  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'cesar',
      operacion: 'cifrar',
      entrada: mensaje.value,
      clave: shift.value,
      salida: salida.value
    });

    // Actualizar tabla de historial
    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }

  }
}

/* Función de descifrado con animación */
async function descifrar() {
  const desplazamientoInverso = (26 - parseInt(shift.value)) % 26;
  await procesarMensaje(desplazamientoInverso);
  if (salida.value) {
    guardarEnHistorial({
      algoritmo: 'cesar',
      operacion: 'descifrar',
      entrada: mensaje.value,
      clave: shift.value,
      salida: salida.value
    });


    if (tablaHistorial.value) {
      tablaHistorial.value.actualizarHistorial();
    }

  }
}

/* Procesar mensaje con animación */
async function procesarMensaje(desplazamiento) {
  salida.value = "";
  letraOriginal.value = "";
  letraCifrada.value = "";
  indiceLetraActual.value = -1;

  // Paso 1: Rotar la rueda interior según el desplazamiento
  rotacionInterior.value = desplazamiento * gradosPorLetra;
  await delay(1200);

  // Paso 2: Procesar cada letra del mensaje
  for (let i = 0; i < mensaje.value.length; i++) {
    const ch = mensaje.value[i];

    // Usar la función del módulo para cifrar
    const nuevo = cifrarLetra(ch, desplazamiento);

    // Si no es una letra válida, agregar sin animación
    if (!esLetraValida(ch)) {
      salida.value += ch;
      continue;
    }

    // Resaltar letra original en el mensaje
    indiceLetraActual.value = i;

    // Resaltar letra original en la rueda interior
    letraOriginal.value = ch.toUpperCase();
    await delay(800);

    // Resaltar letra cifrada en la rueda exterior
    letraCifrada.value = nuevo;
    await delay(800);

    salida.value += nuevo;

    // Limpiar resaltados antes de la siguiente letra
    letraOriginal.value = "";
    letraCifrada.value = "";
    await delay(400);
  }

  // Limpiar todo al terminar
  indiceLetraActual.value = -1;
  rotacionInterior.value = 0;
}

function limpiarDatos() {
  mensaje.value = '';
  salida.value = '';
  shift.value = 3;
  rotacionInterior.value = 0;
  rotacionInterior.value = 0;
}

async function copiarResultado() {
  try {
    await navigator.clipboard.writeText(salida.value);
    mostrarAlerta('', '¡Texto copiado al portapapeles!', 'top-end', 'success', false, 1500);
  } catch (err) {
    mostrarAlerta('', 'Error al copiar el texto.', '', 'error');
  }
}

function cargarDesdeHistorial(registro) {
  mensaje.value = registro.entrada;
  shift.value = parseInt(registro.clave);

  // Scroll suave hacia arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });

  mostrarAlerta('', 'Datos cargados desde el historial', 'top-end', 'info', false, 1500);
}
</script>