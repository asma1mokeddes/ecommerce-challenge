<template>
  <header>
  <div class="body">
      <div>
        <h1>Nike SuperRep Go</h1>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
        </div>
        <p> La paire de baskets qui allie style et confort. Fabriquée avec des matériaux de haute qualité, elle offre une expérience exceptionnelle à chaque pas. La technologie de pointe garantit un ajustement parfait, tandis que le design moderne ajoute une touche tendance à votre tenue.</p>
        <a href="#" class="btn">Ajouter au panier</a>
      </div>  
      <div>
        <img src="../assets/shoe.png" alt="Modele chaussure">
      </div>
    </div>
    
    <div class="body-footer">
      <div class="social">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>

    </div>
  </header>

  <div id="page-wrap">
    <div class="title-page-wrap">
      <h2>Nos nouveautés</h2>
      <span><router-link to="/products">Voir tous nos produits</router-link></span>
    </div>

    <ProductsGrid :products="products" />

  </div>

  <section class="feature-section">
      <div class="image-container">
          <img src="../assets/banniere-chaussures.jpg" alt="Desk" class="feature-image">
      </div>
      <div class="content-container">
          <div class="content-overlay">
              <div class="content-inner">
                  <h2 class="feature-heading">Améliore ton confort</h2>
                  <p class="feature-text">Trouvez la paire de chaussures qui vous convient le mieux et qui vous permettra de marcher avec style et confort.<br> Nous avons une large sélection de chaussures pour tous les goûts et tous les budgets.</p>
                  <a href="#" class="feature-button">Shop Workspace</a>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'; 
const BASE_URL = "http://localhost:3002";

import VueJwtDecode from 'vue-jwt-decode';
import { products } from '../fake-data';
import BottomBar from '../components/BottomBar.vue';
import ProductsGrid from '../components/ProductsGrid.vue';

export default {
    name: 'HomePage',
    components: {
      BottomBar, 
      ProductsGrid
    },
    data() {
      return {
        products: [],
      };
    },
    async created() {
      const response = await axios.get('http://localhost:3000/products');
      const products = response.data;
      this.products =  products.filter(product => product.newProduct === true);
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
    background: linear-gradient(45deg, #7F5DD0, rgb(122, 106, 162));
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
    background: #7F5DD0;
    border-radius: 3em;
    letter-spacing: 1px;
    font-size: 1em;
    transition: 0.3s;
  }

  .btn:hover{
    background: #9577db;
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
    padding-bottom: 50px;
    max-width: 1500px;
    width: 100%;
  }

  .title-page-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-page-wrap span a{
    color: #7F5DD0; 
    text-decoration: none;
    transition: 0.3s;
  }

  .title-page-wrap span a:hover{
    color: #5d4497; 
  }

  /* Styles de la section */
.feature-section {
  width: 100%;
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
  height: 400px;
  object-fit: cover;
  object-position: center;
}

/* Styles du conteneur de contenu avec fond semi-transparent */
.content-container {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 4rem 1rem;
}

/* Styles du contenu interne */
.content-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 20%;
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
  }

</style>

