<template>
    <div class="login-container">
      <form @submit.prevent="createCategory" Method="POST">
        <div class="formGroup">
          <label for="text">Nom de la catégorie : </label>
          <input type="text" id="text" v-model="categoryName">
        </div>
        <div class="formGroup">
          <button type="submit">Créer la catégorie</button>
        </div>

      </form>
    </div>
  </template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            categoryName: "",
        };
    },

    methods: {
        async createCategory() {
            try {
                await axios({
                    baseURL: BASE_URL,
                    method: "POST",
                    url: "/categories/create",
                    data: {
                        categoryName: this.categoryName
                    },
                });

                // Redirigez l'utilisateur vers la liste des promotions après la création
                this.$router.push("/categories");
            } catch (error) {
                console.error("Error creating categories:", error);
            }
            await this.$router.push({
                    path: "/categories",
            });
        },
    },
};
</script>


<style scoped>
.formGroup {
    margin-bottom: 15px;
    width: 100%;
}

label {
    display: block;
    color: #333;
    margin-bottom: 0.5rem;
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


</style>