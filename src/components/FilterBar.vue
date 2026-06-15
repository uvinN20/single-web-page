<template>
  <div class="relative">
    <!-- Fade-out shadow on right edge to hint at scrollability -->
    <div class="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

    <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">

      <!-- "All Collections" is always first -->
      <button @click="select(null)"
        :class="['shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
          selected === null ? 'bg-[#1B2A6B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        All Collections
      </button>

      <!-- Skeleton pills shown while loading -->
      <template v-if="loading">
        <div v-for="n in 6" :key="n" class="shrink-0 h-8 w-28 rounded-full bg-gray-100 animate-pulse" />
      </template>

      <!-- Real category pills -->
      <button v-for="cat in categories" :key="cat.slug" @click="select(cat.slug)"
        :class="['shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap capitalize',
          selected === cat.slug ? 'bg-[#1B2A6B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Category } from '../types'

// Emits a slug string (or null for "All") to the parent view
const emit = defineEmits<{ select: [slug: string | null] }>()

const categories = ref<Category[]>([])
const loading = ref(true)
const selected = ref<string | null>(null)

async function fetchCategories() {
  loading.value = true
  const res = await fetch('https://dummyjson.com/products/categories')
  const data: Category[] = await res.json()
  categories.value = data.slice(0, 8) // Show top 8 to fit the pill row
  loading.value = false
}

function select(slug: string | null) {
  selected.value = slug
  emit('select', slug) // Tell the parent which category was picked
}

// Fetch categories when this component first appears on screen
onMounted(fetchCategories)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>