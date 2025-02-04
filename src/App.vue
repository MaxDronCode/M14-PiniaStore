<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/useProductStore.js'
import { useCartStore } from '@/stores/useCartStore.js'
const cartStore = useCartStore()
const productStore = useProductStore()
productStore.fill()
// const addToCart = (count, product) => {
//   count = parseInt(count)
//   cartStore.$patch(state => {
//     for (let i = 0; i < count; i++) {
//     state.items.push(product)
//   }
//   })
// }
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
