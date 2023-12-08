<template>
    <div class="container p-2 mx-auto sm:p-4">
        <h3 class="mb-4 text-2xl font-semibold leadi text-center">
            Marques
        </h3>

        <button
            class="float-right mb-4 px-4 py-2 font-semibold rounded-md bg-purple500"
        >
            <router-link to="/brands/create" class="text-white"
                >Créer une marque</router-link
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
                        <th class="p-3">Nom de la marque</th>
                        <th class="p-3">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="brand in state.brands"
                        :key="brand.brandId"
                        class="border-b border-opacity-20 border-gray700"
                    >
                        <td class="p-3">
                            <p>{{ brand.brandName }}</p>
                        </td>

                        <td class="p-3">
                            <span
                                class="px-3 py-1 font-semibold rounded-md text-gray900"
                            >
                            <router-link :to="'/brands/update/' + brand.brandId" class="text-black-300 hover:text-green400 cursor-pointer mr-2">
            <font-awesome-icon :icon="['fas', 'edit']" />
        </router-link>
                                <a
                                    class="text-red-600 hover:text-red400 cursor-pointer"
                                    @click="deleteBrand(brand.brandId)"
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
    brands: [],
});

const init = async () => {
    await fetchBrands();
};

const fetchBrands = async () => {
    try {
        state.brands = await axiosInstance.get("brands").then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error fetching brands:", error);
    }
};

const deleteBrand = async (brandId) => {
    if (
        confirm(
            `Êtes-vous certain de vouloir procéder à la suppression de cette marque ?`
        )
    ) {
        try {
            const response = await axiosInstance.delete(`brands/${brandId}`);
            showToast(response.data.message);
            await fetchBrands();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression de cette marque",
                error
            );
        }
    }
};



onMounted(init);
</script>

<style scoped></style>