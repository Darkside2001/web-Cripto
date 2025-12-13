<template>
  <DotLottieVue :style="{height: alto, width: ancho}" autoplay loop :src="enlace" />
</template>

<script>
  import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
  export default {
    name: 'ImagenAnimada',
    props: {
      enlace: {
        type: String,
        default: 'https://path-to-lottie.lottie',
        validator: (value) => value.endsWith('.lottie'),
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

  };
</script>