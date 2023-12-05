
<template>
  <nav-bar />
  <router-view/>
  <bottom-bar />
</template>

<script>
import Connexion from './views/LoginView.vue';
import BottomBar from './components/BottomBar.vue';
import NavBar from './components/NavBar.vue';
import { RouterView } from "vue-router";

export default {
  components: {
        BottomBar,
        Connexion,
        NavBar,

  },
  data() {
    return {
      isNavToggled: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavToggled = !this.isNavToggled; // Inverse l'état au clic du bouton
    },
  },
};
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body{
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background: #F6F6F6;
  }

  #page-wrap {
    margin: auto;
    max-width: 800px;
  }

    
  @media screen and (max-width: 800px) {
    html{
      font-size: 14px;
    }
    .body img {
      width: 90%;
    }
  }


  button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }
</style>