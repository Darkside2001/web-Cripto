<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4">Algoritmos de Cifrado Clásico</h1>
        <p class="text-lg text-text-secondary leading-relaxed">
          Explora nuestra colección de algoritmos criptográficos históricos.
          Cada uno jugó un papel importante en la historia de la comunicación segura.
        </p>
      </div>

      <Swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="max-w-[400px] mx-auto">
        <SwiperSlide>
          <Card variant="glass" :interactive="true"
            class="flex flex-col md:flex-row gap-8 items-start cursor-pointer animate-slide-in text-left"
            @click="$router.push('/cesar')">
            <font-awesome-icon :icon="['fas', 'font']"
              class="text-7xl shrink-0 text-success drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] mx-auto md:mx-0" />
            <div class="flex-1 w-full">
              <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                <h2 class="text-2xl font-bold text-text-primary m-0">Cifrado César</h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-success/20 text-success">Fácil</span>
              </div>
              <p class="text-text-secondary leading-relaxed mb-6">
                El cifrado César es uno de los métodos de cifrado más antiguos y simples.
                Desplaza cada letra del alfabeto un número fijo de posiciones. Utilizado
                por Julio César para proteger mensajes militares.
              </p>
              <div class="flex flex-col gap-1 mb-4">
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Tipo:</strong> Sustitución monoalfabética
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Seguridad:</strong> Baja (25 posibles claves)
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Época:</strong> Siglo I a.C.
                </div>
              </div>
              <div class="pt-4 border-t border-white/10">
                <span class="text-primary-light font-semibold transition-colors duration-200 hover:text-accent">Haz clic
                  para probar →</span>
              </div>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card variant="glass" :interactive="true"
            class="flex flex-col md:flex-row gap-8 items-start cursor-pointer animate-slide-in text-left"
            @click="$router.push('/vigenere')">
            <font-awesome-icon :icon="['fas', 'key']"
              class="text-7xl shrink-0 text-warning drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] mx-auto md:mx-0" />
            <div class="flex-1 w-full">
              <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                <h2 class="text-2xl font-bold text-text-primary m-0">Cifrado Vigenère</h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-warning/20 text-warning">Medio</span>
              </div>
              <p class="text-text-secondary leading-relaxed mb-6">
                Cifrado polialfabético que utiliza una palabra clave para determinar
                el desplazamiento de cada letra. Fue considerado "indescifrable" durante
                siglos hasta que Charles Babbage lo rompió en el siglo XIX.
              </p>
              <div class="flex flex-col gap-1 mb-4">
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Tipo:</strong> Sustitución polialfabética
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Seguridad:</strong> Media (depende de la clave)
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Época:</strong> Siglo XVI
                </div>
              </div>
              <div class="pt-4 border-t border-white/10">
                <span class="text-primary-light font-semibold transition-colors duration-200 hover:text-accent">Haz clic
                  para probar →</span>
              </div>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card variant="glass" :interactive="true"
            class="flex flex-col md:flex-row gap-8 items-start cursor-pointer animate-slide-in text-left"
            @click="$router.push('/transposicion')">
            <font-awesome-icon :icon="['fas', 'chart-bar']"
              class="text-7xl shrink-0 text-warning drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] mx-auto md:mx-0" />
            <div class="flex-1 w-full">
              <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                <h2 class="text-2xl font-bold text-text-primary m-0">Transposición Columnar</h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-warning/20 text-warning">Medio</span>
              </div>
              <p class="text-text-secondary leading-relaxed mb-6">
                A diferencia de los cifrados de sustitución, la transposición columnar
                reorganiza las letras del mensaje escribiéndolas en filas y leyéndolas
                por columnas. No cambia las letras, solo su orden.
              </p>
              <div class="flex flex-col gap-1 mb-4">
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Tipo:</strong> Transposición
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Seguridad:</strong> Media
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Época:</strong> Antigüedad
                </div>
              </div>
              <div class="pt-4 border-t border-white/10">
                <span class="text-primary-light font-semibold transition-colors duration-200 hover:text-accent">Haz clic
                  para probar →</span>
              </div>
            </div>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card variant="glass" :interactive="true"
            class="flex flex-col md:flex-row gap-8 items-start cursor-pointer animate-slide-in text-left"
            @click="$router.push('/xor')">
            <font-awesome-icon :icon="['fas', 'gear']"
              class="text-7xl shrink-0 text-error drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] mx-auto md:mx-0" />
            <div class="flex-1 w-full">
              <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                <h2 class="text-2xl font-bold text-text-primary m-0">Cifrado XOR</h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-error/20 text-error">Avanzado</span>
              </div>
              <p class="text-text-secondary leading-relaxed mb-6">
                Operación binaria que compara cada bit del mensaje con cada bit de la clave.
                Es la base de muchos cifrados modernos y tiene la propiedad única de que
                el mismo proceso sirve para cifrar y descifrar.
              </p>
              <div class="flex flex-col gap-1 mb-4">
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Tipo:</strong> Operación binaria
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Seguridad:</strong> Alta (con clave adecuada)
                </div>
                <div class="text-sm text-text-muted">
                  <strong class="text-text-secondary mr-1">Época:</strong> Moderna
                </div>
              </div>
              <div class="pt-4 border-t border-white/10">
                <span class="text-primary-light font-semibold transition-colors duration-200 hover:text-accent">Haz clic
                  para probar →</span>
              </div>
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
</style>
