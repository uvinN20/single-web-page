import { defineStore } from 'pinia'
import type { CartItem, Product } from '../types'

// 'cart' is the store's unique ID — used by Vue DevTools
export const useCartStore = defineStore('cart', {

  // STATE: the raw data
  state: () => ({
    items: [] as CartItem[],  // Array of { product, quantity }
  }),

  // GETTERS: read-only computed values
  getters: {
    // Total number of items (e.g. 3 items, each qty 2 → returns 6)
    totalItems: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    // Total price using discounted prices
    totalPrice: (state): number =>
      state.items.reduce((sum, item) => {
        // Apply discount: price × (1 - discountPercentage/100)
        const discounted = item.product.price * (1 - item.product.discountPercentage / 100)
        return sum + discounted * item.quantity
      }, 0),

    isEmpty: (state): boolean => state.items.length === 0,
  },

  // ACTIONS: functions that modify state
  actions: {
    addItem(product: Product): void {
      // Check if this product is already in the cart
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity++ // Just increase the count
      } else {
        this.items.push({ product, quantity: 1 }) // Add as new entry
      }
    },

    removeItem(productId: number): void {
      this.items = this.items.filter(i => i.product.id !== productId)
    },

    updateQty(productId: number, quantity: number): void {
      const item = this.items.find(i => i.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId) // Remove if qty goes to 0
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart(): void {
      this.items = []
    },
  },
})