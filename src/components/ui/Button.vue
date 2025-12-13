<template>
  <button :class="[
    'inline-flex items-center justify-center gap-2 font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden font-sans',
    variantClass,
    sizeClass,
    { 'cursor-wait opacity-80': loading, 'opacity-50 cursor-not-allowed': disabled }
  ]" :disabled="disabled || loading">
    <div v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    variantClass() {
      const variants = {
        primary: 'bg-gradient-to-br from-primary to-secondary text-white shadow-md hover:shadow-glow hover:-translate-y-0.5',
        secondary: 'bg-bg-tertiary text-text-primary border border-white/10 hover:bg-bg-secondary hover:border-primary',
        outline: 'bg-transparent text-primary-light border-2 border-primary hover:bg-primary hover:text-white',
        ghost: 'bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary'
      };


      if (this.disabled || this.loading) {
        return variants[this.variant].replace(/hover:[^ ]+/g, '');
      }

      return variants[this.variant];
    },
    sizeClass() {
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-4 text-base',
        lg: 'px-8 py-6 text-lg'
      };
      return sizes[this.size];
    }
  },
};
</script>

<style scoped>
button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:active::before {
  width: 300px;
  height: 300px;
}
</style>
