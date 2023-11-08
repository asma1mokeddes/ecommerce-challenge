<template>
    <div class="login-container">
    <form>
        <div class="formGroup">
            <label for="user_login">Nom</label>
            <input type="text" id="user_lastname">
        </div>
        <div class="formGroup">
            <label for="user_login">Prénom</label>
            <input type="text" id="user_firstname">
        </div>
        <div class="formGroup">
            <label for="user_login">Mot de passe</label>
            <input type="text" id="user_password">
        </div>
        <div class="formGroup">
            <label for="user_login">Confirmer le mot de mot de passe</label>
            <input type="text" id="user_confirmation">
        </div>
        <div>
            <div class="formGroup">
                <button type="submit">Inscription</button>
            </div>
        </div>
    </form>
</div>
</template>
<noframes></noframes>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column; /* Empile les éléments verticalement */
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* S'assure que le container s'étend sur toute la hauteur de la fenêtre */
  padding: 20px;
  box-sizing: border-box;
  width: 40%; /* Réduire la largeur du formulaire */
  max-width: 400px; /* Maximum width to prevent it from being too wide on larger screens */
  margin: auto; /* Centre le conteneur dans la page */
  
  border-radius: 8px; /* Bords arrondis pour le container */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre légère pour le container */
}

.formGroup {
  margin-bottom: 15px;
  width: 100%; /* Force tous les éléments de formulaire à occuper tout l'espace disponible dans le .login-container */
}

label {
  display: block;
  color: black; /* Change la couleur du texte des étiquettes pour le contraste avec l'arrière-plan bleu */
  margin-bottom: .5rem; /* Ajoute un peu d'espace sous l'étiquette */
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 16px); /* calc() permet de déduire la marge interne de la largeur totale */
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: rgba(255, 255, 255, 0.8);
}

button {
  width: 100%;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #71C9CE;
  border: none; /* Supprime la bordure par défaut des boutons */
  color: #fff; /* Change la couleur du texte pour le contraste */
}

</style>
