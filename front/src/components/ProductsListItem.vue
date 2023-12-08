<template>
  <div class="product-container">
    <img class="product-image" :src="imageURL" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price }}€</p>
    </div>

    <div class="quantity-select">
      <label for="quantity">Quantité : </label>
      <select v-model="selectedQuantity" @change="updateQuantity">
        <option v-for="quantity in quantityOptions" :key="quantity" :value="quantity">{{ quantity }}</option>
      </select>
    </div>

    <button class="remove-button" @click="removeFromCart(product.productId)">
      🗑️ Supprimer
    </button>
  </div>
</template>

<script>
export default {
    name: 'ProductsListItem',
    props: ['product','products'],
    data() {
      return {
        baseURL: 'http://localhost:3000',
        quantityOptions: [1, 2, 3, 4, 5],
        selectedQuantity: this.product.quantity ? this.product.quantity : 1,
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
    methods: {
      updateQuantity() {
      const updatedProduct = { ...this.product, quantity: this.selectedQuantity };
      const index = this.products.findIndex(item => item.productId === updatedProduct.productId);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
    },
    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId);
    },
  },
}

</script>

<style scoped>

.quantity-select {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

label {
  margin-right: 8px;
}

select {
  padding: 8px;
  font-size: 1em;
}
.product-container {
  align-items: center;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  padding: 16px;
  width: 1000px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.price {
  margin: 8px 0;
  font-size: 1.1em;
  color: #7F5DD0;
}

.remove-button {
  flex: 1;
  margin: auto;
  padding: 0.7em 1.5em;
  background: #c72c2f;
  border: none;
  border-radius: 3em;
  color: #fff;
  letter-spacing: 1px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-button:hover {
  background: #9a2325;
}
</style>

<style scoped>

.quantity-select {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

label {
  margin-right: 8px;
}

select {
  padding: 8px;
  font-size: 1em;
}
.product-container {
  align-items: center;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  padding: 16px;
  width: 1000px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.price {
  margin: 8px 0;
  font-size: 1.1em;
  color: #7F5DD0;
}

.remove-button {
  flex: 1;
  margin: auto;
  padding: 0.7em 1.5em;
  background: #c72c2f;
  border: none;
  border-radius: 3em;
  color: #fff;
  letter-spacing: 1px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s;
}

.remove-button:hover {
  background: #9a2325;
}
</style>