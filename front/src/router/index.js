import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/utils/auth";
import { usersRoutes } from "./users";
import { categoriesRoutes } from "./categories";
import { brandsRoutes } from "./brands";
import { promosRoutes } from "./promos";

const routes = [
    ...usersRoutes,
    ...categoriesRoutes,
    ...brandsRoutes,
    ...promosRoutes,
    {
        meta: {
            title: "Login",
        },
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
    },
    {
        meta: {
            title: "Home",
        },
        path: "/home",
        name: "home",
        component: () => import("@/views/HomePage.vue"),
    },
    {
        meta: {
            title: "Inscription",
        },
        path: "/inscription",
        name: "inscription",
        component: () => import("@/views/Inscription.vue"),
    },
    {
        meta: {
            title: "Error",
        },
        path: "/error",
        name: "error",
        component: () => import("@/views/ErrorView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});

/** 
router.beforeEach((to, from, next) => {
    const isLoginOrInscription =
        to.path === "/login" || to.path === "/inscription";

    if (!isAuthenticated() && !isLoginOrInscription) {
        next("/login");
    } else {
        next();
    }
}); */

router.beforeEach((to, from, next) => {
    const isLoginOrInscription =
        to.path === "/login" || to.path === "/inscription";

    if (isAuthenticated()) {
        // L'utilisateur est authentifié
        if (isLoginOrInscription) {
            // S'il est déjà authentifié, redirigez-le vers la page d'accueil ou une autre page appropriée
            next("/");
        } else {
            // L'utilisateur est authentifié et n'essaie pas d'accéder à la page de connexion ou d'inscription
            next();
        }
    } else {
        // L'utilisateur n'est pas authentifié
        if (isLoginOrInscription) {
            // L'utilisateur n'est pas authentifié, mais essaie d'accéder à la page de connexion ou d'inscription
            next();
        } else {
            // L'utilisateur n'est pas authentifié et n'essaie pas d'accéder à la page de connexion ou d'inscription
            next("/login");
        }
    }
});

export default router;
