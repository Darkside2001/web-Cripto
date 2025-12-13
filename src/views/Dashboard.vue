<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-12 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_70%)]">
      <div class="container mx-auto px-6">
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

            <!-- Columna derecha: Imagen -->
            <div class="flex justify-center lg:justify-end order-1 lg:order-2">
              <ImagenAnimada 
                enlace="https://lottie.host/a133635c-aee1-4305-944b-b9d02b725026/Yf7Irj4d7N.lottie"
                ancho="400px" 
                alto="400px" 
                class="max-w-[400px]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import ImagenAnimada from '../components/ui/ImagenAnimada.vue';

export default {
  name: 'Dashboard',
  components: {
    Card,
    Button,
    ImagenAnimada
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
