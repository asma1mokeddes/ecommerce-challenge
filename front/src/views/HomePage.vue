<template>
    <header>
    <div class="body">
        <div>
          <h1>Marche Magique</h1>
          <p><h4>
Bienvenue chez Marche Magique, votre destination incontournable pour des chaussures de qualité supérieure. Notre boutique propose une vaste sélection de chaussures pour hommes et femmes, allant des classiques intemporels aux dernières tendances. Chaque paire est soigneusement choisie pour garantir confort, style et durabilité. Que vous cherchiez des escarpins élégants, des baskets confortables ou des bottes robustes, Marche Magique vous accompagne à chaque étape de votre journée.</h4></p>
          
        </div>  
        <div>
          <img src="../assets/shoe.png" alt="Modele chaussure">
        </div>
      </div>
  
      
    </header>
  
    <div id="page-wrap">
      <div class="title-page-wrap">
        <h2>Nos nouveautés</h2>
        <span><router-link to="/products">Voir tous nos produits</router-link></span>
      </div>
  
      <div class="grid-wrap">
        <div
          v-for="product in products"
          class="product-item"
          v-bind:key="product.id"
        >
        <img v-bind:src="product.imageUrl">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}€</p>
        <router-link v-bind:to="'/products/' + product.id">
          <button class="btn">Détails</button>
        </router-link>
        </div>
      </div>

    </div>
  
   
  </template>
  
  <script>
  import { products } from '../fake-data';
  import BottomBar from './BottomBar.vue';
  
  export default {
      name: 'HomePage',
      components: {
        BottomBar
      },
      data() {
        return {
          products: products.filter(product => product.new === true)
        };
      }
  };
  </script>
  
  <style scoped>
  
  header a {
      color: #fff;
      text-decoration: none;
  }
  
  header {
      height: 90vh;
      background: #090909;
      position: relative;
      overflow: hidden;
      color: #fff;
    }
  
    header::before {
      content: '';
      position: absolute;
      top: 0;
      right: -40em;
      background: linear-gradient(45deg, #71C9CE, #CBF1F5);
      width: 100%;
      height: 120%;
      transform: rotate(70deg);
      z-index: 0;
    }
  .body{
      display: grid;
      justify-content: space-around;
      align-content: center;
      grid-template-columns: 2fr 3fr;
      grid-gap: 2em;
      height: 75%;
      position: relative;
      z-index: 1;
      max-width: 1250px;
      margin: 50px auto;
      padding: 0 3em;
    }
  
    .body h1{
      font-size: 3.5em;
      margin: 0.5em 0;
    }
  
    .body h4{
      font-size: 1.5em;
      margin: 0.5em 0;
    }
  
    .body p{
      letter-spacing: 2px;
      line-height: 25px;
      font-size: 0.9em;
      margin: 2em 0 3em 0;
      max-width: 45em;
    }
  
    .btn {
      padding: 0.7em 1.5em;
      background: #71C9CE;
      border-radius: 3em;
      letter-spacing: 1px;
      font-size: 1em;
      transition: 0.3s;
    }
  
    .btn:hover{
      background: #A6E3E9;
    }
  
    .body > div:nth-child(2){
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  
    .body .fas {
      color: #fcc204;
    }
  
    .body img{
      width: 32em;
      height: 32em;
      transform: rotate(25deg);
    }
  
    .body-footer {
      max-width: 1250px;
      margin: 0 auto;
      padding: 0 3em;
      position: relative;
    }
  
    .body-footer a {
      margin: 0 0.4em;
      font-size: 1.2em;
    }
  
    #page-wrap {
      padding-top: 50px;
      max-width: 1500px;
    }
  
    .title-page-wrap{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .title-page-wrap span a{
      color: #71C9CE; 
      text-decoration: none;
      transition: 0.3s;
    }
  
    .title-page-wrap span a:hover{
      color: #55a8ad; 
    }
    .grid-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 16px;
    }
  
    .product-item {
      background: white;
      outline: 1px solid #dcdbeb;
      align-items: center;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      margin-bottom: 2%;
      padding: 20px;
      position: relative;
      width: 32%;
    }
  
    .product-name {
      margin-bottom: 0;
    }
  
    img {
      height: 200px;
      width: 200px;
    }
  
    a {
      width: 100%;
    }
  
    button {
      width: 100%;
    }

    /* Styles de la section */
.feature-section {
    max-width: 100%;
    margin: auto;
    position: relative;
}

/* Styles du conteneur d'image */
.image-container {
    position: relative;
    overflow: hidden;
}

/* Styles de l'image */
.feature-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
}

/* Styles du conteneur de contenu avec fond semi-transparent */
.content-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 4rem 1rem;
}

/* Styles du contenu interne */
.content-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: white;
}

.feature-heading {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.feature-text {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.feature-button {
    display: inline-block;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.25rem;
    background-color: white;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s;
}

.feature-button:hover {
    background-color: #f0f0f0;
}

  
    @media screen and (max-width: 1210px) {
      .body{
        grid-template-columns: 1fr;
        text-align: center;
      }
      header::before{
        display: none;
      }
      header{
        height: initial;
      }
      .body > div:nth-child(2){
        justify-content: center;
        margin: 3em 0;
      }
      .body img{
        transform: none;
      }
      .body p{
        margin: 2em auto 3em auto;
      }
    }
  
    @media screen and (max-width: 800px) {
      .body img {
        width: 90%;
      }
      .body-footer{
        flex-direction: column;
        margin-top: 3em;
      }
    }
  
    @media screen and (max-width: 650px) {
      header{
        height: initial;
      }
  
      .body-footer{
        margin: 4em auto 2em auto;
      }
    }
  
    #page-wrap {
      margin: auto;
      min-height: 100vh;
    }
  
  </style>
  
  