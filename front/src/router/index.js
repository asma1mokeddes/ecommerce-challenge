import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '../views/ProductsPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import CartPage from '../views/CartPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage,
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    props: true, // Permet de passer les paramètres de l'URL comme des props au composant
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/',
    redirect: '/products', // Redirection par défaut
  },
  {
    path: '/:catchAll(.*)', // Utilisation de ":catchAll(.*)" pour la route catch-all
    component: NotFoundPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
