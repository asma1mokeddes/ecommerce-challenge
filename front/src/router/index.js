import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/utils/auth";
import { usersRoutes } from "./users";
import { categoriesRoutes } from "./categories";
import { brandsRoutes } from "./brands";
import { promosRoutes } from "./promos";
import { productsRoutes } from "./products";
import { cartRoutes } from "./cart";

const routes = [
    ...usersRoutes,
    ...categoriesRoutes,
    ...brandsRoutes,
    ...promosRoutes,
    ...productsRoutes,
    ...cartRoutes,
    {
        meta: {
            title: "Login",
        },
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
    },
    {
        path: "/",
        redirect: "/home",
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
            title: "Faq",
        },
        path: "/faq",
        name: "faq",
        component: () => import("@/views/Faq.vue"),
    },
    {
        meta: {
            title: "Reset",
        },
        path: "/reset-password",
        name: "reset",
        component: () => import("@/views/ResetPassword.vue"),
    },
    {
        meta: {
            title: "Reset",
        },
        path: "/reset-password-page",
        name: "resetPasswordPage",
        component: () => import("@/views/ResetPasswordPage.vue"),
    },

    {
        meta: {
            title: "Faq",
        },
        path: "/politique-de-confidentialite",
        name: "politiqueDeConfidentialite",
        component: () => import("@/views/PolitiqueDeConfidentialite.vue"),
    },
    {
        meta: {
            title: "ConditionsGeneralesVente",
        },
        path: "/conditions-generales-vente",
        name: "ConditionsGeneralesVente",
        component: () => import("@/views/ConditionsGeneralesVente.vue"),
    },
    {
        meta: {
            title: "Mentions légales",
        },
        path: "/mentions-legales",
        name: "mentionsLegales",
        component: () => import("@/views/MentionsLegales.vue"),
    },
    {
        meta: {
            title: "Contact",
        },
        path: "/contact",
        name: "contact",
        component: () => import("@/views/Contact.vue"),
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

/**
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
 */
export default router;
