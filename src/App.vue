<script setup>
import { ref, reactive } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/useProductStore.js'
import { useCartStore } from '@/stores/useCartStore.js'
const cartStore = useCartStore()
const productStore = useProductStore()
const history = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state))
const undo = () => {
  if (history.length === 1) return
  doingHistory.value = true
  history.pop()
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false
}
productStore.fill()

history.push(JSON.stringify(cartStore.$state))

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

cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state))
  }
})


</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
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
