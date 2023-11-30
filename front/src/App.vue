<template>
  <nav-bar />
  <router-view/>
  <bottom-bar />

</template>

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
    min-height: 100vh;
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

<script>
import BottomBar from './views/BottomBar.vue';
import NavBar from './views/NavBar.vue';
import Connexion from './views/Connexion.vue';

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
