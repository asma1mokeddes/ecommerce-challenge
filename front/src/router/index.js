import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "../views/ProductsPage.vue";
import ProductDetailPage from "../views/ProductDetailPage.vue";
import CartPage from "../views/CartPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import HomePage from "../views/HomePage.vue";
import Connexion from "../views/Connexion.vue";
import Inscription from "../views/Inscription.vue";
import PromoManagement from "../views/PromoManagement.vue";
import PromoCreation from "../views/CreatePromo.vue";
const routes = [
    {
        path: "/promos",
        name: "Promos",
        component: PromoManagement,
    },
    {
        path: "/promos/create",
        name: "PromoCreation",
        component: PromoCreation,
    },
    {
        path: "/home",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/products",
        name: "Products",
        component: ProductsPage,
    },
    {
        path: "/products/:id",
        name: "ProductDetail",
        component: ProductDetailPage,
        props: true, // Permet de passer les paramètres de l'URL comme des props au composant
    },
    {
        path: "/cart",
        name: "Cart",
        component: CartPage,
    },
    {
        path: "/",
        redirect: "/products", // Redirection par défaut
    },
    {
        path: "/:catchAll(.*)", // Utilisation de ":catchAll(.*)" pour la route catch-all
        component: NotFoundPage,
    },
    {
        path: "/connexion",
        name: "Connexion",
        component: Connexion,
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: Inscription,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
