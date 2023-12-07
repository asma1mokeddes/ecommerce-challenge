<template>
   <div id="page-wrap">
    <ProductsGrid v-if="products.length>0" :products="products" />
    <div v-else>
      <h1>Aucun produits trouvés</h1>
    </div>
    </div>
  <div class="search-bar">
    <input type="text" v-model="searchTerm" placeholder="Rechercher des produits...">
    <select v-model="selectedCategory">
      <option value="">Toutes catégories</option>
      <!-- Options de catégories ici -->
    </select>
    <select v-model="selectedBrand">
      <option value="">Toutes marques</option>
      <!-- Options de marques ici -->
    </select>
    <input type="number" v-model.number="minPrice" placeholder="Prix min">
    <input type="number" v-model.number="maxPrice" placeholder="Prix max">
    <button @click="searchProducts">Rechercher</button>
  </div>
  
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      selectedCategory: '',
      selectedBrand: '',
      minPrice: null,
      maxPrice: null,
      products: []
    };
  },
  methods: {
    async searchProducts() {
      try {
        const query = new URLSearchParams({
          q: this.searchTerm,
          category: this.selectedCategory,
          brand: this.selectedBrand,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        }).toString();

        const response = await axios.get(`http://localhost:3000/products/search?${query}`);
        this.products = response.data;
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      }
    }
  }
}
</script>



<style scoped>

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
    .footer{
      flex-direction: column;
      margin-top: 3em;
    }
  }

  @media screen and (max-width: 650px) {
    header{
      height: initial;
    }

    .footer{
      margin: 4em auto 2em auto;
    }
  }

  #page-wrap {
    margin: auto;
  }

</style>


