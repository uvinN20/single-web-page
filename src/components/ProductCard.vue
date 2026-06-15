<template>
  <div
    class="group relative bg-white rounded-2xl overflow-hidden border border-gray-100
           hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
    @click="emit('click', product)"
  >
    <!-- Wishlist heart button (top-right) -->
    <button @click.stop="toggleWishlist"
      class="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm
             flex items-center justify-center shadow-sm hover:bg-white transition-colors">
      <svg class="w-4 h-4"
        :class="wished ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-400'"
        stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>

    <!-- Discount badge (top-left): only shows if discount >= 10% -->
    <div v-if="product.discountPercentage >= 10"
      class="absolute top-3 left-3 z-10 bg-[#1B2A6B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
      SAVE {{ Math.round(product.discountPercentage) }}%
    </div>

    <!-- Image — group-hover:scale-105 zooms on hover -->
    <div class="bg-gray-50 aspect-square overflow-hidden">
      <img :src="product.thumbnail" :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"/>
    </div>

    <!-- Card body -->
    <div class="p-3 flex flex-col gap-1.5 flex-1">

      <!-- Star rating -->
      <div class="flex items-center gap-1">
        <svg v-for="i in 5" :key="i" class="w-3 h-3"
          :class="i <= Math.round(product.rating) ? 'fill-amber-400 stroke-amber-400' : 'fill-gray-200 stroke-gray-200'"
          viewBox="0 0 24 24" stroke-width="1">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
        <span class="text-[11px] text-gray-400">{{ product.rating.toFixed(1) }}</span>
      </div>

      <!-- Title and brand -->
      <h3 class="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2">{{ product.title }}</h3>
      <p class="text-[11px] text-gray-400 truncate">{{ product.brand ?? product.category }}</p>

      <!-- Price row -->
      <div class="flex items-center justify-between mt-auto pt-1">
        <div>
          <span class="text-sm font-bold">${{ discountedPrice }}</span>
          <span v-if="product.discountPercentage >= 5" class="text-[11px] text-gray-400 line-through ml-1">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>
        <!-- Add to cart — .stop prevents opening modal -->
        <button @click.stop="addToCart"
          class="w-7 h-7 rounded-lg bg-[#1B2A6B] text-white flex items-center justify-center hover:bg-[#2D3FBF]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../types'
import { useCartStore } from '../stores/cart'

// Props flowing IN from parent
const props = defineProps<{ product: Product }>()
// Events flowing OUT to parent
const emit = defineEmits<{ click: [product: Product] }>()

const cartStore = useCartStore()
const wished = ref(false)

// Computed: recalculates whenever props.product changes
const discountedPrice = computed(() => {
  const final = props.product.price * (1 - props.product.discountPercentage / 100)
  return final.toFixed(2)
})

function toggleWishlist() { wished.value = !wished.value }
function addToCart() { cartStore.addItem(props.product) }
</script>