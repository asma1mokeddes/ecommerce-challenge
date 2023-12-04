export const usersRoutes = [
    {
        meta: {
            title: "Utilisateurs",
        },
        path: "/users",
        name: "users",
        component: () => import("@/views/users/UserView.vue"),
    },
    {
        meta: {
            title: "Créer un utilisateur",
        },
        path: "/users/create",
        name: "usersCreate",
        component: () => import("@/views/users/UserCreate.vue"),
    },
    {
        meta: {
            title: "Modifier un utilisateur",
        },
        path: "/users/update/:userId",
        name: "usersUpdate",
        component: () => import("@/views/users/UsersUpdateView.vue"),
    },
];
