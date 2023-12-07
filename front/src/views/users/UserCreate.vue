<template>
     <div class="text-center">
            <h2 class="mt-10 font-bold text-xl">Création d'utilisateurs</h2>
        </div>
    <section
        class="mx-auto p-6 flex items-center justify-center"
    >
       

        <form
            novalidate=""
            action=""
            class="ml-80 container flex flex-col mx-auto space-y-12"
        >
            <fieldset
                class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900"
            >
                <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div class="col-span-full sm:col-span-3">
                        <label for="firstName" class="text-sm">Nom</label>
                        <input
                            v-model="state.firstName"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Nom"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900"
                        />
                    </div>
                    <div class="col-span-full sm:col-span-3">
                        <label for="lastName" class="text-sm">Prénom</label>
                        <input
                            v-model="state.lastName"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Prénom"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900"
                        />
                    </div>

                    <div class="col-span-full sm:col-span-2">
                        <label for="dateOfBirth" class="text-sm"
                            >Date de naissance</label
                        >
                        <input
                            v-model="state.dateOfBirth"
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Date de naissance"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900"
                        />
                    </div>

                    <div class="col-span-full sm:col-span-3">
                        <label for="email" class="text-sm">Adresse email</label>
                        <input
                            v-model="state.email"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="leroy@jenkins.com"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900"
                        />
                    </div>

                    <div class="col-span-full sm:col-span-2">
                        <label for="role" class="text-sm">Role</label>
                        <select
                            v-model="state.role"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 custom-select"
                        >
                            <option value="Question">Utilisateur</option>
                            <option value="Commande">Magasinier</option>
                            <option value="Réclamation">Admin</option>
                        </select>
                    </div>

                    <div class="col-span-full sm:col-span-2">
                        <label for="password" class="text-sm"
                            >Mot de passe</label
                        >
                        <input
                            v-model="state.password"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900"
                        />
                        <span v-if="state.errors" class="text-red-500">{{
                            state.errors.password
                        }}</span>
                    </div>
                </div>
            </fieldset>
            <button
                @click.prevent="createUser"
                class="mx-auto bottom-4 justify-center px-8 py-3 font-semibold dark:bg-violet400 text-gray800"
            >
                Créer l'utilisateur
            </button>
        </form>
    </section>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { showToast } from "@/utils/toast";
import { useRouter } from "vue-router";

const BASE_URL = "http://localhost:3002";
const router = useRouter();

const state = reactive({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: ref(""),
    password: ref(""),
    role: "",
    errors: {},
});

const createUser = async () => {
    try {
        state.errors = {};

        const response = await axios({
            baseURL: BASE_URL,
            method: "POST",
            url: "/users/create",
            data: {
                firstName: state.firstName,
                lastName: state.lastName,
                dateOfBirth: state.dateOfBirth,
                email: state.email,
                role: state.role,
                password: state.password,
            },
        });
        showToast(response.data.message);
        navigateToUsers();
    } catch (error) {
        if (error.response && error.response.data) {
            state.errors = error.response.data.errors;
        }
        console.error(error);
    }
};

const navigateToUsers = () => {
    router.push("/users");
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
input[type="date"],
input[type="email"],
input[type="password"] {
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

.custom-select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: background-color 0.3s, border-color 0.3s;
}
</style>
