<script>
import axios from "axios";
const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            emailAddress: "",
            dateOfBirth: "",
            password: "",
            errors: {},
        };
    },

    methods: {
        async register() {
            // Vérifier si tous les champs sont remplis
            if (
                !this.lastName ||
                !this.firstName ||
                !this.dateOfBirth ||
                !this.emailAddress ||
                !this.password
            ) {
                this.errors = {
                    message: "Tous les champs sont obligatoires.",
                };
                return;
            }

            // Vérifications supplémentaires
            if (
                !this.validateName(this.firstName) ||
                !this.validateName(this.lastName)
            ) {
                this.errors = {
                    message:
                        "Le nom et le prénom ne doivent pas contenir de chiffres ou de caractères spéciaux.",
                };
                return;
            }

            if (!this.validateEmailDomain(this.emailAddress)) {
                this.errors = {
                    message:
                        "L'adresse email ne doit pas avoir l'extension 'yopmail'.",
                };
                return;
            }

            // Mot de passe de 12 caractères minimum avec symboles, chiffres, lettres minuscules et majuscules
            if (!this.validatePassword(this.password)) {
                this.errors = {
                    message:
                        "Le mot de passe doit contenir au moins 12 caractères avec des symboles, chiffres, lettres minuscules et majuscules.",
                };
                return;
            }

            try {
                // Réinitialiser les erreurs en cas de soumission réussie
                this.errors = {};
                await axios({
                    baseURL: BASE_URL,
                    method: "POST",
                    url: "/auth/register",
                    data: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailAddress: this.emailAddress,
                        dateOfBirth: this.dateOfBirth,
                        password: this.password,
                    },
                });

                await this.$router.push({
                    path: "/login",
                });
            } catch (e) {
                console.log(e);
                // Gérer les erreurs ici si nécessaire
            }
        },

        validateName(name) {
            // Vérifier que le nom et le prénom ne contiennent pas de chiffres ou de caractères spéciaux
            const regex = /^[a-zA-Z]+$/;
            return regex.test(name);
        },

        validateEmailDomain(email) {
            // Vérifier que le domaine de l'email n'est pas 'yopmail'
            const regex = /@yopmail\.com$/;
            return !regex.test(email);
        },

        validatePassword(password) {
            // Mot de passe de 12 caractères minimum avec symboles, chiffres, lettres minuscules et majuscules
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            return regex.test(password);
        },
    },
};
</script>

<template>
    <div class="login-container auth-form">
        <div v-if="errors.message" class="error-message">
            {{ errors.message }}
        </div>

        <div >
                <label for="text"> Formulaire d'inscription </label>
            </div>

        <form @submit.prevent="register" Method="POST">
            <div class="formGroup">
                <label for="text"> Nom :</label>
                <input type="text" v-model="lastName" />
            </div>

            <div class="formGroup">
                <label for="text"> Prénom :</label>
                <input type="text" v-model="firstName" />
            </div>

            <div class="formGroup">
                <label for="email">Email :</label>
                <input type="email" v-model="emailAddress" />
            </div>

            <div class="formGroup">
                <label for="date">Date de naissance :</label>
                <input type="date" v-model="dateOfBirth" />
            </div>

            <div class="formGroup">
                <label for="password">Mot de passe :</label>
                <input type="password" v-model="password" />
            </div>

            <button type="submit" class="formGroup">Register</button>

            <small class="text-right text-xs">
                Vous avez déjà un compte? Connectez-vous
                <router-link
                    to="/login"
                    class="text-primary hover:underline"
                    >Ici</router-link
                >.
            </small>
        </form>
    </div>
</template>

<style>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: #f0f0f0; /* Changer la couleur de fond selon votre préférence */
}

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
input[type="password"],
input[type="email"],
input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: background-color 0.3s, border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
input[type="date"]:focus {
    border-color: #6aa9af;
    box-shadow: 0 0 0 2px #6aa9af;
}

button {
    width: 100%;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgb(120, 115, 178);
    border: none;
    color: white;
    transition: transform 0.1s;
}

button:hover {
    background-color: rgb(120, 115, 178);
}

button:active {
    transform: scale(0.98);
}

.error-message {
    color: rgb(199, 33, 33);
    margin-bottom: 10px;
}

/* styles.css (ou dans la section <style> de votre composant Vue) */

.auth-form {
    margin: auto;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: #f0f0f0;
    min-width: -webkit-fill-available;
}

.auth-form .formGroup {
    margin-bottom: 15px;
    width: 100%;
}

.auth-form label {
    display: block;
    color: #333;
    margin-bottom: 0.5rem;
}

.auth-form input[type="text"],
.auth-form input[type="password"],
.auth-form input[type="email"],
.auth-form input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: background-color 0.3s, border-color 0.3s;
}

.auth-form input[type="text"]:focus,
.auth-form input[type="password"]:focus,
.auth-form input[type="email"]:focus,
.auth-form input[type="date"]:focus {
    border-color: #6aa9af;
    box-shadow: 0 0 0 2px #6aa9af;
}

.auth-form button {
    width: 100%;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgb(120, 115, 178);
    border: none;
    color: white;
    transition: transform 0.1s;
}

.auth-form button:hover {
    background-color: rgb(120, 115, 178);
}

.auth-form button:active {
    transform: scale(0.98);
}

.auth-form .error-message {
    color: rgb(199, 33, 33);
    margin-bottom: 10px;
}

</style>
