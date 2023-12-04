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
          <button id="add-to-cart">Add to Cart</button>
          <h4>Description</h4>
          <p>{{ product.description }}</p>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import { products } from '../fake-data';

export default {
    name: 'ProductDetailPage',
    data() {
      return {
        product: products.find((p) => p.id === this.$route.params.id),
      };
    }
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
</style>
