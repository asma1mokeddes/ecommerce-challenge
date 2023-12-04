export const promosRoutes = [
    {
        meta: {
            title: "Promotions",
        },
        path: "/promos",
        name: "promos",
        component: () => import("@/views/promos/PromoManagement.vue"),
    },
    {
        meta: {
            title: "Créer une promotion",
        },
        path: "/promos/create",
        name: "promosCreate",
        component: () => import("@/views/promos/CreatePromo.vue"),
    },
];
