<template>
    <div class="container p-2 mx-auto sm:p-4 text-gray100">
        <h3 class="mb-4 text-2xl font-semibold leadi underline">Utilisateurs</h3>
        <div class="overflow-x-auto ">
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
                        <th class="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in state.users" :key="user.userId" class="border-b border-opacity-20 border-gray700 bg-gray900"
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
                        <td class="p-3 text-right">
                            <span
                                class="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 text-gray900"
                            >
                                <button
                                    class="text-black-300 hover:text-green-800 cursor-pointer"
                                    @click=""
                                >
                                    <EyeIcon class="h-4 w-4" />
                                </button>
                                <a                                    class="text-black-300 hover:text-green-800 cursor-pointer"
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
        this.state.users = await axiosInstance.get("users").then((response) => {
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
          const response = await axiosInstance.delete(`users/${userId}`);
          showToast(response.data.message);
          await this.fetchUsers();
        } catch (error) {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
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
