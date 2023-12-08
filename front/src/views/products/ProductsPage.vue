<template>
  <div id="page-wrap">
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Rechercher des produits...">
      <input type="number" v-model="minPrice" placeholder="Prix min">
      <input type="number" v-model="maxPrice" placeholder="Prix max">
      <button @click="searchProducts">Rechercher</button>
    </div>
    <ProductsGrid v-if="products.length > 0" :products="products" />
    <div v-else>
      <h1>Aucun produits trouvés</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductsGrid from '../../components/ProductsGrid.vue';

export default {
    name: 'ProductsPage',
    components: {
        ProductsGrid
    },
    data() {
        return {
            products: [],
            searchTerm: '', // Holds the value entered in the search bar
            minPrice: null,
            maxPrice: null
        };
    },
    async created() {
        await this.fetchAllProducts();
    },
    methods: {
        async fetchAllProducts() {
            try {
                const response = await axios.get('http://localhost:3000/products/');
                this.products = response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        async searchProducts() {
            // Start with an empty array for query parameters
            let queryParams = [];

            // Check if searchTerm is provided and add it to the query parameters
            if (this.searchTerm) {
                queryParams.push(`q=${encodeURIComponent(this.searchTerm)}`);
            }

            // Check if minPrice is provided and add it to the query parameters
            if (this.minPrice) {
                queryParams.push(`minPrice=${this.minPrice}`);
            }

            // Check if maxPrice is provided and add it to the query parameters
            if (this.maxPrice) {
                queryParams.push(`maxPrice=${this.maxPrice}`);
            }

            // Join the query parameters with '&' to form the final query string
            let searchQuery = queryParams.join('&');

            try {
                const response = await axios.get(`http://localhost:3000/products/search?${searchQuery}`);
                this.products = response.data;
                console.log("Found products:", this.products);
            } catch (error) {
                console.error("Error searching products:", error);
        }
    },
    }
};
</script>

<!-- Add your existing styles here -->
<style scoped>
  /* ... existing styles ... */
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .search-bar input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .search-bar button {
    padding: 10px 15px;
    background-color: #71C9CE;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .search-bar button:hover {
    background-color: #A6E3E9;
  }
</style>
