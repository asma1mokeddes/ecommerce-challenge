<template>
    <div class="delivery-form-container">
        <form @submit.prevent="submitDeliveryForm">
            <div class="formGroup">
                <label for="firstName">Prénom :</label>
                <input type="text" v-model="firstName" />
            </div>

            <div class="formGroup">
                <label for="lastName">Nom :</label>
                <input type="text" v-model="lastName" />
            </div>

            <div class="formGroup">
                <label for="address">Adresse :</label>
                <input type="text" v-model="address" />
            </div>

            <div class="formGroup">
                <label for="zipcode">Code Postal :</label>
                <input type="text" v-model="zipcode" />
            </div>

            <div class="formGroup">
                <label for="city">Ville :</label>
                <input type="text" v-model="city" />
            </div>

            <div class="formGroup">
                <label for="emailAddress">Email :</label>
                <input type="email" v-model="emailAddress" />
            </div>

            <div class="formGroup">
                <label for="phoneNumber">Téléphone :</label>
                <input type="tel" v-model="phoneNumber" />
            </div>

            <button type="submit">Poursuivre vers le paiement</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            address: "",
            zipcode: "",
            city: "",
            emailAddress: "",
            phoneNumber: "",
        };
    },
    methods: {
        validateForm() {
            this.errors = [];

            if (!this.firstName.trim()) this.errors.push("Le prénom est requis.");
            if (!this.lastName.trim()) this.errors.push("Le nom est requis.");
            if (!this.address.trim()) this.errors.push("L'adresse est requise.");
            if (!this.zipcode.match(/^\d{5}$/)) this.errors.push("Le code postal doit être composé de 5 chiffres.");
            if (!this.city.trim()) this.errors.push("La ville est requise.");
            if (!this.emailAddress.match(/^\S+@\S+\.\S+$/)) this.errors.push("L'email n'est pas valide.");
            if (!this.phoneNumber.match(/^\d{10}$/)) this.errors.push("Le numéro de téléphone doit être composé de 10 chiffres.");

            return this.errors.length === 0;
        },
        async submitDeliveryForm() {
            if (this.validateForm()) {
                try {
                    const response = await axios.post('http://localhost:3002/shipment', {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        address: this.address,
                        zipcode: this.zipcode,
                        city: this.city,
                        emailAddress: this.emailAddress,
                        phoneNumber: this.phoneNumber,
                    });
                    console.log(response.data);
                    // Gérez la réponse - par exemple, afficher un message de succès
                } catch (error) {
                    console.error("Erreur lors de l'envoi des données: ", error);
                    // Gérer l'erreur - par exemple, afficher un message d'erreur
                }
            }
        },
    },
};
</script>

<style>
.delivery-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: #f0f0f0;
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
input[type="tel"] {
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
</style>
