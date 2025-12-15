<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4">Lista de Algoritmos de Cifrado</h1>
        <p class="text-lg text-text-secondary leading-relaxed">
          A continuación se muestra la colección de algoritmos criptográficos usados para la página.
        </p>
      </div>

      <!-- Swiper responsive -->
      <Swiper 
        :effect="'cards'" 
        :grabCursor="true" 
        :modules="modules" 
        class="w-full max-w-[340px] sm:max-w-[400px] mx-auto px-4 sm:px-0">
        
        <!-- Cifrado César -->
        <SwiperSlide>
          <Card 
            variant="glass" 
            :interactive="true"
            class="flex flex-col gap-4 sm:gap-6 items-start cursor-pointer animate-slide-in text-left p-4 sm:p-6"
            @click="$router.push('/cesar')">
            
            <div class="flex items-center gap-4 w-full">
              <font-awesome-icon 
                :icon="['fas', 'font']"
                class="text-5xl sm:text-6xl shrink-0 text-success drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              
              <div class="flex-1 min-w-0">
                <h2 class="text-xl sm:text-2xl font-bold text-text-primary mb-1 truncate">
                  Cifrado César
                </h2>
                <span class="px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase bg-success/20 text-success inline-block">
                  Fácil
                </span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
              El cifrado César es uno de los métodos de cifrado más antiguos y simples.
              Desplaza cada letra del alfabeto un número fijo de posiciones.
            </p>

            <div class="flex flex-col gap-1 w-full text-xs sm:text-sm">
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Tipo:</strong> Sustitución monoalfabética
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Seguridad:</strong> Baja
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Época:</strong> Siglo I a.C.
              </div>
            </div>

            <div class="pt-3 sm:pt-4 border-t border-white/10 w-full">
              <span class="text-sm sm:text-base text-primary-light font-semibold transition-colors duration-200 hover:text-accent">
                Haz clic para probar →
              </span>
            </div>
          </Card>
        </SwiperSlide>

        <!-- Cifrado Vigenère -->
        <SwiperSlide>
          <Card 
            variant="glass" 
            :interactive="true"
            class="flex flex-col gap-4 sm:gap-6 items-start cursor-pointer animate-slide-in text-left p-4 sm:p-6"
            @click="$router.push('/vigenere')">
            
            <div class="flex items-center gap-4 w-full">
              <font-awesome-icon 
                :icon="['fas', 'key']"
                class="text-5xl sm:text-6xl shrink-0 text-warning drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              
              <div class="flex-1 min-w-0">
                <h2 class="text-xl sm:text-2xl font-bold text-text-primary mb-1 truncate">
                  Cifrado Vigenère
                </h2>
                <span class="px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase bg-warning/20 text-warning inline-block">
                  Medio
                </span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
              Cifrado polialfabético que utiliza una palabra clave para determinar
              el desplazamiento de cada letra.
            </p>

            <div class="flex flex-col gap-1 w-full text-xs sm:text-sm">
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Tipo:</strong> Sustitución polialfabética
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Seguridad:</strong> Media
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Época:</strong> Siglo XVI
              </div>
            </div>

            <div class="pt-3 sm:pt-4 border-t border-white/10 w-full">
              <span class="text-sm sm:text-base text-primary-light font-semibold transition-colors duration-200 hover:text-accent">
                Haz clic para probar →
              </span>
            </div>
          </Card>
        </SwiperSlide>

        <!-- Transposición Columnar -->
        <SwiperSlide>
          <Card 
            variant="glass" 
            :interactive="true"
            class="flex flex-col gap-4 sm:gap-6 items-start cursor-pointer animate-slide-in text-left p-4 sm:p-6"
            @click="$router.push('/transposicion')">
            
            <div class="flex items-center gap-4 w-full">
              <font-awesome-icon 
                :icon="['fas', 'chart-bar']"
                class="text-5xl sm:text-6xl shrink-0 text-warning drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              
              <div class="flex-1 min-w-0">
                <h2 class="text-lg sm:text-xl font-bold text-text-primary mb-1">
                  Transposición Columnar
                </h2>
                <span class="px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase bg-warning/20 text-warning inline-block">
                  Medio
                </span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
              Reorganiza las letras del mensaje escribiéndolas en filas y leyéndolas
              por columnas. No cambia las letras, solo su orden.
            </p>

            <div class="flex flex-col gap-1 w-full text-xs sm:text-sm">
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Tipo:</strong> Transposición
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Seguridad:</strong> Media
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Época:</strong> Antigüedad
              </div>
            </div>

            <div class="pt-3 sm:pt-4 border-t border-white/10 w-full">
              <span class="text-sm sm:text-base text-primary-light font-semibold transition-colors duration-200 hover:text-accent">
                Haz clic para probar →
              </span>
            </div>
          </Card>
        </SwiperSlide>

        <!-- Cifrado XOR -->
        <SwiperSlide>
          <Card 
            variant="glass" 
            :interactive="true"
            class="flex flex-col gap-4 sm:gap-6 items-start cursor-pointer animate-slide-in text-left p-4 sm:p-6"
            @click="$router.push('/xor')">
            
            <div class="flex items-center gap-4 w-full">
              <font-awesome-icon 
                :icon="['fas', 'gear']"
                class="text-5xl sm:text-6xl shrink-0 text-error drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              
              <div class="flex-1 min-w-0">
                <h2 class="text-xl sm:text-2xl font-bold text-text-primary mb-1 truncate">
                  Cifrado XOR
                </h2>
                <span class="px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase bg-error/20 text-error inline-block">
                  Avanzado
                </span>
              </div>
            </div>

            <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
              Operación binaria que compara cada bit del mensaje con cada bit de la clave.
              Es la base de muchos cifrados modernos.
            </p>

            <div class="flex flex-col gap-1 w-full text-xs sm:text-sm">
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Tipo:</strong> Operación binaria
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Seguridad:</strong> Alta
              </div>
              <div class="text-text-muted">
                <strong class="text-text-secondary mr-1">Época:</strong> Moderna
              </div>
            </div>

            <div class="pt-3 sm:pt-4 border-t border-white/10 w-full">
              <span class="text-sm sm:text-base text-primary-light font-semibold transition-colors duration-200 hover:text-accent">
                Haz clic para probar →
              </span>
            </div>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import Card from '../components/ui/Card.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default {
  name: 'AlgorithmsList',
  components: {
    Card,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectCards],
    };
  },
};
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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

:deep(.swiper) {
  overflow: visible !important;
}

:deep(.swiper-wrapper) {
  padding-bottom: 20px;
}
</style>