<template>
    <div class="login-container">
      <form @submit.prevent="login" Method="POST">
        <div class="formGroup">
          <label for="email">Adresse email : </label>
          <input type="text" id="email" v-model="state.loginForm.emailAddress">
        </div>
        <div class="formGroup">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="state.loginForm.password">
        </div>
        <div class="formGroup">
          <button type="submit">Connexion</button>
        </div>

        <small class="text-right text-xs"
                >You don't have an account? Register
                <router-link to="/inscription" class="text-primary hover:underline"
                    >Here</router-link
                >.</small
            >
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const state = reactive({
    loginForm: {
      emailAddress: '',
      password: ''
    }
  });
  
  const login = async () => {
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
    background: #f0f0f0; /* Changer la couleur de fond selon votre préférence */
  }
  
  .formGroup {
    margin-bottom: 15px;
    width: 100%;
  }
  
  label {
    display: block;
    color: #333;
    margin-bottom: .5rem;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
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
  
  </style>
  