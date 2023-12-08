export const promosRoutes = [
    {
        meta: {
            title: "Promotions",
        },
        path: "/promos",
        name: "promos",
        component: () => import("@/views/promos/PromoView.vue"),
    },
    {
        meta: {
            title: "Créer une promotion",
        },
        path: "/promos/create",
        name: "promosCreate",
        component: () => import("@/views/promos/PromoCreate.vue"),
    },
];
