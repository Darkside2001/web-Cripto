<template>
  <Card variant="glass">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h3 class="text-lg sm:text-xl font-bold text-text-primary">
        <font-awesome-icon :icon="['fas', 'history']" class="mr-2 text-primary" />
        Historial de Operaciones
      </h3>
      <div class="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" @click="actualizarHistorial">
          <font-awesome-icon :icon="['fas', 'rotate']" class="mr-2" />
          Actualizar
        </Button>
        <Button variant="outline" size="sm" @click="confirmarLimpiar" :disabled="historial.length === 0">
          <font-awesome-icon :icon="['fas', 'trash']" class="mr-2" />
          Limpiar Todo
        </Button>
      </div>
    </div>

    <div class="mb-6 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <div class="flex gap-2 min-w-max pb-2">
        <Button 
          v-for="algo in algoritmos" 
          :key="algo.value"
          :variant="filtroAlgoritmo === algo.value ? 'primary' : 'ghost'" 
          size="sm"
          class="flex-shrink-0 whitespace-nowrap"
          @click="filtroAlgoritmo = algo.value">
          {{ algo.label }}
        </Button>
      </div>
    </div>

    <!-- Tabla con scroll horizontal -->
    <div v-if="historialFiltrado.length > 0" class="overflow-x-auto custom-scrollbar -mx-4 sm:mx-0">
      <div class="min-w-[800px] px-4 sm:px-0">
        <table class="w-full text-sm border-collapse">
          <thead class="bg-bg-tertiary sticky top-0 z-10">
            <tr class="text-left text-primary-light">
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Fecha</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Algoritmo</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Operación</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Entrada</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Clave</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Salida</th>
              <th class="p-2 sm:p-3 border border-white/10 text-xs sm:text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in historialFiltrado" 
              :key="item.id"
              class="hover:bg-white/5 transition-colors">
              <td class="p-2 sm:p-3 border border-white/10 text-text-secondary whitespace-nowrap text-xs sm:text-sm">
                {{ formatearFecha(item.fecha) }}
              </td>
              <td class="p-2 sm:p-3 border border-white/10">
                <span :class="['px-2 py-1 rounded text-xs font-semibold whitespace-nowrap', getAlgoritmoColor(item.algoritmo)]">
                  {{ getNombreAlgoritmo(item.algoritmo) }}
                </span>
              </td>
              <td class="p-2 sm:p-3 border border-white/10">
                <span :class="['px-2 py-1 rounded text-xs font-semibold whitespace-nowrap', 
                  item.operacion === 'cifrar' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400']">
                  {{ item.operacion }}
                </span>
              </td>
              <td class="p-2 sm:p-3 border border-white/10 text-text-primary font-mono max-w-[150px] sm:max-w-[200px] text-xs sm:text-sm">
                <div class="truncate" :title="item.entrada">{{ item.entrada }}</div>
              </td>
              <td class="p-2 sm:p-3 border border-white/10 text-accent font-bold text-xs sm:text-sm">
                {{ item.clave }}
              </td>
              <td class="p-2 sm:p-3 border border-white/10 text-text-primary font-mono max-w-[150px] sm:max-w-[200px] text-xs sm:text-sm">
                <div class="truncate" :title="item.salida">{{ item.salida }}</div>
              </td>
              <td class="p-2 sm:p-3 border border-white/10">
                <div class="flex gap-2">
                  <button 
                    @click="reutilizar(item)"
                    class="text-primary hover:text-primary-light transition-colors text-sm"
                    title="Reutilizar">
                    <font-awesome-icon :icon="['fas', 'rotate-left']" />
                  </button>
                  <button 
                    @click="eliminar(item.id)"
                    class="text-red-400 hover:text-red-300 transition-colors text-sm"
                    title="Eliminar">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-12 text-text-muted">
      <font-awesome-icon :icon="['fas', 'inbox']" class="text-4xl sm:text-5xl mb-4 opacity-50" />
      <p class="text-sm sm:text-base">No hay registros en el historial</p>
      <p class="text-xs sm:text-sm mt-2">Las operaciones de cifrado se guardarán automáticamente aquí</p>
    </div>

    <!-- Estadísticas -->
    <div v-if="historial.length > 0" class="mt-6 pt-6 border-t border-white/10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div class="bg-bg-secondary rounded-lg p-3 sm:p-4 text-center">
          <div class="text-xl sm:text-2xl font-bold text-primary">{{ historial.length }}</div>
          <div class="text-xs text-text-muted mt-1">Total operaciones</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-3 sm:p-4 text-center">
          <div class="text-xl sm:text-2xl font-bold text-green-400">{{ contarOperaciones('cifrar') }}</div>
          <div class="text-xs text-text-muted mt-1">Cifrados</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-3 sm:p-4 text-center">
          <div class="text-xl sm:text-2xl font-bold text-blue-400">{{ contarOperaciones('descifrar') }}</div>
          <div class="text-xs text-text-muted mt-1">Descifrados</div>
        </div>
        <div class="bg-bg-secondary rounded-lg p-3 sm:p-4 text-center col-span-2 lg:col-span-1">
          <div class="text-xl sm:text-2xl font-bold text-accent truncate">{{ algoritmoMasUsado }}</div>
          <div class="text-xs text-text-muted mt-1">Más usado</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { 
  obtenerHistorial, 
  obtenerHistorialPorAlgoritmo,
  eliminarRegistro,
  limpiarHistorial 
} from '../services/historial/index.js';
import Card from './ui/Card.vue';
import Button from './ui/Button.vue';

