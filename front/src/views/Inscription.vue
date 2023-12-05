<template>
    <div class="flex items-center justify-center min-h-screen bg-gray900">
        <div
            class="w-full max-w-md p-6 rounded-md sm:p-10 bg-gray900 text-gray100"
        >
            <div class="mb-8 text-center">
                <h1 class="my-3 text-4xl font-bold">Inscription</h1>
                <p class="text-sm text-gray-400">Inscrivez-vous pour accéder à notre site</p>
            </div>
                <form novalidate="" action="" class="space-y-6">
                    <div class="space-y-4">
                        <div>
                        <label for="firstName" class="block mb-2 text-sm"
                            >Nom</label
                        >
                        <input
                            v-model="state.firstName"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Votre nom"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>
                    <div class="space-y-1 text-sm">
                        <label for="lastName" class="block mb-2 text-sm"
                            >Prénom</label
                        >
                        <input
                            v-model="state.lastName"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Votre prénom"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>

                    <div class="space-y-1 text-sm">
                        <label for="dateOfBirth" class="block mb-2 text-sm"
                            >Date de naissance</label
                        >
                        <input
                            v-model="state.dateOfBirth"
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                        <div class="text-gray400 text-sm mt-1">
                            Sélectionnez votre date de naissance
                        </div>
                    </div>

                    <div class="space-y-1 text-sm">
                        <label for="email" class="block mb-2 text-sm"
                            >Adresse email</label
                        >
                        <input
                            v-model="state.email"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Votre adresse email"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                        <small class="error" v-if="emailError">{{
                            emailError
                        }}</small>
                    </div>

                    <div class="space-y-1 text-sm">
                        <label for="password" class="block mb-2 text-sm"
                            >Mot de passe</label
                        >
                        <input
                            v-model="state.password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Votre mot de passe"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                        <small class="error" v-if="passwordError">{{
                            passwordError
                        }}</small>
                    </div>
                    </div>
                    <div class="space-y-2">
                    <div>
                    <button
                        @click.prevent="register"
                        class="w-full px-8 py-3 font-semibold rounded-md bg-purple500 text-gray900">
                        Inscription
                    </button>
                </div>

                <p class="px-6 text-sm text-center text-gray400">
                    Vous avez déjà un compte?
                    <a rel="noopener noreferrer" href="/login" class="hover:underline text-purple500">Connectez-vous</a>.
                </p>
		  </div>
		</form>
	  </div>
	</div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";

const BASE_URL = "http://localhost:3002";
const router = useRouter();

const emailSchema = z
    .string()
    .min(5, { message: "5 caractères minimum" })
    .max(30, { message: "30 caractères maximum" })
    .email({ message: "Email invalide" });

const passwordSchema = z
    .string()
    .regex(/[a-z]/, { message: "Lettre minuscule manquante" })
    .regex(/[A-Z]/, { message: "Lettre majuscule manquante" })
    .regex(/\d/, { message: "Chiffre manquant" })
    .regex(/[^a-zA-Z0-9]/, { message: "Symbole manquant" })
    .min(12, { message: "13 caractères minimum" });

const state = reactive({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: ref(""),
    password: ref(""),
    errors: {},
});

const register = async () => {
    const parsedEmail = emailSchema.safeParse(state.email);
    if (!parsedEmail.success) {
        state.errors.email = parsedEmail.error.issues[0].message;
    }

    // Validation du mot de passe
    const parsedPassword = passwordSchema.safeParse(state.password);
    if (!parsedPassword.success) {
        state.errors.password = parsedPassword.error.issues[0].message;
    }

    if (
        !state.lastName ||
        !state.firstName ||
        !state.dateOfBirth ||
        !state.email ||
        !state.password
    ) {
        state.errors.message = "Tous les champs sont obligatoires.";
        return;
    }

    // Vérifications supplémentaires
    if (!validateName(state.firstName) || !validateName(state.lastName)) {
        state.errors.message =
            "Le nom et le prénom ne doivent pas contenir de chiffres ou de caractères spéciaux.";
        return;
    }

    try {
        state.errors = {};
        await axios({
            baseURL: BASE_URL,
            method: "POST",
            url: "/auth/register",
            data: {
                firstName: state.firstName,
                lastName: state.lastName,
                emailAddress: state.email,
                dateOfBirth: state.dateOfBirth,
                password: state.password,
            },
        });

        router.push("/login");
    } catch (e) {
        console.log(e);
    }
};

const validateName = (name) => {
    // Vérifier que le nom et le prénom ne contiennent pas de chiffres ou de caractères spéciaux
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
};
</script>

<style scoped>
.error {
    color: red;
    display: block;
    padding-left: 20px;
}
</style>
