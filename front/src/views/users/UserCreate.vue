<template>
    <section class="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form
            novalidate=""
            action=""
            class="container flex flex-col mx-auto space-y-12"
        >
            <fieldset
                class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900"
            >
                <div class="space-y-2 col-span-full lg:col-span-1">
                    <p class="font-medium">
                        Création d'Utilisateur (Réservée aux Administrateurs)
                    </p>
                    <p class="text-xs">
                        Pour des raisons de sécurité, la création d'utilisateur
                        est réservée aux administrateurs du site. Veuillez vous
                        connecter en tant qu'administrateur pour accéder à cette
                        fonctionnalité.
                    </p>
                </div>

                <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div class="col-span-full sm:col-span-3">
                        <label for="firstname" class="text-sm">Nom</label>
                        <input
                            id="firstname"
                            type="text"
                            placeholder="Nom"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>
                    <div class="col-span-full sm:col-span-3">
                        <label for="lastname" class="text-sm">Prénom</label>
                        <input
                            id="lastname"
                            type="text"
                            placeholder="Prénom"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>
                    <div class="col-span-full">
                        <label for="address" class="text-sm"
                            >Addresse email</label
                        >
                        <input
                            id="address"
                            type="text"
                            placeholder="Address email"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>
                    <div class="col-span-full sm:col-span-2">
                        <label for="dateOfBirth" class="text-sm"
                            >Date de naissance</label
                        >
                        <input
                            id="dateOfBirth"
                            type="date"
                            placeholder="Date de naissance"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>

                    <div class="col-span-full sm:col-span-2">
                        <label for="password" class="text-sm"
                            >Mot de passe</label
                        >
                        <input
                            id="password"
                            type="text"
                            placeholder="Mot de passe"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset
                class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900"
            >
                <div class="space-y-2 col-span-full lg:col-span-1">
                    <p class="font-medium">Profile</p>
                    <p class="text-xs">Adipisci fuga autem eum!</p>
                </div>
                <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div class="col-span-full sm:col-span-3">
                        <label for="username" class="text-sm">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                        />
                    </div>
                    <div class="col-span-full sm:col-span-3">
                        <label for="website" class="text-sm">Website</label>
                        <input
                            id="website"
                            type="text"
                            placeholder="https://"
                            class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                        />
                    </div>
                    <div class="col-span-full">
                        <label for="bio" class="text-sm">Bio</label>
                        <textarea
                            id="bio"
                            placeholder=""
                            class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                        ></textarea>
                    </div>
                    <div class="col-span-full">
                        <label for="bio" class="text-sm">Photo</label>
                        <div class="flex items-center space-x-2">
                            <img
                                src="https://source.unsplash.com/30x30/?random"
                                alt=""
                                class="w-10 h-10 rounded-full dark:bg-gray-500 dark:bg-gray-700"
                            />
                            <button
                                type="button"
                                class="px-4 py-2 border rounded-md dark:border-gray-100"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </section>
    <button
        type="button"
        class="margin absolute bottom-4 left-4 px-8 py-3 font-semibold rounded-full bg-indigo-300 text-gray-800"
    >
        Créer l'utilisateur
    </button>
</template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            dateOfBirth: "",
            role: "",
        };
    },

    methods: {
        async createUser() {
            try {
                await axios({
                    baseURL: "BASE_URL",
                    method: "POST",
                    url: "/users/create",
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailAddress: this.emailAddress,
                        password: this.password,
                        dateOfBirth: this.dateOfBirth,
                        role: this.role,
                    },
                });

                // Redirigez l'utilisateur vers la liste des utilisateurs après la création
                this.$router.push("/users");
            } catch (error) {
                console.error("Error creating users:", error);
            }
        },
    },
};
</script>

<style scoped>
label {
    display: block;
    margin-bottom: 0.5rem;
}

.height {
    height: 100%;
}
input[type="text"],
input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: background-color 0.3s, border-color 0.3s;
}
.margin {
    margin-left: 80%;
}
</style>
