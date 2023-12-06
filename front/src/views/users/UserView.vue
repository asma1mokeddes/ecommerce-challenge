<template>
      <div class="container p-2 mx-auto sm:p-4 dark:text-gray100">
        <h3 class="mb-4 text-2xl font-semibold leadi text-center">Utilisateurs</h3>
        <div class="overflow-x-auto">
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
                                {{ user.dateOfBirth }}
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
                                class="px-3 py-1 font-semibold rounded-md dark:bg-violet400 text-gray900"
                            >
                                <button
                                    class="text-black-300 hover:text-green-800 cursor-pointer"
                                    @click=""
                                >
                                    <EyeIcon class="h-4 w-4" />
                                </button>
                                <a
                                    class="text-black-300 hover:text-green-800 cursor-pointer"
                                    ><font-awesome-icon
                                        :icon="['fas', 'edit']"
                                    />
                                </a>
                                <a
                                    class="text-red-600 hover:text-red-800 cursor-pointer"
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

    <div class="flex justify-center space-x-1 dark:text-gray100">
		<button title="previous" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray900 dark:border-gray800">
			<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<button type="button" title="Page 1" class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray900 dark:text-violet400 dark:border-violet400">1</button>
		<button type="button" class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray900 dark:border-gray800" title="Page 2">2</button>
		<button type="button" class="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray900 dark:border-gray800" title="Page 3">3</button>
		<button title="next" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray900 dark:border-gray800">
			<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-4">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	</div>
</template>
<script>
const BASE_URL = "http://localhost:3002";
import { reactive } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/toast";
import { EyeIcon } from "@heroicons/vue/20/solid";

export default {
    data() {
        return {
            state: reactive({
                users: [],
            }),
        };
    },

    methods: {
        async init() {
            await this.fetchUsers();
        },

        async fetchUsers() {
            try {
                this.state.users = await axiosInstance
                    .get("users")
                    .then((response) => {
                        return response.data;
                    });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        async deleteUser(userId) {
            if (
                confirm(
                    `Êtes-vous certain de vouloir procéder à la suppression de cet utilisateur ?`
                )
            ) {
                try {
                    const response = await axiosInstance.delete(
                        `users/${userId}`
                    );
                    showToast(response.data.message);
                    await this.fetchUsers();
                } catch (error) {
                    console.error(
                        "Erreur lors de la suppression de l'utilisateur:",
                        error
                    );
                }
            }
        },
    },

    mounted() {
        this.init();
    },
};
</script>

<style scoped></style>
