export const cartRoutes = [
    {
        meta: {
            title: "Cart",
        },
        path: "/cart",
        name: "cart",
        component: () => import("@/views/CartPage.vue"),
    },
];
