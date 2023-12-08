<template>
    <div class="container p-2 mx-auto sm:p-4">
        <h3 class="mb-4 text-2xl font-semibold leadi text-center">
            Codes promotionnels
        </h3>

        <button
            class="float-right mb-4 px-4 py-2 font-semibold rounded-md bg-purple500"
        >
            <router-link to="/promos/create" class="text-white"
                >Créer un code promotionnel</router-link
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
                        <th class="p-3">Code promotionnel</th>
                        <th class="p-3">Date d'expiration</th>
                        <th class="p-3">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="promo in state.promos"
                        :key="promo.promoId"
                        class="border-b border-opacity-20 border-gray700"
                    >
                        <td class="p-3">
                            <p>{{ promo.promoCode }}</p>
                        </td>

                        <td class="p-3">
                            <p class="text-gray400">
                                {{ formatDate(promo.expirationDate) }}
                            </p>
                        </td>
                       

                        <td class="p-3">
                            <span
                                class="px-3 py-1 font-semibold rounded-md text-gray900"
                            >
                            <router-link :to="'/promos/update/' + promo.promoId" class="text-black-300 hover:text-green400 cursor-pointer mr-2">
            <font-awesome-icon :icon="['fas', 'edit']" />
        </router-link>
                                <a
                                    class="text-red-600 hover:text-red400 cursor-pointer"
                                    @click="deletePromo(promo.promoId)"
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
    await fetchPromos();
};

const fetchPromos = async () => {
    try {
        state.promos = await axiosInstance.get("promos").then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error fetching promos:", error);
    }
};

const deletePromo = async (promoId) => {
    if (
        confirm(
            `Êtes-vous certain de vouloir procéder à la suppression de ce code promotionnel ?`
        )
    ) {
        try {
            const response = await axiosInstance.delete(`promos/${promoId}`);
            showToast(response.data.message);
            await fetchPromos();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression du code promotionnel",
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