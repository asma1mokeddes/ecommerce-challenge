<template>
  <div id="page-wrap">
    <h1>Panier</h1>
    <ProductsList
      :products="cartItems"
      v-on:remove-from-cart="removeFromCart($event)"
      v-on:update-quantity="updateQuantity($event)"/>
    <h3 id="total-price">Total: {{ totalPrice }}€</h3>

    <form @submit.prevent="updateOrder" class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse de livraison</label>
          <input v-model="address" type="text" id="address" class="mt-1 p-2 w-full rounded-md focus:ring focus:border-indigo-300 border-gray-300">
        </div>
        <div class="mb-4">
          <label for="tel" class="block text-sm font-medium text-gray-700">Téléphone</label>
          <input v-model="telephone" type="text" id="tel" class="mt-1 p-2 w-full rounded-md focus:ring focus:border-indigo-300 border-gray-300">
        </div>
      </form>

    <div class="center-container">
      <button @click="payement" id="checkout-button">Valider la commande</button>
    </div>
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
        userId: '',
        address: '',
        telephone: '',
      }
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price) * (item.quantity ? item.quantity : 1),
          0
        );
      }
    },
    methods: {
      async isItemExpired(item) {
        const currentTime = new Date();
        return currentTime > new Date(item.expirationTime);
      },

      async payement() {
        try {
        const token = localStorage.getItem('token'); 
        if (token) {
             this.userId = VueJwtDecode.decode(token).user.userId;
        }
        const orderObject = {
          userId: this.userId, 
          deliveryAddress: this.address,
          telephone: this.telephone ? this.telephone : '',
          products: this.cartItems.map(item => ({
            id: item.productId,
            price: item.price,
            quantity: item.quantity ? item.quantity : 1,
          })),
        };

        const response = await axios.post(`http://localhost:3002/order`, orderObject, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { orderId } = response.data;
        this.$router.push(`/orders/validation/${orderId}`);
      } catch (error) {
        console.log(error);
      }
},
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

        const currentTime = new Date();
        const cartItems = result.data.map(item => {
          item.expirationTime = new Date(currentTime.getTime() + 15 * 60000); // 15 minutes en millisecondes
          return item;
        });
        this.cartItems = cartItems.filter(item => !this.isItemExpired(item));

        // const cartItems = result.data;
        console.log(cartItems);
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

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #checkout-button {
    width: 40%;
    margin: 30px auto;
    padding: 0.7em 1.5em;
    background: #7F5DD0;
    border: none;
    border-radius: 3em;
    color: #fff;
    letter-spacing: 1px;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s;
}

#checkout-button:hover {
  background: #9577db;
}

</style>
