<template>
    <div>
        <h2>Create New Promo</h2>
        <!-- Ajoutez vos champs et logique de création ici -->
    </div>
</template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3002";

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
        },
    },
};
</script>
