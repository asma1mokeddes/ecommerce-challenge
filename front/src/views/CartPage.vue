<template>
  <div id="page-wrap">
    <h1>Panier</h1>
    <ProductsList
      :products="cartItems"
      v-on:remove-from-cart="removeFromCart($event)"/>
    <h3 id="total-price">Total: {{ totalPrice }}€</h3>
    <button id="checkout-button">Procéder au paiement</button>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios'
import ProductsList from '../components/ProductsList.vue';

export default {
    name: 'CartPage',
    components: {
      ProductsList
    },
    data() {
      return {
        cartItems: [],
        userId: ''
      }
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
        );
      },
    },
    methods: {
      async removeFromCart(productId) {
        try {
        const token = localStorage.getItem('token'); 
        if (token) {
             this.userId = VueJwtDecode.decode(token).user.userId;
        }
        const result = await axios.delete(`http://localhost:3002/cart/users/${this.userId}/cart/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        this.cartItems = result.data;
        this.$forceUpdate();  // Forcer la mise à jour du rendu
      } catch (error) {
        console.log(error);
      }
      },
    },
    async created(){
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
             this.userId = VueJwtDecode.decode(token).user.userId;
        }
        const result = await axios.get(`http://localhost:3002/cart/users/${this.userId}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartItems = result.data;
        this.cartItems = cartItems;
      } catch (error) {
        console.log(error);
      }
    },
};
</script>

<style scoped>
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }

</style>
