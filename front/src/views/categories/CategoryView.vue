<template>
    <div class="container p-2 mx-auto sm:p-4">
        <h3 class="mb-4 text-2xl font-semibold leadi text-center">
            Catégories
        </h3>

        <button
            class="float-right mb-4 px-4 py-2 font-semibold rounded-md bg-purple500"
        >
            <router-link to="/categories/create" class="text-white"
                >Créer une catégorie</router-link
            >
        </button>

        <div class="mboverflow-x-auto">
            <table class="min-w-full text-xs">
                <colgroup>
                    <col />
                    <col class="w-24" />
                </colgroup>
                <thead class="bg-gray700">
                    <tr class="text-left">
                        <th class="p-3">Nom de la catégorie</th>
                        <th class="p-3">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="category in state.categories"
                        :key="category.categoryId"
                        class="border-b border-opacity-20 border-gray700"
                    >
                        <td class="p-3">
                            <p>{{ category.categoryName }}</p>
                        </td>

                        <td class="p-3">
                            <span
                                class="px-3 py-1 font-semibold rounded-md text-gray900"
                            >
                            <router-link :to="'/categories/update/' + category.categoryId" class="text-black-300 hover:text-green400 cursor-pointer mr-2">
            <font-awesome-icon :icon="['fas', 'edit']" />
        </router-link>
                                <a
                                    class="text-red-600 hover:text-red400 cursor-pointer"
                                    @click="deleteCategory(category.categoryId)"
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
import { reactive, onMounted } from "vue";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/utils/toast";

const state = reactive({
    promos: [],
});

const init = async () => {
    await fetchCategories();
};

const fetchCategories = async () => {
    try {
        state.categories = await axiosInstance.get("categories").then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

const deleteCategory = async (categoryId) => {
    if (
        confirm(
            `Êtes-vous certain de vouloir procéder à la suppression de cette catégorie ?`
        )
    ) {
        try {
            const response = await axiosInstance.delete(`categories/${categoryId}`);
            showToast(response.data.message);
            await fetchCategories();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de cette catégorie",
                error
            );
        }
    }
};


onMounted(init);
</script>

<style scoped></style>