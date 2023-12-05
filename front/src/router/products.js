export const productsRoutes = [
    {
        meta: {
            title: "Produits",
        },
        path: "/products",
        name: "products",
        component: () => import("@/views/products/ProductsPage.vue"),
    },
    {
        path: "/products/:id",
        name: "product",
        component: () => import("@/views/products/ProductDetailPage.vue"),
        meta: {
            title: "Détails du Produit",
        },
    },    
    {
        meta: {
            title: "Créer une catégorie",
        },
        path: "/products/create",
        name: "productsCreate",
        component: () => import("@/views/products/ProductCreation.vue"),
    },
];
