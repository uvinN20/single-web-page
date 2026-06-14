import { ref } from 'vue'
import type { Product } from '../types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts(limit = 12, skip = 0, category?: string) {
    loading.value = true
    const base = 'https://dummyjson.com'
    const url = category
      ? `${base}/products/category/${category}?limit=${limit}&skip=${skip}`
      : `${base}/products?limit=${limit}&skip=${skip}`
    const res = await fetch(url)
    const data = await res.json()
    products.value = data.products
    loading.value = false
  }

  async function searchProducts(q: string) {
    loading.value = true
    const res = await fetch(`https://dummyjson.com/products/search?q=${q}`)
    const data = await res.json()
    products.value = data.products
    loading.value = false
  }

  return { products, loading, error, fetchProducts, searchProducts }
}