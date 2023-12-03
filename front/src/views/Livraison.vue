<template>
    <div class="container">
        <div class="form-container">
            <h2>Informations de Livraison</h2>
            <form @submit.prevent="submitDeliveryForm">
                <div class="formGroup">
                    <label for="lastName">Nom </label>
                    <input type="text" v-model="delivery.lastName" />
                    <span v-if="errors.delivery.lastName" class="error-message">{{ errors.delivery.lastName }}</span>
                </div>
                <div class="formGroup">
                    <label for="firstName">Prénom </label>
                    <input type="text" v-model="delivery.firstName" />
                    <span v-if="errors.delivery.firstName" class="error-message">{{ errors.delivery.firstName }}</span>
                </div>
                <div class="formGroup">
                    <label for="emailAddress">Adresse Email </label>
                    <input type="email" v-model="delivery.emailAddress" />
                    <span v-if="errors.delivery.emailAddress" class="error-message">{{ errors.delivery.emailAddress }}</span>
                </div>
                <div class="formGroup">
                    <label for="address">Adresse </label>
                    <input type="text" v-model="delivery.address" />
                    <span v-if="errors.delivery.address" class="error-message">{{ errors.delivery.address }}</span>
                </div>
                <div class="formGroup">
                    <label for="zipcode">Code Postal </label>
                    <input type="text" v-model="delivery.zipcode" maxlength="5" />
                    <span v-if="errors.delivery.zipcode" class="error-message">{{ errors.delivery.zipcode }}</span>
                </div>
                <div class="formGroup">
                    <label for="city">Ville </label>
                    <input type="text" v-model="delivery.city" />
                    <span v-if="errors.delivery.city" class="error-message">{{ errors.delivery.city }}</span>
                </div>
                <div class="formGroup">
                    <label for="phone">Téléphone </label>
                    <input type="text" v-model="delivery.phone" maxlength="10"  />
                    <span v-if="errors.delivery.phone" class="error-message">{{ errors.delivery.phone }}</span>
                </div>
                <button type="submit">Envoyer les informations de livraison</button>
            </form>
        </div>

        <div class="form-container">
            <h2>Informations de Paiement</h2>
            <form @submit.prevent="submitPaymentForm">
                <div class="formGroup">
                    <label for="cardName">Nom sur la Carte </label>
                    <input type="text" v-model="payment.cardName" />
                    <span v-if="errors.payment.cardName" class="error-message">{{ errors.payment.cardName }}</span>
                </div>
                <div class="formGroup">
                    <label for="cardNumber">Numéro de Carte </label>
                    <input type="text" v-model="payment.cardNumber" maxlength="16"  />
                    <span v-if="errors.payment.cardNumber" class="error-message">{{ errors.payment.cardNumber }}</span>
                </div>
                <div class="formGroup">
                <label for="deliveryDate">Date de Livraison </label>
                <input type="date" v-model="delivery.deliveryDate" />
                <span v-if="errors.delivery.deliveryDate" class="error-message">{{ errors.delivery.deliveryDate }}</span>
            </div>
                <div class="formGroup">
                    <label for="cardCvv">CVV </label>
                    <input type="text" v-model="payment.cardCvv" maxlength="3" />
                    <span v-if="errors.payment.cardCvv" class="error-message">{{ errors.payment.cardCvv }}</span>
                </div>
                <button type="submit" :disabled="!validateDeliveryForm()">Payer</button>
                
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
                city: "",
                phone: ""
            },
            payment: {
                cardName: "",
                cardNumber: "",
                cardExpiry: "",
                cardCvv: ""
            },
            errors: {
                delivery: {},
                payment: {}
            }
        };
    },
    methods: {
        validateDeliveryForm() {
            this.errors.delivery = {};
            if (!this.delivery.firstName.trim()) {
                this.errors.delivery.firstName = "Le prénom est requis.";
            }
            if (!this.delivery.lastName.trim()) {
                this.errors.delivery.lastName = "Le nom est requis.";
            }
            if (!this.delivery.emailAddress.trim()) {
                this.errors.delivery.emailAddress = "L'email est requis.";
            }
            if (!this.delivery.address.trim()) {
                this.errors.delivery.address = "L'adresse est requise.";
            }
            if (!this.delivery.zipcode.trim()) {
                this.errors.delivery.zipcode = "Le code postal est requis.";
            }
            if (!this.delivery.city.trim()) {
                this.errors.delivery.city = "La ville est requise.";
            }
            if (!this.delivery.phone.trim()) {
                this.errors.delivery.phone = "Le numéronde téléphone est requis.";
            }
            if (!this.delivery.zipcode.match(/^\d{5}$/)) {
                this.errors.delivery.zipcode = "Le code postal doit contenir 5 chiffres.";
            }
            if (!this.delivery.phone.match(/^\d{10}$/)) {
                this.errors.delivery.phone = "Le numéro de télépohne doit contenir 10 chiffres.";
            }

            
            return Object.keys(this.errors.delivery).length === 0;
        },
        validatePaymentForm() {
            this.errors.payment = {};
            if (!this.payment.cardName.trim()) {
                this.errors.payment.cardName = "Le nom sur la carte est requis.";
            }
            if (!this.payment.cardNumber.trim()) {
                this.errors.payment.cardNumber = "Le numéro de carte est requis.";
            }
            if (!this.payment.cardExpiry.trim()) {
                this.errors.payment.cardExpiry = "La date d'expiration de la carte est requise.";
            }
            if (!this.payment.cardCvv.trim()) {
                this.errors.payment.cardCvv = "Le CVV de la carte est requis.";
            }
            if (!this.delivery.cardNumber.match(/^\d{16}$/)) {
                this.errors.delivery.cardNumber = "Le numéro de carte doit contenir 5 chiffres.";
            }
            if (!this.delivery.cardCvv.match(/^\d{4}$/)) {
                this.errors.delivery.cardCvv = "Le CVV doit contenir 3 chiffres.";
            }



            
            return Object.keys(this.errors.payment).length === 0;
        },
        async submitDeliveryForm() {
            if (this.validateDeliveryForm()) {
                // Logique de soumission si la validation est réussie
            }
        },
        async submitPaymentForm() {
            if (this.validatePaymentForm()) {
                // Logique de soumission si la validation est réussie
            }
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
