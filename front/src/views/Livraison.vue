<template>
    <div class="container">
        <div class="form-container">
            <h2>Informations de Livraison</h2>
            <form @submit.prevent="submitDeliveryForm">
                <div class="formGroup">
                    <label for="lastName">Nom :</label>
                    <input type="text" v-model="delivery.lastName" />
                </div>
                <div class="formGroup">
                    <label for="firstName">Prénom :</label>
                    <input type="text" v-model="delivery.firstName" />
                </div>
                <div class="formGroup">
                    <label for="emailAddress">Adresse Email :</label>
                    <input type="email" v-model="delivery.emailAddress" />
                </div>
                <div class="formGroup">
                    <label for="address">Adresse :</label>
                    <input type="text" v-model="delivery.address" />
                </div>
                <div class="formGroup">
                    <label for="zipcode">Code Postal :</label>
                    <input type="text" v-model="delivery.zipcode" />
                </div>
                <div class="formGroup">
                    <label for="city">Ville :</label>
                    <input type="text" v-model="delivery.city" />
                </div>
                <button type="submit">Envoyer les informations de livraison</button>
            </form>
        </div>

        <div class="form-container">
            <h2>Informations de Paiement</h2>
            <form @submit.prevent="submitPaymentForm">
            <div class="formGroup">
                <label for="cardName">Nom sur la Carte :</label>
                <input type="text" v-model="payment.cardName" />
            </div>
            <div class="formGroup">
                <label for="cardNumber">Numéro de Carte :</label>
                <input type="text" v-model="payment.cardNumber" />
            </div>
            <div class="formGroup">
                <label for="cardExpiry">Date d'Expiration :</label>
                <input type="month" v-model="payment.cardExpiry" />
            </div>
            <div class="formGroup">
                <label for="cardCvv">CVV :</label>
                <input type="text" v-model="payment.cardCvv" maxlength="3" />
            </div>
            <button type="submit">Payer</button>
        </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const BASE_URL = "http://localhost:3002";

export default {
    data() {
        return {
            delivery: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                address: "",
                zipcode: "",
                city: ""
            },
            payment: {
                // définissez ici les données nécessaires pour le paiement
            },
            errors: {}
        };
    },
    methods: {
        async submitDeliveryForm() {
            // Implémentez la logique pour soumettre les informations de livraison
        },
        async submitPaymentForm() {
            // Implémentez la logique pour soumettre les informations de paiement
        }
    }
};
</script>

<style>
.container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
}

.form-container {
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 45%;
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
input[type="email"],
input[type="password"],
input[type="date"],
input[type="month"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

input:focus {
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
</style>
