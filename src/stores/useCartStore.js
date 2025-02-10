import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import { groupBy } from 'lodash'
import { useAuthUserStore } from './useAuthUserStore'

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
      this.items = this.items.filter(i => i.name !== item.name)
      for (let i = 0; i < count; i++) {
        this.items.push({...item})
      }
    },
    checkout() {
      const authUserStore = useAuthUserStore()
      alert(`${authUserStore.username} just bought ${this.count} items for a total of $${this.totalPrice}`)
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
    totalPrice: state => state.items.reduce((total, item) => total + item.price, 0),
    groupedArray: (state) => {
      const groups = groupBy(state.items, item => item.name)
      return Object.keys(groups)
      .sort()
      .map(key => ({
        name: key,
        items: groups[key]
      }))
    }
  }
})