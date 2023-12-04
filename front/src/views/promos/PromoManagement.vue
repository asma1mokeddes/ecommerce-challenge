<template>
    <div>
        <h2 class="promo-table">Liste des promotions</h2>
        <div class="create-promo-container">
        <router-link to="/promos/create" class="create-promo-link"
            >Créer une promotion</router-link
        >
        </div>
        <table class="promo-table">
            <thead>
                <tr>
                    <th>Code promo</th>
                    <th>Date d'expiration</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="promo in promos" :key="promo.promoId">
                    <td>
                        <span v-if="!promo.editing">{{ promo.promoCode }}</span>
                        <input v-else v-model="promo.updatedPromoCode" />
                    </td>
                    <td>
                        <span v-if="!promo.editing">{{
                            formatPromoExpiry(promo.expirationDate)
                        }}</span>
                        <input
                            v-else
                            v-model="promo.updatedExpirationDate"
                            type="datetime-local"
                        />
                    </td>
                    <td class="button-container">
                        <button
                            v-if="!promo.editing"
                            @click="deletePromo(promo.promoId)"
                            class="circle-button red"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                        <button
                            v-if="!promo.editing"
                            @click="editPromo(promo)"
                            class="circle-button orange"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                            v-if="promo.editing"
                            @click="saveUpdatedPromo(promo)"
                            class="circle-button green"
                        >
                            <i class="fas fa-check"></i>
                        </button>
                        <button
                            v-if="promo.editing"
                            @click="cancelEdit(promo)"
                            class="circle-button yellow"
                        >
                            <i class="fas fa-undo"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { format } from "date-fns";

const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            promos: [],
        };
    },

    mounted() {
        this.getPromos();
    },

    methods: {
        async saveUpdatedPromo(promo) {
            try {
                await fetch(`${BASE_URL}/promos/${promo.promoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        promoCode: promo.updatedPromoCode,
                        expirationDate: promo.updatedExpirationDate,
                    }),
                });

                // Actualiser la liste des promotions après la mise à jour
                this.getPromos();

                // Réinitialiser le mode d'édition
                promo.editing = false;
            } catch (error) {
                console.error("Error updating promotion:", error);
            }
        },

        editPromo(promo) {
            // Activer le mode d'édition
            promo.editing = true;
            // Initialiser les champs de mise à jour
            promo.updatedPromoCode = promo.promoCode;

            // Formater la date sans le fuseau horaire
            promo.updatedExpirationDate = promo.expirationDate;
        },

        cancelEdit(promo) {
            promo.editing = false;
        },

        async getPromos() {
            try {
                console.log("Fetching promotions...");
                const response = await fetch(`${BASE_URL}/promos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log("Promotions response:", data);
                // Ajouter une propriété "editing" à chaque promotion
                this.promos = data.map((promo) => ({
                    ...promo,
                    editing: false,
                }));
            } catch (error) {
                console.error("Error fetching promotions:", error);
            }
        },

        formatPromoExpiry(expirationDate) {
            const date = new Date(expirationDate);
            const formattedDate = format(date, "MM/dd/yyyy 'à' HH:mm:ss a");
            return formattedDate;
        },

        async deletePromo(promoId) {
            try {
                // Envoyer une requête de suppression à l'API
                await fetch(`${BASE_URL}/promos/${promoId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Actualiser la liste des promotions après la suppression
                this.getPromos();
            } catch (error) {
                console.error("Error deleting promotion:", error);
            }
        },
    },
};
</script>

<style scoped>
.create-promo-container {
  border: 1px solid; 
  padding: 10px;
  margin-bottom: 20px;
  display: inline-block;
  border-radius: 15%; 
  margin-left: 80%;
  color:black;
}

.create-promo-link {
  text-decoration: none;
  font-weight: bold;
  color:black;
}

.create-promo-container:hover {
  background-color: rgb(120, 115, 178);
}

.promo-table {
    width: 70%;
    border-collapse: collapse;
    margin: 20px auto;
    text-align-last: center;
}

.promo-table th,
.promo-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.promo-table th {
    background-color: #f2f2f2;
}

.promo-table button {
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 5px;
}

.circle-button {
    color: #fff;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    transition: background-color 0.3s;
}

.red {
    background-color: #dc3545;
}

.orange {
    background-color: #dc6a35;
}

.green {
    background-color: #28a745;
}

.yellow{
    background-color: rgb(29, 82, 114);
}

/* Ajout d'une classe spécifique pour l'icône "ok" */
.green i {
    color: #fff;
}

.button-container {
    display: flex;
    justify-content: center;
}
</style>
