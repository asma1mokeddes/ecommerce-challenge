export const brandsRoutes = [
    {
        meta: {
            title: "Marques",
        },
        path: "/brands",
        name: "brands",
        component: () => import("@/views/brands/BrandManagement.vue"),
    },
    {
        meta: {
            title: "Créer une marque",
        },
        path: "/brands/create",
        name: "brandsCreate",
        component: () => import("@/views/brands/CreateBrand.vue"),
    },
];
