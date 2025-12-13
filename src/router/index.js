import { createRouter, createWebHistory } from 'vue-router';

// Lazy load views for better performance
const Dashboard = () => import('../views/Dashboard.vue');
const AlgorithmsList = () => import('../views/AlgorithmsList.vue');
const CesarView = () => import('../views/CesarView.vue');
const VigenereView = () => import('../views/VigenereView.vue');
const TranspositionView = () => import('../views/TranspositionView.vue');
const XorView = () => import('../views/XorView.vue');
const Help = () => import('../views/Help.vue');

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'CryptoLab - Inicio'
    }
  },
  {
    path: '/algorithms',
    name: 'AlgorithmsList',
    component: AlgorithmsList,
    meta: {
      title: 'Algoritmos - CryptoLab'
    }
  },
  {
    path: '/cesar',
    name: 'Cesar',
    component: CesarView,
    meta: {
      title: 'Cifrado César - CryptoLab'
    }
  },
  {
    path: '/vigenere',
    name: 'Vigenere',
    component: VigenereView,
    meta: {
      title: 'Cifrado Vigenère - CryptoLab'
    }
  },
  {
    path: '/transposicion',
    name: 'Transposition',
    component: TranspositionView,
    meta: {
      title: 'Transposición Columnar - CryptoLab'
    }
  },
  {
    path: '/xor',
    name: 'Xor',
    component: XorView,
    meta: {
      title: 'Cifrado XOR - CryptoLab'
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      title: 'Ayuda - CryptoLab'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'CryptoLab';
  next();
});

export default router;
