<template>
  <!-- Hero Section con altura completa y centrado vertical -->
  <section class="min-h-screen flex items-center bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_70%)]">
    <div class="container mx-auto px-6 py-12">
      <div class="max-w-6xl mx-auto animate-fade-in">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- Columna izquierda: Texto y botones -->
          <div class="text-center lg:text-left order-2 lg:order-1">
            <h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Algoritmos Criptográficos Clásicos
            </h1>
            <p class="text-xl text-text-secondary mb-8 leading-relaxed">
              A continuación veremos algunos de los algoritmos criptográficos más conocidos 
              y utilizados a lo largo de la historia.
            </p>
            <div class="flex gap-4 justify-center lg:justify-start flex-wrap">
              <Button variant="primary" size="lg" @click="$router.push('/algorithms')">
                Explorar Algoritmos
              </Button>
              <Button variant="outline" size="lg" @click="$router.push('/help')">
                Aprender Más
              </Button>
            </div>
          </div>

          <!-- Columna derecha: Animación con loading -->
          <div class="flex justify-center lg:justify-end order-1 lg:order-2">
            <!-- Skeleton loader mientras carga -->
            <div v-if="isLoadingAnimation" 
                 class="w-[400px] h-[400px] bg-slate-700/30 animate-pulse rounded-lg flex items-center justify-center">
              <div class="text-slate-500">Cargando...</div>
            </div>
            
            <!-- Animación Lottie -->
            <ImagenAnimada 
              v-else
              enlace="/public/imagenesAnimadas/criptografiaAnimacion.lottie"
              ancho="500px" 
              alto="500px" 
              class="max-w-[400px]"
              @loaded="onAnimationLoaded" />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import ImagenAnimada from '../components/ui/ImagenAnimada.vue';

export default {
  name: 'Dashboard',
  components: {
    Card,
    Button,
    ImagenAnimada
  },
  setup() {
    const isLoadingAnimation = ref(true);

    // Simula el tiempo de carga inicial
    onMounted(() => {
      // Timeout de seguridad por si el evento loaded no se dispara
      setTimeout(() => {
        isLoadingAnimation.value = false;
      }, 2000);
    });

    const onAnimationLoaded = () => {
      isLoadingAnimation.value = false;
    };

    return {
      isLoadingAnimation,
      onAnimationLoaded
    };
  }
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