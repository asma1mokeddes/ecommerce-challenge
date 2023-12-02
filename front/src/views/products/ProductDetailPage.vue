<template>
  <div>

    <div id="page-wrap">
      <div class="product-wrap">
        <div id="img-wrap">
          <img v-bind:src="product.imageUrl" />
        </div>
        <div id="product-details">
          <h1>{{ product.name }}</h1>
          <h3 id="price">{{ product.price }}€</h3>
          <p>Average rating: {{ product.averageRating }}</p>
          <button
            id="add-to-cart"
            v-if="!itemIsInCart && !showSuccessMessage"
            v-on:click="addToCart"
          >Ajouter au panier</button>
          <button
            id="add-to-cart"
            class="green-button"
            v-if="!itemIsInCart && showSuccessMessage"
          >Votre produit a été ajouté au panier !</button>
          <button
            id="add-to-cart"
            class="grey-button"
            v-if="itemIsInCart"
          >Ce produit est déjà dans votre panier</button>
          <h4>Description</h4>
          <p>{{ product.description }}</p>
        </div>
      </div>
      </div>
  </div>
  <p>Bienvenue, {{ loggedInUsername }}</p>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'; 
const BASE_URL = "http://localhost:3002";

import VueJwtDecode from 'vue-jwt-decode';

export default {
    name: 'ProductDetailPage',
    data() {
      return {
        product: {},
        cartItems: [],
        showSuccessMessage: false,
      };
    }, 
    computed: {
      itemsInCart() {
        return this.cartItems.some(item => item.id === this.product.id);
      },
    },
    methods: {
      async addToCart() {
        await axios.post('/api/users/1/cart', {
          productId: this.$route.params.id,
        });
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.$router.push('/products');
        }, 1500);
      },
    },
    async created(){
      const { data: product } = await axios.get(`http://localhost:3000/products/${this.$route.params.id}`);
      this.product = product;

      const { data: cartItems } = await axios.get(`http://localhost:3000/cart/users/1/cart`);
      this.cartItems = cartItems;
    },
    setup() {
      const loggedInUsername = ref("");

      onMounted(async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = VueJwtDecode.decode(token);
          loggedInUsername.value = decodedToken.userId;
        }
      });
      return {
      loggedInUsername,
    };
    },
};
</script>

<style scoped>
  #page-wrap{
    max-width: 1200px;
    font-family: "Roboto";
  }
  .product-wrap {
    display: flex;
    align-items: center;
    gap: 50px;
    margin: 50px auto;
    background: white;
    outline: 1px solid #eeecec;
    border-radius: 12px;
    width: 100%;
    justify-content: space-between;
    padding: 50px;
  }

  #img-wrap {
    text-align: center;
    background: white;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
    max-width: 600px;
  }

  #product-details p{
    color: #6B7290;
    line-height: 28px;
  }
  #add-to-cart {
    width: 50%;
    background: #71C9CE;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }
  .green-button {
    background-color: green;
  }
  .grey-button {
    background-color: #888;
  }
</style>
