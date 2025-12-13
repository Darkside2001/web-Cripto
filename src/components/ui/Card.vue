<template>
  <div :class="[
    'p-8 rounded-2xl transition-all duration-200',
    variantClass,
    { 'cursor-pointer  hover:shadow-xl': interactive }
  ]" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'gradient', 'glass'].includes(value)
    },
    interactive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    variantClass() {
      const variants = {
        default: 'bg-bg-card backdrop-blur-md border border-white/10 shadow-lg hover:border-primary/30',
        glass: 'bg-[#1e293b] backdrop-blur-xl border border-white/15 shadow-xl hover:border-primary/30',
        gradient: 'bg-gradient-primary border-none shadow-lg shadow-glow text-white hover:shadow-xl hover:shadow-glow-accent'
      };
      return variants[this.variant];
    }
  },
  methods: {
    handleClick(event) {
      if (this.interactive) {
        this.$emit('click', event);
      }
    }
  }
};
</script>
