<template>
    <div class="login-container">
        <form @submit.prevent="createUser" Method="POST">
            <div class="formGroup">
                <label for="text">Nom : </label>
                <input type="text" id="text" v-model="firstName" />
            </div>
            <div class="formGroup">
                <label for="text">Prénom : </label>
                <input type="text" id="text" v-model="lastName" />
            </div>
            <div class="formGroup">
                <label for="date"> Date de naissance : </label>
                <input type="date" id="date" v-model="dateOfBirth" />
            </div>

            <div class="formGroup">
                <label for="email"> Addresse email : </label>
                <input type="email" id="email" v-model="emailAddress" />
            </div>
            <div class="formGroup">
                <label for="password"> Mot de passe : </label>
                <input type="password" id="password" v-model="password" />
            </div>

            <div class="formGroup">
                <label for="role"> Rôle : </label>
                <select id="role" v-model="role">
                    <option value="ROLE_USER">Utilisateur</option>
                    <option value="ROLE_STORE_KEEPER">Gestionnaire de magasin</option>
                    <option value="ROLE_ADMIN">Administrateur</option>
                </select>
            </div>

            <div class="formGroup">
                <button type="submit">Créer l'utilisateur</button>
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
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            dateOfBirth: "",
            role: "",
        };
    },

    methods: {
        async createUser() {
            try {
                await axios({
                    baseURL: BASE_URL,
                    method: "POST",
                    url: "/users/create",
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailAddress: this.emailAddress,
                        password: this.password,
                        dateOfBirth: this.dateOfBirth,
                        role: this.role,
                    },
                });

                // Redirigez l'utilisateur vers la liste des promotions après la création
                this.$router.push("/users");
            } catch (error) {
                console.error("Error creating users:", error);
            }
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
