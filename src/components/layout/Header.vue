<template>
  <header class="sticky top-0 z-[1020] bg-[#0f172a]/80 backdrop-blur-[20px] border-b border-white/10 py-4">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between">
        <router-link to="/"
          class="flex items-center gap-2 no-underline transition-transform duration-200 hover:scale-105 group">
          <font-awesome-icon :icon="['fas', 'lock']"
            class="text-2xl text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          <span
            class="text-xl font-extrabold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">CryptoWeb</span>
        </router-link>

        <nav class="hidden md:flex gap-6">
          <router-link to="/"
            class="nav-link relative text-text-secondary no-underline font-medium py-2 transition-colors duration-150 hover:text-text-primary">Inicio</router-link>
          <router-link to="/algorithms"
            class="nav-link relative text-text-secondary no-underline font-medium py-2 transition-colors duration-150 hover:text-text-primary">Algoritmos</router-link>
          <router-link to="/help"
            class="nav-link relative text-text-secondary no-underline font-medium py-2 transition-colors duration-150 hover:text-text-primary">Repositorio</router-link>
        </nav>

        <button
          class="md:hidden flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer p-0"
          @click="toggleMobileMenu">
          <span class="hamburger relative w-6 h-0.5 bg-text-primary transition-all duration-200"
            :class="{ 'bg-transparent': mobileMenuOpen }">
            <span class="absolute w-6 h-0.5 bg-text-primary transition-all duration-200 -top-2 left-0"
              :class="{ 'top-0 rotate-45': mobileMenuOpen }"></span>
            <span class="absolute w-6 h-0.5 bg-text-primary transition-all duration-200 -bottom-2 left-0"
              :class="{ 'bottom-0 -rotate-45': mobileMenuOpen }"></span>
          </span>
        </button>
      </div>
    </div>

    <transition enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in" enter-from-class="opacity-0 -translate-y-2.5"
      leave-to-class="opacity-0 -translate-y-2.5">
      <div v-if="mobileMenuOpen"
        class="absolute top-full left-0 right-0 bg-[#0f172a]/95 backdrop-blur-[20px] border-b border-white/10 p-6 flex flex-col gap-4">
        <router-link to="/"
          class="text-text-secondary no-underline font-medium p-4 rounded-md transition-all duration-150 hover:text-text-primary hover:bg-primary/10"
          @click="closeMobileMenu">Inicio</router-link>
        <router-link to="/algorithms"
          class="text-text-secondary no-underline font-medium p-4 rounded-md transition-all duration-150 hover:text-text-primary hover:bg-primary/10"
          @click="closeMobileMenu">Algoritmos</router-link>
        <router-link to="/help"
          class="text-text-secondary no-underline font-medium p-4 rounded-md transition-all duration-150 hover:text-text-primary hover:bg-primary/10"
          @click="closeMobileMenu">Ayuda</router-link>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      mobileMenuOpen: false
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu();
    }
  }
};
</script>

<style scoped>
@reference "../../assets/styles/main.css";

/* Custom pseudo-element for nav link underline which is hard to do with standard utilities alone without extensive arbitrary values */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  transition: width 0.25s ease-in-out;
}

.nav-link.router-link-active {
  @apply text-text-primary;
}

.nav-link.router-link-active::after {
  width: 100%;
}

.router-link-active {
  @apply text-text-primary;
}
</style>
