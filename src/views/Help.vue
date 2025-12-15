<template>
  <div class="min-h-screen py-12">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold mb-4"><font-awesome-icon :icon="['fas', 'question-circle']"
            class="mr-2 text-primary" /> Glosario y Repositorio</h1>
        
      </div>

      <div class="max-w-4xl mx-auto flex flex-col gap-12">

        <!-- Algorithm Comparison -->
        <Card variant="default" class="[&>h2]:text-2xl [&>h2]:mb-6 [&>h2]:text-text-primary">
          <h2><font-awesome-icon :icon="['fas', 'scale-balanced']" class="mr-2 text-primary" /> Enlace del Repositorio</h2>
          <p class="mt-4 text-sm text-text-muted">
            El repositorio del proyecto CryptoWeb está disponible en GitHub en el siguiente enlace:
            <a href="https://github.com/Darkside2001/web-Cripto.git" target="_blank">https://github.com/Darkside2001/web-Cripto.git</a>
          </p>
        </Card>

        <!-- Cryptography Basics -->
        <Card variant="default" class="[&>h2]:text-2xl [&>h2]:mb-6 [&>h2]:text-text-primary">
          <h2><font-awesome-icon :icon="['fas', 'lock']" class="mr-2 text-primary" /> Conceptos Básicos de Criptografía
          </h2>

          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 text-text-primary">¿Qué es la Criptografía?</h3>
            <p class="leading-relaxed mb-4 text-text-secondary">
              La criptografía es la ciencia de proteger información mediante técnicas
              de cifrado. Transforma un mensaje legible (texto plano) en un mensaje
              ilegible (texto cifrado) que solo puede ser leído por quien tenga la clave.
            </p>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 text-text-primary">Terminología Importante</h3>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Texto Plano:</strong>
                <span class="text-text-secondary">El mensaje original sin cifrar</span>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Texto Cifrado:</strong>
                <span class="text-text-secondary">El mensaje después de aplicar el cifrado</span>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Clave:</strong>
                <span class="text-text-secondary">Información secreta usada para cifrar/descifrar</span>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Cifrado:</strong>
                <span class="text-text-secondary">Proceso de convertir texto plano en texto cifrado</span>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Descifrado:</strong>
                <span class="text-text-secondary">Proceso de convertir texto cifrado en texto plano</span>
              </div>
              <div class="flex flex-col gap-1 p-4 bg-bg-secondary rounded-lg border-l-4 border-primary">
                <strong class="text-primary-light text-lg">Criptoanálisis:</strong>
                <span class="text-text-secondary">Ciencia de romper cifrados sin conocer la clave</span>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 text-text-primary">Tipos de Cifrados Clásicos</h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 mt-4">
              <div class="p-6 bg-bg-secondary rounded-lg border border-white/10">
                <h4 class="text-lg font-semibold mb-2 text-primary-light">Sustitución</h4>
                <p class="text-text-secondary m-0">
                  Reemplaza cada letra por otra letra o símbolo.
                  Ejemplos: César, Vigenère
                </p>
              </div>
              <div class="p-6 bg-bg-secondary rounded-lg border border-white/10">
                <h4 class="text-lg font-semibold mb-2 text-primary-light">Transposición</h4>
                <p class="text-text-secondary m-0">
                  Reorganiza las letras del mensaje sin cambiarlas.
                  Ejemplo: Transposición Columnar
                </p>
              </div>
              <div class="p-6 bg-bg-secondary rounded-lg border border-white/10">
                <h4 class="text-lg font-semibold mb-2 text-primary-light">Operaciones Binarias</h4>
                <p class="text-text-secondary m-0">
                  Trabaja a nivel de bits usando operaciones lógicas.
                  Ejemplo: XOR
                </p>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/ui/Card.vue';

export default {
  name: 'Help',
  components: {
    Card
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

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>
