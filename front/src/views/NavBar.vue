<template>
    <nav>
        <div class="container">
            <div class="navbar-content">
                <router-link to="/home" class="logo-link"><img src="logo.png" alt="Logo" class="logo"></router-link>
                <div class="menu" :class="{ 'nav-toggle': isNavToggled }">
                    <ul>
                        <li><router-link to="/products">Femmes</router-link></li>
                        <li><router-link to="/products">Hommes</router-link></li>
                        <li><router-link to="/about">Marques</router-link></li>
                    </ul>
                    <form action="">
                        <div class="search-icon"><i class="fas fa-search"></i></div>
                        <input type="text" class="search" placeholder="Rechercher...">
                    </form>
                    <button @click="logout" v-if="isUserLoggedIn"><i class="fas fa-sign-out-alt"></i></button>
                    <router-link v-if="!isUserLoggedIn" to="/connexion"><i class="fas fa-user"></i></router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from "axios";

export default {
    name: "NavBar",
    data() {
        return {
            isUserLoggedIn: false,
        };
    },
    mounted() {
        this.checkUserLoggedIn();
    },
    methods: {
        async checkUserLoggedIn() {
            const token = localStorage.getItem("token");
            if (token) {
                this.isUserLoggedIn = true;
                console.log("isUserLoggedIn.value", this.isUserLoggedIn);
            }
        },
        async logout() {
            try {
                await axios({
                    baseURL: "http://localhost:3002",
                    method: "POST",
                    url: "/auth/logout",
                });
                this.isUserLoggedIn = false;
                this.$router.push("/connexion");
            } catch (error) {
                console.error("Error deconnexion user:", error);
            }
        },
    },
};
</script>


<style scoped>
nav {
    background: rgb(120, 115, 178);
    color: white;
    z-index: 99;
    position: relative;
}

nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1150px;
    padding: 1em;
    margin: 0 auto;
}

nav .navbar-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

nav .menu,
nav form {
    display: flex;
    align-items: center;
}

nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
    margin: 0 15px;
}

nav ul li {
    margin: 0 15px;
}

nav ul a {
    font-size: 1em;
    text-transform: uppercase;
    color: white;
    transition: color 0.2s;
}

nav ul a:hover {
    color: #ffffff;
}

nav .search-form {
    display: flex;
    align-items: center;
    margin-left: auto;
}

nav form input {
    background: rgba(254, 254, 254, 0.155);
    color: white;
    width: 15em;
    padding: 0.5em 1em;
    border: none;
    outline: none;
}

nav form input::placeholder {
    color: white;
}

.logo {
    width: 4em;
    display: inline-block;
}

/* ... styles responsives ... */

</style>
