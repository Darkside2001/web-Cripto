<template>
  <div class="mb-6">
    <label v-if="label" :for="inputId"
      class="block mb-2 text-sm font-semibold text-text-secondary transition-colors duration-150">
      {{ label }}
      <span v-if="required" class="text-error ml-0.5">*</span>
    </label>

    <textarea v-if="type === 'textarea'" :id="inputId" :value="modelValue" :placeholder="placeholder" :rows="rows"
      :disabled="disabled" :class="[
        'w-full p-4 font-sans text-base text-text-primary bg-bg-secondary border-2 border-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-bg-tertiary resize-y min-h-[100px]',
        { 'border-error focus:ring-error/10': error }
      ]" @input="handleInput" @focus="handleFocus" @blur="handleBlur"></textarea>

    <input v-else :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      :min="min" :max="max" :step="step" :class="[
        'w-full p-4 font-sans text-base text-text-primary bg-bg-secondary border-2 border-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-bg-tertiary',
        { 'border-error focus:ring-error/10': error }
      ]" @input="handleInput" @focus="handleFocus" @blur="handleBlur" />

    <div v-if="showCounter && type === 'textarea'" class="mt-1 text-xs text-text-muted text-right">
      {{ characterCount }}{{ maxLength ? ` / ${maxLength}` : '' }}
    </div>

    <div v-if="error" class="mt-1 text-sm text-error">
      {{ error }}
    </div>

    <div v-if="hint && !error" class="mt-1 text-sm text-text-muted">
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      inputId: `input-${Math.random().toString(36).substr(2, 9)}`,
      isFocused: false
    };
  },
  computed: {
    characterCount() {
      return String(this.modelValue).length;
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleFocus() {
      this.isFocused = true;
      this.$emit('focus');
    },
    handleBlur() {
      this.isFocused = false;
      this.$emit('blur');
    }
  }
};
</script>
