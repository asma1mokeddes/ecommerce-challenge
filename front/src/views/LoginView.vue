<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import axiosInstance from "@/utils/axiosInstance";
import { useMainStore } from "@/stores/main";
const form = reactive({
  email: "",
  password: "",
});
const state = reactive({
  error: "",
});

const router = useRouter();



const login = () => {
  axiosInstance.post("/auth/login", form).then((response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    useMainStore().setUser(response.data.user);
    router.push("/");
  });
};

const handleLogin = () => {
  // Appeler la fonction de connexion
  login();
};
</script>

<template>
	<div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray900 text-gray100">
		<div class="mb-8 text-center">
			<h1 class="my-3 text-4xl font-bold">Se connecter</h1>
			<p class="text-sm text-gray400">Connectez-vous pour accéder à votre compte</p>
		</div>
		<form novalidate="" action="" class="space-y-12">
			<div class="space-y-4">
				<div>
					<label for="email" class="block mb-2 text-sm">Addresse email</label>
					<input  v-model="form.email" type="email" name="email" id="email" placeholder="leroy@jenkins.com" class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100">
				</div>
				<div>
					<div class="flex justify-between mb-2">
						<label for="password" class="text-sm">Mot de passe</label>
						<a rel="noopener noreferrer" href="#" class="text-xs hover:underline text-gray400">Mot de passe oublié?</a>
					</div>
					<input  v-model="form.password" type="password" name="password" @click="handleLogin" id="password" placeholder="*****" class="w-full px-3 py-2 border rounded-md border-gray700 bg-gray900 text-gray100">
				</div>
			</div>
			<div class="space-y-2">
				<div>
					<button type="button" class="w-full px-8 py-3 font-semibold rounded-md bg-purple text-gray900">Connexion</button>
				</div>
				<p class="px-6 text-sm text-center text-gray400">Vous n'avez pas encore de compte?
					<a rel="noopener noreferrer" href="#" class="hover:underline text-purple">Inscrivez-vous</a>.
				</p>
			</div>
		</form>
	</div>
</template>