<template>
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
</template>
<noframes></noframes>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 90px;
}

.form-group {
  margin-bottom: 10%;
  

}

label {
  display: block;
  color: dark;
}

input[type=email],
input[type=password] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}


</style>