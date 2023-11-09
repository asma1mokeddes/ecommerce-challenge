<template>
  <div id="page-wrap">
    <ProductsGrid :products="products" />
  </div>

</template>

<script>
import { products } from '../fake-data';
import ProductsGrid from '../components/ProductsGrid.vue';

export default {
    name: 'ProductsPage',
    components: {
        ProductsGrid
      },
    data() {
      return {
        products
      };
    }
};
</script>

<style scoped>

  .btn {
    padding: 0.7em 1.5em;
    background: #71C9CE;
    border-radius: 3em;
    letter-spacing: 1px;
    font-size: 1em;
    transition: 0.3s;
  }

  .btn:hover{
    background: #A6E3E9;
  }

  #page-wrap {
    padding-top: 50px;
    max-width: 1500px;
  }

  .title-page-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-page-wrap span a{
    color: #71C9CE; 
    text-decoration: none;
    transition: 0.3s;
  }

  .title-page-wrap span a:hover{
    color: #55a8ad; 
  }
  .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }

  .product-item {
    background: white;
    outline: 1px solid #dcdbeb;
    align-items: center;
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

  @media screen and (max-width: 1210px) {
    .body{
      grid-template-columns: 1fr;
      text-align: center;
    }
    header::before{
      display: none;
    }
    header{
      height: initial;
    }
    .body > div:nth-child(2){
      justify-content: center;
      margin: 3em 0;
    }
    .body img{
      transform: none;
    }
    .body p{
      margin: 2em auto 3em auto;
    }
  }

  @media screen and (max-width: 800px) {
    .body img {
      width: 90%;
    }
    .footer{
      flex-direction: column;
      margin-top: 3em;
    }
  }

  @media screen and (max-width: 650px) {
    header{
      height: initial;
    }

    .footer{
      margin: 4em auto 2em auto;
    }
  }

  #page-wrap {
    margin: auto;
  }

</style>

