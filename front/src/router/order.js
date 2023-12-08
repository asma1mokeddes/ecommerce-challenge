export const ordersRoutes = [
    {
        meta: {
            title: "Commandes",
        },
        path: "/orders",
        name: "orders",
        component: () => import("@/views/orders/OrderView.vue"),
    },
    {
        meta: {
            title: "Commandes de l'utilisateur",
        },
        path: "/orders/user/:userId",
        name: "ordersUser",
        component: () => import("@/views/orders/OrderUserView.vue"),
    },    
    {
        meta: {
            title: "Valider une commande",
        },
        path: "/orders/validation/:orderId",
        name: "orderConfirmation",
        component: () => import("@/views/orders/OrderValidateView.vue"),
    },
    {
        meta: {
            title: "Modifier une commande",
        },
        path: "/orders/update/:orderId",
        name: "ordersUpdate",
        component: () => import("@/views/orders/OrderUpdateView.vue"),
    },
];
