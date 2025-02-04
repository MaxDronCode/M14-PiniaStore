import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash'

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count)
      for (let i = 0; i < count; i++) {
        this.items.push({...item})
      }
    },
    clearItem(name) {
      return this.items = this.items.filter(item => item.name !== name)
    },
    setItemCount(item, count) {
      count = parseInt(count)
      const index = this.items.findIndex(i => i.name === item.name)
      if (index !== -1) {
        this.items.splice(index, 1)
        for (let i = 0; i < count; i++) {
          this.items.push({...item})
        }
      }
    }
  },
  getters: {
    count() {
      return this.items.length
    },
    isEmpty() {
      return isEmpty(this.items)
    },
    grouped: state => groupBy(state.items, item => item.name),
    groupCount: state => name => state.grouped[name].length,
    // recorrem state.items amb el reduce, per cada item sumem el preu i retornem el total, el 0 del final indica que el total comença a 0
    totalPrice: state => state.items.reduce((total, item) => total + item.price, 0)
  }
})