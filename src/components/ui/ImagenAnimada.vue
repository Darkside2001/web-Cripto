<template>
  <DotLottieVue 
    v-if="isLoaded"
    :style="{height: alto, width: ancho}" 
    autoplay 
    loop 
    :src="enlace"
    @load="onLoad"
    @error="onError"
  />
</template>

<script>
import { ref, onMounted } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

export default {
  name: 'ImagenAnimada',
  props: {
    enlace: {
      type: String,
      default: 'https://path-to-lottie.lottie',
      validator: (value) => value.endsWith('.json') || value.endsWith('.lottie'),
    },
    ancho: {
      type: String,
      default: '500px'
    },
    alto: {
      type: String,
      default: '500px'
    }
  },
  components: {
    DotLottieVue
  },
  emits: ['loaded', 'error'],
  setup(props, { emit }) {
    const isLoaded = ref(false);
    onMounted(async () => {
      try {
        const response = await fetch(props.enlace);
        
        if (response.ok) {
          await response.blob();
          isLoaded.value = true;
          setTimeout(() => {
            emit('loaded');
          }, 100);
        } else {
          throw new Error('Error al cargar la animación');
        }
      } catch (error) {
        console.error('Error precargando Lottie:', error);
        isLoaded.value = true;
        emit('error', error);
      }
    });

    const onLoad = () => {
      emit('loaded');
    };

    const onError = (error) => {
      emit('error', error);
    };

    return {
      isLoaded,
      onLoad,
      onError
    };
  }
};
</script>