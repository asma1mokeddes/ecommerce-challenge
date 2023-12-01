<template>
    <div>
        <h2 class="promo-table">Liste des marques</h2>
        <div class="create-promo-container">
        <router-link to="/brands/create" class="create-promo-link"
            >Créer une marque</router-link
        >
        </div>
        <table class="promo-table">
            <thead>
                <tr>
                    <th>Nom de la marque</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="brand in brands" :key="brand.brandId">
                    <td>
                        <span v-if="!brand.editing">{{ brand.brandName }}</span>
                        <input v-else v-model="brand.updatedBrandName" />
                    </td>
                    <td class="button-container">
                        <button
                            v-if="!brand.editing"
                            @click="deleteBrand(brand.brandId)"
                            class="circle-button red"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                        <button
                            v-if="!brand.editing"
                            @click="editBrand(brand)"
                            class="circle-button orange"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                            v-if="brand.editing"
                            @click="saveUpdatedBrand(brand)"
                            class="circle-button green"
                        >
                            <i class="fas fa-check"></i>
                        </button>
                        <button
                            v-if="brand.editing"
                            @click="cancelEdit(brand)"
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
            brands: [],
        };
    },

    mounted() {
        this.getBrands();
    },

    methods: {
        async saveUpdatedBrand(brand) {
            try {
                await fetch(`${BASE_URL}/brands/${brand.brandId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        brandName: brand.updatedBrandName,
                    }),
                });

                // Actualiser la liste des brand après la mise à jour
                this.getBrands();

                // Réinitialiser le mode d'édition
                brand.editing = false;
            } catch (error) {
                console.error("Error updating brands:", error);
            }
        },

        editBrand(brand) {
            // Activer le mode d'édition
            brand.editing = true;
            // Initialiser les champs de mise à jour
            brand.updatedBrandName = brand.brandName;
        },

        cancelEdit(brand) {
            brand.editing = false;
        },

        async getBrands() {
            try {
                console.log("Fetching brands...");
                const response = await fetch(`${BASE_URL}/brands`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log("Brands response:", data);
                // Ajouter une propriété "editing" à chaque catégorie
                this.brands = data.map((brand) => ({
                    ...brand,
                    editing: false,
                }));
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        },


        async deleteBrand(brandId) {
            try {
                // Envoyer une requête de suppression à l'API
                await fetch(`${BASE_URL}/brands/${brandId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Actualiser la liste des brands après la suppression
                this.getBrands();
            } catch (error) {
                console.error("Error deleting brands:", error);
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
