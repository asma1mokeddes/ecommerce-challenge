<template>
    <div>
        <h2 class="promo-table">Liste des utilisateurs</h2>
        <div class="create-promo-container">
        <router-link to="/users/create" class="create-promo-link"
            >Créer un utilisateur</router-link
        >
        </div>
        <table class="promo-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Addresse email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.userId">
                    <td>
                        <span v-if="!user.editing">{{ user.firstName }}</span>
                        <input v-else v-model="user.updatedFirstName" />
                    </td>

                    <td>
                        <span v-if="!user.editing">{{ user.lastName }}</span>
                        <input v-else v-model="user.updatedLastName" />
                    </td>

                    <td>
                        <span v-if="!user.editing">{{ user.dateOfBirth }}</span>
                        <input v-else v-model="user.updatedDateOfBirth" />
                    </td>

                    <td>
                        <span v-if="!user.editing">{{ user.emailAddress }}</span>
                        <input v-else v-model="user.updatedEmailAddress" />
                    </td>

                    <td>
                        <span v-if="!user.editing">{{ user.role }}</span>
                        <input v-else v-model="user.updatedRole" />
                    </td>
                   
                   

                    <td class="button-container">
                        <button
                            v-if="!user.editing"
                            @click="deleteUser(user.userId)"
                            class="circle-button red"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                        <button
                            v-if="!user.editing"
                            @click="editUser(user)"
                            class="circle-button orange"
                        >
                            <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                            v-if="user.editing"
                            @click="saveUpdatedUser(user)"
                            class="circle-button green"
                        >
                            <i class="fas fa-check"></i>
                        </button>
                        <button
                            v-if="user.editing"
                            @click="cancelEdit(user)"
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
const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            users: [],
        };
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        async saveUpdatedUser(user) {
            try {
                await fetch(`${BASE_URL}/users/${user.userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName: user.updatedFirstName,
                        lastName: user.updatedLastName,
                        dateOfBirth: user.updatedDateOfBirth,
                        emailAddress: user.updatedEmailAddress,
                        role: user.updatedRole,
                    }),
                });

                // Actualiser la liste des users après la mise à jour
                this.getUsers();

                // Réinitialiser le mode d'édition
                user.editing = false;
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },

        editUser(user) {
            // Activer le mode d'édition
            user.editing = true;
            // Initialiser les champs de mise à jour
            user.updatedFirstName = user.firstName;
            user.updatedLastName = user.lastName;
            user.updatedDateOfBirth = user.dateOfBirth;
            user.updatedEmailAddress = user.emailAddress;
            user.updatedRole = user.role;

        },

        cancelEdit(user) {
            user.editing = false;
        },

        async getUsers() {
            try {
                console.log("Fetching users...");
                const response = await fetch(`${BASE_URL}/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                console.log("Users response:", data);
                // Ajouter une propriété "editing" à chaque promotion
                this.users = data.map((user) => ({
                    ...user,
                    editing: false,
                }));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        async deleteUser(userId) {
            try {
                // Envoyer une requête de suppression à l'API
                await fetch(`${BASE_URL}/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // Actualiser la liste des users après la suppression
                this.getUsers();
            } catch (error) {
                console.error("Error deleting users:", error);
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
