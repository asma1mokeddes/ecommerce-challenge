<template>
    <div class="login-container">
      <form @submit.prevent="createPromo" Method="POST">
        <div class="formGroup">
          <label for="text">Code promotionnel : </label>
          <input type="text" id="text" v-model="promoCode">
        </div>
        <div class="formGroup">
          <label for="date">Date d'expiration :</label>
          <input type="date" id="date" v-model="expirationDate">
        </div>
        <div class="formGroup">
          <button type="submit">Créer</button>
        </div>

      </form>
    </div>
  </template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3000";

export default {
    data() {
        return {
            promoCode: "",
            expirationDate: "",
        };
    },

    methods: {
        async createPromo() {
            try {
                await axios({
                    baseURL: BASE_URL,
                    method: "POST",
                    url: "/promos/create",
                    data: {
                        promoCode: this.promoCode,
                        expirationDate: this.expirationDate,
                    },
                });

                // Redirigez l'utilisateur vers la liste des promotions après la création
                this.$router.push("/promos");
            } catch (error) {
                console.error("Error creating promotion:", error);
            }
            await this.$router.push({
                    path: "/promos",
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