<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/utils/axiosInstance";

const form = reactive({
    email: "",
});
const state = reactive({
    error: "",
});

const router = useRouter();

const reset = () => {
    axiosInstance.post("/emails/reset", form).then((response) => {
        console.log("je suis là");
        router.push("/login");
    });
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray900">
        <div
            class="w-full max-w-md p-6 rounded-md sm:p-10 bg-gray900 text-gray100"
        >
            <div class="mb-8 text-center">
                <p class="text-sm text-gray-400">
                    Rénitialiser votre mot de passe
                </p>
            </div>
            <form novalidate="" action="" class="space-y-12">
                <div class="space-y-4">
                    <div>
                        <label for="password" class="block mb-2 text-sm"
                            >Votre ancien mot de passe</label
                        >
                        <input
                            v-model="form.password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="leroy@jenkins.com"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm"
                            >Votre nouveau mot de passe</label
                        >
                        <input
                            v-model="form.passwordNew"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="leroy@jenkins.com"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm"
                            >Veuillez confirmer votre nouveau mot de passe</label
                        >
                        <input
                            v-model="form.passwordNew"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="leroy@jenkins.com"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <div>
                        <button
                            @click.prevent="resetpassword"
                            type="button"
                            class="w-full px-8 py-3 font-semibold rounded-md bg-purple500 text-gray900"
                        >
                            Modifier le mot de passe
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
