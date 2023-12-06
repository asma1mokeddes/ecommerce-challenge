<template>
    <div class="product-container">
      <img class="product-image" :src="imageURL" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}€</p>
      </div>
      <button
        class="remove-button"
        v-on:click="$emit('remove-from-cart', product.productId)"
      >Retirer du panier</button>
    </div>
</template>

<script>
export default {
    name: 'ProductsListItem',
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
}

</script>

<style scoped>

.product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    background: white;
    display: flex;
    padding: 16px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
    padding: 0.7em 1.5em;
    background: #c72c2f;
    border-radius: 3em;
    letter-spacing: 1px;
    font-size: 1em;
    transition: 0.3s;
  }
  
  .remove-button:hover{
    background: #9a2325;
  }
</style>