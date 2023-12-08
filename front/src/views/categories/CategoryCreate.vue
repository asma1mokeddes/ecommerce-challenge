<template>
     <div class="text-center">
        <h2 class="mt-10 font-bold text-xl">Créer une catégorie</h2>
    </div>
    <section class="mx-auto p-6 flex items-center justify-center">
        <form
            action=""
            class="ml-80 container flex flex-col mx-auto space-y-12"
        >
            <fieldset
                class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray900"
            >
                <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div class="col-span-full sm:col-span-3">
                        <label for="categoryName" class="text-sm">Nom de la catégorie </label>
                        <input
                            v-model="state.categoryName"
                            type="text"
                            name="categoryName"
                            id="categoryName"
                            placeholder="Nom de la catégorie"
                            class="w-full rounded-md focus:ring focus:ri focus:ri border-gray700 text-gray900 form-field"
                        />
                    </div>
                    
                </div>
            </fieldset>
                <div class="text-center">
                <button
                    @click.prevent="createCategory"
                    class="mx-auto px-8 py-3 font-semibold bg-violet400"
                >
                    Créer la catégorie
                </button>
                </div>
        </form>
    </section>
</template>


<script setup>
import {  reactive } from "vue";
import { showToast } from "@/utils/toast";
import { useRouter } from "vue-router";
import axiosInstance from "@/utils/axiosInstance";

const router = useRouter();

const state = reactive({
    categoryName: "",
});


const createCategory = async () => {
    try {
        state.errors = {};

    
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
        const data = {
            categoryName: state.categoryName,
        };

        const response = await axiosInstance.post("/categories/create", data);

        showToast(response.data.message);
        router.push("/categories");

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