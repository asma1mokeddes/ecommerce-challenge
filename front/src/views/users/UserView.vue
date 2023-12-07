<template>
    <div class="container p-2 mx-auto sm:p-4">
        <h3 class="mb-4 text-2xl font-semibold leadi text-center">
            Utilisateurs
        </h3>

        <button
            class="float-right mb-4 px-4 py-2 font-semibold rounded-md bg-purple500"
        >
            <router-link to="/users/create" class="text-white"
                >Créer un utilisateur</router-link
            >
        </button>

        <div class="mboverflow-x-auto">
            <table class="min-w-full text-xs">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col class="w-24" />
                </colgroup>
                <thead class="bg-gray700">
                    <tr class="text-left">
                        <th class="p-3">Nom</th>
                        <th class="p-3">Prénom</th>
                        <th class="p-3">Date de naissance</th>
                        <th class="p-3">Addresse email</th>
                        <th class="p-3 text-right">Role</th>
                        <th class="p-3">Compte</th>
                        <th class="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in state.users"
                        :key="user.userId"
                        class="border-b border-opacity-20 border-gray700"
                    >
                        <td class="p-3">
                            <p>{{ user.firstName }}</p>
                        </td>
                        <td class="p-3">
                            <p>{{ user.lastName }}</p>
                        </td>
                        <td class="p-3">
                            <p class="text-gray400">
                                {{ formatDate(user.dateOfBirth) }}
                            </p>
                        </td>
                        <td class="p-3">
                            <p>{{ user.emailAddress }}</p>
                        </td>
                        <td class="p-3 text-right">
                            <p>{{ user.role }}</p>
                        </td>

                        <td class="p-3">
                            <span
                                :class="{
                                    'bg-green400': user.activated,
                                    'bg-red400': !user.activated,
                                }"
                                class="px-3 py-1 font-semibold rounded-md text-gray900"
                            >
                                <span>{{
                                    user.activated ? "Actif" : "Inactif"
                                }}</span>
                            </span>
                        </td>

                        <td class="p-3">
                            <span
                                class="px-3 py-1 font-semibold rounded-md text-gray900"
                            >
                            <router-link :to="'/users/update/' + user.userId" class="text-black-300 hover:text-green400 cursor-pointer mr-2">
            <font-awesome-icon :icon="['fas', 'edit']" />
        </router-link>
                                <a
                                    class="text-red-600 hover:text-red400 cursor-pointer"
                                    @click="deleteUser(user.userId)"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'trash-alt']"
                                /></a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const BASE_URL = "http://localhost:3002";
import { reactive, onMounted } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/toast";
import { EyeIcon } from "@heroicons/vue/20/solid";

const state = reactive({
    users: [],
});

const init = async () => {
    await fetchUsers();
};

const fetchUsers = async () => {
    try {
        state.users = await axiosInstance.get("users").then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

const deleteUser = async (userId) => {
    if (
        confirm(
            `Êtes-vous certain de vouloir procéder à la suppression de cet utilisateur ?`
        )
    ) {
        try {
            const response = await axiosInstance.delete(`users/${userId}`);
            showToast(response.data.message);
            await fetchUsers();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de l'utilisateur:",
                error
            );
        }
    }
};


const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
        "fr-FR",
        options
    );
    return formattedDate;
};

onMounted(init);
</script>

<style scoped></style>
