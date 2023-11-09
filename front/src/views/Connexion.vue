<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" Method="POST">
        <div class="formGroup">
            <label for="email">Login</label>
            <input type="text" id="email" v-model="state.loginForm.email">
        </div>
        <div class="formGroup">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="state.loginForm.password">
        </div>
        <div class="formGroup">
            <button type="submit">Connexion</button>
        </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = reactive({
  loginForm: {
    email: '',
    password: ''
  }
});

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state.loginForm)
    });
    const data = await response.json();
    if (data.status === 401) {
      throw new Error(data.error);
    } else {
    localStorage.setItem('token', data.token);
    router.push('/produits');
    }
  
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
}
</script>



<style scoped>
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
  background: white;
}

.formGroup {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  color: black;
  margin-bottom: .5rem;
  align-items: center;
}

input[type="text"],
input[type="password"] {
  width: 300px; /* ajustez si nécessaire pour les marges */
  padding: 10px; /* Plus de remplissage pour un champ plus grand */
  margin-top: 5px;

  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: black;
  color: #333;
  font-size: 16px; /* Taille de texte plus grande pour une meilleure lisibilité */
  transition: background-color 0.3s, border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #6aa9af;
  box-shadow: 0 0 0 2px #6aa9af;
}



button {
  width: 100%;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #71C9CE;
  border: none;
  color: white;
  transition: transform 0.1s; /* Ajout de la transition pour l'animation */
}

button:hover {
  background-color: #63b1b8; /* Assombrissement du bouton au survol */
}

button:active {
  transform: scale(0.98); /* Effet de clic */
}
</style>


