<template>
    <div class="text-center">
        <h2 class="mt-10 font-bold text-xl">Créer un utilisateur</h2>
    </div>
    <section class="mx-auto p-6 flex items-center justify-center">
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
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 form-field"
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
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
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
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
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
                            <option value="Utilisateur" selected>
                                Utilisateur
                            </option>
                            <option value="Magasinier">Magasinier</option>
                            <option value="Admin">Admin</option>
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
            <div class="text-center">
                <button
                    @click.prevent="createUser"
                    class="mx-auto px-8 py-3 font-semibold dark:bg-violet400"
                >
                    Créer
                </button>
            </div>
        </form>
    </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { showToast } from "@/utils/toast";
import { useRouter } from "vue-router";
import axiosInstance from "@/utils/axiosInstance";

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

        const roleMappings = {
            Utilisateur: "ROLE_USER",
            Magasinier: "ROLE_STORE_KEEPER",
            Admin: "ROLE_ADMIN",
        };
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
        const data = {
            firstName: state.firstName,
            lastName: state.lastName,
            dateOfBirth: state.dateOfBirth,
            emailAddress: state.email,
            role: roleMappings[state.role],
            password: state.password,
        };

        const response = await axiosInstance.post("/users/create", data);

        showToast(response.data.message);

        router.push("/users");
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    if (error.response && error.response.data) {
        state.errors = error.response.data.errors;
    }
    console.error(error);
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

button {
    margin-top: auto; /* Utilisé pour positionner le bouton en bas */
}
</style>
