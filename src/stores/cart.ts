import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalItems: (s) => s.items.reduce((n, i) => n + i.quantity, 0),
    totalPrice: (s) => s.items.reduce((n, i) => n + i.product.price * i.quantity, 0),
  },
  actions: {
    addItem(product: Product) {
      const found = this.items.find(i => i.product.id === product.id)
      found ? found.quantity++ : this.items.push({ product, quantity: 1 })
    },
    removeItem(id: number) {
      this.items = this.items.filter(i => i.product.id !== id)
    },
    updateQty(id: number, qty: number) {
      const item = this.items.find(i => i.product.id === id)
      if (item) item.quantity = qty
    }
  }
})