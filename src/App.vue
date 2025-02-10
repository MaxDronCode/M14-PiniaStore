<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/useProductStore.js'
import { useCartStore } from '@/stores/useCartStore.js'
const cartStore = useCartStore()
const productStore = useProductStore()

productStore.fill()

cartStore.$onAction(({
  name,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log('Added items to cart:', args[0])
    })
    onError((error) => {
      console.error('Error adding items to cart:', error.message)
    })
  }
})

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
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
