<template>
    <div class="product-form-container">
      <form @submit.prevent="handleProductCreation" method="POST">
        <!-- Product Name -->
        <div class="formGroup">
          <label for="productName">Nom du Produit</label>
          <input type="text" id="productName" v-model="state.productForm.productName" required>
        </div>
  
        <!-- Description -->
        <div class="formGroup">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="state.productForm.description">
        </div>
  
        <!-- Price -->
        <div class="formGroup">
          <label for="price">Prix</label>
          <input type="number" id="price" v-model="state.productForm.price" required>
        </div>

        <div class="formGroup">
          <label for="image">Nom de l'image</label>
          <input type="file" name="image" @change="handleImageChange" />
        </div>
  
        <!-- Category Dropdown -->
        <div class="formGroup">
          <label for="category">Catégorie</label>
          <select id="category" v-model="state.productForm.category">
            <option disabled value="">Sélectionner une catégorie</option>
            <option v-for="category in categories" :key="category._id" :value="category.categoryName">
              {{ category.categoryName }}
            </option>
          </select>
        </div>
  
        <!-- Brand Dropdown -->
        <div class="formGroup">
          <label for="brand">Marque</label>
          <select id="brand" v-model="state.productForm.brand">
            <option disabled value="">Sélectionner une marque</option>
            <option v-for="brand in brands" :key="brand._id" :value="brand.brandName">
              {{ brand.brandName }}
            </option>
          </select>
        </div>
  
        <!-- Promo Dropdown -->
        <div class="formGroup">
          <label for="promo">Promo</label>
          <select id="promo" v-model="state.productForm.promo">
            <option disabled value="">Sélectionner une promo</option>
            <option v-for="promo in promos" :key="promo._id" :value="promo.promoCode">
              {{ promo.promoCode }}
            </option>
          </select>
        </div>
  
        <div class="formGroup">
          <button type="submit">Créer Produit</button>
        </div>
      </form>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const categories = reactive([]);
  const brands = reactive([]);
  const promos = reactive([]);

  const imageInput = ref("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    imageInput.value = file ? file.name : '';
  };

  const fetchResource = async (resource, targetArray) => {
    try {
      const response = await fetch(`http://localhost:3000/${resource}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}`);
      }
      const data = await response.json();
      targetArray.push(...data);
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
    }
  };
  
  onMounted(() => {
    fetchResource('categories', categories);
    fetchResource('brands', brands);
    fetchResource('promos', promos);
  });
  
  const state = reactive({
    productForm: {
      productName: '',
      description: '',
      price: null,
      category: '',
      brand: '',
      promo: '',
    }
  });
  
  const handleProductCreation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            productName: state.productForm.productName,
            description: state.productForm.description,
            price: state.productForm.price,
            image: imageInput.value,
            variants: {
                category: state.productForm.category,
                brand: state.productForm.brand,
                promo: state.productForm.promo,
            }
        })      
      });
      const data = await response.json();
      if (response.status !== 201) {
        throw new Error(data.message);
      } else {
        console.log('Product created successfully:', data);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
  </script>
  
  <style scoped>
  .product-form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    margin: auto;
    border-radius: 8px;
    background: #f4f4f4; /* Light gray background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .formGroup {
    margin-bottom: 20px;
    width: 100%;
  }
  
  label {
    display: block;
    color: #333; /* Darker font color for better contrast */
    margin-bottom: 10px;
    font-size: 18px; /* Larger font size for labels */
  }
  
  input[type="text"],
  input[type="number"],
  select {
    width: 100%; /* Full width */
    padding: 12px 20px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
    font-size: 16px;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus,
  select:focus {
    border-color: #007bff; /* Blue border for focus */
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  button {
    width: 100%;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #007bff; /* Blue background */
    border: none;
    color: white;
    font-size: 18px; /* Larger font size for button */
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  button:active {
    transform: scale(0.98); /* Click effect */
  }
  </style>