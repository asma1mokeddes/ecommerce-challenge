import { mdiAccount, mdiLogout } from "@mdi/js";

export default [
    {
        isCurrentUser: true,
        menu: [
            {
                icon: mdiAccount,
                label: "Mon profil",
                to: "/profile",
            },
            {
                icon: mdiLogout,
                label: "Déconnexion",
                isLogout: true,
            },
            {
                isDivider: true,
            },
        ],
    },
];
