<template>
    <div v-if="products.length > 0">
        <ProductsListItem
            v-for="product in products"
            v-on:remove-from-cart="$emit('remove-from-cart', $event)"
            :key="product.id"
            :product="product" />
    </div>
    <p v-else>Vous n'avez rien dans votre panier !</p>
</template>

<script>
import ProductsListItem from './ProductsListItem.vue';

export default {
    name: 'ProductsList',
    props: ['products'],
    components: {
        ProductsListItem,
    },
}
</script>