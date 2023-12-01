<template>
    <div>
        <h2 class="promo-table">Liste des catégories</h2>
        <div class="create-promo-container">
        <router-link to="/categories/create" class="create-promo-link"
            >Créer une catégorie</router-link
        >
        </div>
        <table class="promo-table">
            <thead>
                <tr>
                    <th>Nom de la catégorie</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.categoryId">
                    <td>
                        <span v-if="!category.editing">{{ category.categoryName }}</span>
                        <input v-else v-model="category.updatedCategoryName" />
                    </td>
                    <td class="button-container">
                        <button
                            v-if="!category.editing"
                            @click="deleteCategory(category.categoryId)"
                            class="circle-button red"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                        <button
                            v-if="!category.editing"
                            @click="editCategory(category)"
                            class="circle-button orange"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                            v-if="category.editing"
                            @click="saveUpdatedCategory(category)"
                            class="circle-button green"
                        >
                            <i class="fas fa-check"></i>
                        </button>
                        <button
                            v-if="category.editing"
                            @click="cancelEdit(category)"
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
            categories: [],
        };
    },

    mounted() {
        this.getCategories();
    },

    methods: {
        async saveUpdatedCategory(category) {
            try {
                await fetch(`${BASE_URL}/categories/${category.categoryId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoryName: category.updatedCategoryName,
                    }),
                });

                // Actualiser la liste des categories après la mise à jour
                this.getCategories();

                // Réinitialiser le mode d'édition
                category.editing = false;
            } catch (error) {
                console.error("Error updating categories:", error);
            }
        },

        editCategory(category) {
            // Activer le mode d'édition
            category.editing = true;
            // Initialiser les champs de mise à jour
            category.updatedCategoryName = category.categoryName;
        },

        cancelEdit(category) {
            category.editing = false;
        },

        async getCategories() {
            try {
                console.log("Fetching categories...");
                const response = await fetch(`${BASE_URL}/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log("Categories response:", data);
                // Ajouter une propriété "editing" à chaque catégorie
                this.categories = data.map((category) => ({
                    ...category,
                    editing: false,
                }));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },


        async deleteCategory(categoryId) {
            try {
                // Envoyer une requête de suppression à l'API
                await fetch(`${BASE_URL}/categories/${categoryId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Actualiser la liste des categories après la suppression
                this.getCategories();
            } catch (error) {
                console.error("Error deleting categories:", error);
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
