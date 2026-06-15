import { ref } from 'vue'
import type { Product, ProductsResponse } from '../types'

export function useProducts() {
  // Reactive state — Vue re-renders whenever these change
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  // Fetch a page of products, optionally filtered by category
  async function fetchProducts(limit = 12, skip = 0, category?: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const BASE = 'https://dummyjson.com'
      // Different endpoint for category vs all products
      const url = category
        ? `${BASE}/products/category/${category}?limit=${limit}&skip=${skip}`
        : `${BASE}/products?limit=${limit}&skip=${skip}`

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: ProductsResponse = await res.json()
      products.value = data.products
      total.value = data.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch'
    } finally {
      loading.value = false // Always runs, even if fetch failed
    }
  }

  // Search products by keyword
  async function searchProducts(q: string): Promise<void> {
    if (!q.trim()) return
    loading.value = true
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=50`
      )
      const data: ProductsResponse = await res.json()
      products.value = data.products
      total.value = data.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Search failed'
    } finally {
      loading.value = false
    }
  }

  // Fetch a single product by ID (used in ProductView)
  async function fetchProduct(id: number): Promise<Product | null> {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json() as Product
    } catch {
      return null
    }
  }

  // Return everything the component might need
  return { products, loading, error, total, fetchProducts, searchProducts, fetchProduct }
}