export const categoriesRoutes = [
    {
        meta: {
            title: "Catégories",
        },
        path: "/categories",
        name: "categories",
        component: () => import("@/views/categories/CategoryManagement.vue"),
    },
    {
        meta: {
            title: "Créer une catégorie",
        },
        path: "/categories/create",
        name: "categoriesCreate",
        component: () => import("@/views/categories/CreateCategory.vue"),
    },
];
