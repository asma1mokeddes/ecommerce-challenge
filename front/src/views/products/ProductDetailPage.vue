<template>
  <div id="page-wrap">
    <div class="product-wrap">
      <div id="img-wrap">
        <img :src="imageURL" alt="Product Image" />
      </div>
      <div id="product-details">
        <h1 class="product-title">{{ product.productName }}</h1>
        <h3 class="product-price">{{ product.price }}€</h3>
        <button
          class="add-to-cart-btn primary"
          v-if="!itemIsInCart && !showSuccessMessage"
          @click="addToCart"
        >
          Ajouter au panier
        </button>
        <button
          class="add-to-cart-btn success"
          v-if="!itemIsInCart && showSuccessMessage"
        >
          Ajouté au panier !
        </button>
        <button
          class="add-to-cart-btn disabled"
          v-if="itemIsInCart"
          disabled
        >
          Dans le panier
        </button>
        <h4>Description</h4>
        <p class="product-description">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axiosInstance from "@/utils/axiosInstance";
const BASE_URL = "http://localhost:3002";

import VueJwtDecode from 'vue-jwt-decode';


export default {
    name: 'ProductDetailPage',
    data() {
      return {
        productId: parseInt(this.$route.params.id, 10),
        product: {},
        cartItems: [],
        showSuccessMessage: false,
        baseURL: 'http://localhost:3000',
        userId: '',
      };
    },
    computed: {
      itemsInCart() {
        return this.cartItems.some(item => item.id === this.product.id);
      },
      imageRelativePath() {
      return `/uploads/${this.product.image}`;
    },
      imageURL() {
        return `${this.baseURL}${this.imageRelativePath}`;
      },
    },
    methods: {
      async addToCart() {
        const token = localStorage.getItem('token'); 
        if (token) {
             this.userId = VueJwtDecode.decode(token).user.userId;
        }
        await axiosInstance.post(`http://localhost:3002/cart/users/${this.userId}/cart`, {
          productId: this.productId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.$router.push('/products');
        }, 1500);
      },
    },
    async created(){
      try {
        const { data: product } = await axiosInstance.get(`http://localhost:3000/products/${this.$route.params.id}`);
        this.product = product;

        const token = localStorage.getItem('token'); 
        if (token) {
             this.userId = VueJwtDecode.decode(token).user.userId;
        }
        const result = await axiosInstance.get(`http://localhost:3002/cart/users/${this.userId}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartItems = result.data;
        console.log(cartItems);
        this.cartItems = cartItems;
      } catch (error) {
        console.log(error);
      }
    },
};
</script>

<style scoped>
#page-wrap {
  max-width: 1000px;
  font-family: "Roboto";
}

.product-wrap {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  background: white;
  outline: 1px solid #eeecec;
  border-radius: 12px;
  padding: 20px;
}

#img-wrap {
  text-align: center;
  background: white;
}

img {
  width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#product-details {
  padding: 10px;
  flex-grow: 1;
}

.product-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  color: #ff4500; /* Orange Red color */
  margin-bottom: 16px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  background: #7F5DD0;
}

.add-to-cart-btn:hover {
  background-color: #9577db;
}

.add-to-cart-btn.success {
  background-color: #5cb85c; /* Green color */
  color: #fff;
}

.add-to-cart-btn.disabled {
  background-color: #ddd; /* Light gray color */
  color: #666;
  cursor: not-allowed;
}

.product-description {
  color: #6b7290;
  line-height: 1.6;
}
</style>