const props = defineProps({
  algoritmo: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['reutilizar']);

const historial = ref([]);
const filtroAlgoritmo = ref(props.algoritmo || 'todos');

const algoritmos = [
  { value: 'todos', label: 'Todos' },
  { value: 'cesar', label: 'César' },
  { value: 'vigenere', label: 'Vigenère' },
  { value: 'transposition', label: 'Transposición' },
  { value: 'xor', label: 'XOR' }
];

const historialFiltrado = computed(() => {
  if (filtroAlgoritmo.value === 'todos') {
    return historial.value;
  }
  return historial.value.filter(item => item.algoritmo === filtroAlgoritmo.value);
});

const algoritmoMasUsado = computed(() => {
  if (historial.value.length === 0) return '-';
  
  const conteo = {};
  historial.value.forEach(item => {
    conteo[item.algoritmo] = (conteo[item.algoritmo] || 0) + 1;
  });
  
  const max = Object.entries(conteo).reduce((a, b) => a[1] > b[1] ? a : b);
  return getNombreAlgoritmo(max[0]);
});

function actualizarHistorial() {
  if (props.algoritmo) {
    historial.value = obtenerHistorialPorAlgoritmo(props.algoritmo);
  } else {
    historial.value = obtenerHistorial();
  }
}

defineExpose({
  actualizarHistorial
});

function contarOperaciones(tipo) {
  return historial.value.filter(item => item.operacion === tipo).length;
}

function getNombreAlgoritmo(algoritmo) {
  const nombres = {
    cesar: 'César',
    vigenere: 'Vigenère',
    transposition: 'Transposición',
    xor: 'XOR'
  };
  return nombres[algoritmo] || algoritmo;
}

function getAlgoritmoColor(algoritmo) {
  const colores = {
    cesar: 'bg-purple-500/20 text-purple-400',
    vigenere: 'bg-blue-500/20 text-blue-400',
    transposition: 'bg-green-500/20 text-green-400',
    xor: 'bg-orange-500/20 text-orange-400'
  };
  return colores[algoritmo] || 'bg-gray-500/20 text-gray-400';
}

function formatearFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function reutilizar(item) {
  emit('reutilizar', item);
}

function eliminar(id) {
  if (confirm('¿Estás seguro de eliminar este registro?')) {
    eliminarRegistro(id);
    actualizarHistorial();
  }
}

function confirmarLimpiar() {
  if (confirm('¿Estás seguro de eliminar todo el historial? Esta acción no se puede deshacer.')) {
    limpiarHistorial();
    actualizarHistorial();
  }
}

onMounted(() => {
  actualizarHistorial();
});
</script>

<style scoped>
/* Oculta scrollbar pero permite scroll horizontal */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Scrollbar personalizada para la tabla */
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