<template>
  <div class="login-container">
    <form>
        <div class="formGroup">
            <label for="user_login">Login</label>
            <input type="text" id="user_login">
        </div>
        <div class="formGroup">
            <label for="user_login">Mot de passe</label>
            <input type="text" id="user_login">
        </div>
        <div>
            <div class="formGroup">
                <button type="submit">Connexion</button>
            </div>
        </div>
    </form>
  </div>
</template>
<noframes></noframes>

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
  background-color: #fff;
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
 