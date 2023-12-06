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
                    Insérez votre adresse email pour obtenir un email de
                    réinitialisation
                </p>
            </div>
            <form novalidate="" action="" class="space-y-12">
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block mb-2 text-sm"
                            >Votre adresse email</label
                        >
                        <input
                            v-model="form.email"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <div>
                        <button
                            @click.prevent="reset"
                            type="button"
                            class="w-full px-8 py-3 font-semibold rounded-md bg-purple500 text-gray900"
                        >
                            Envoyer le mail de rénitialisation
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
