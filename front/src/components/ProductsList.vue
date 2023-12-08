<template>
    <div v-if="products.length > 0">
        <ProductsListItem
            v-for="product in products"
            v-on:remove-from-cart="$emit('remove-from-cart', $event)"
            v-on:update-quantity="$emit('update-quantity', $event)"
            :key="product.id"
            :products="products"
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