<template>
  <div class="product-item">
    <img :src="imageURL" alt="Product Image">
    <h3 class="product-name">{{ product.productName }}</h3>
    <p class="product-price">{{ product.price }}€</p>
    <router-link :to="'/products/' + product.productId">
      <button class="btn">Détails</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductsGridItem',
  props: ['product'],
  data() {
    return {
      baseURL: 'http://localhost:3000'
    };
  },
  computed: {
    imageRelativePath() {
      return `/uploads/${this.product.image}`;
    },
    imageURL() {
      return `${this.baseURL}${this.imageRelativePath}`;
    },
  },
};
</script>


<style scoped>
.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
  }
  .product-item {
      background: white;
      outline: 1px solid #dcdbeb;
      align-items: center;
      text-align: center;
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

    .btn {
      padding: 0.7em 1.5em;
      background: #7F5DD0;
      color: white;
      border-radius: 3em;
      letter-spacing: 1px;
      font-size: 1em;
      transition: 0.3s;
    }
  
    .btn:hover{
      background: #5d4497;
    }
</style>