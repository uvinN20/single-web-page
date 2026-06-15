<template>
  <header class="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

      <!-- Logo -->
      <RouterLink to="/" class="text-[#1B2A6B] font-semibold text-base tracking-tight shrink-0">
        Lavendra Boutique
      </RouterLink>

      <!-- Desktop nav links (hidden on mobile) -->
      <div class="hidden md:flex items-center gap-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-gray-600 hover:text-[#1B2A6B] transition-colors"
          active-class="text-[#1B2A6B] font-medium border-b-2 border-[#1B2A6B] pb-0.5"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- Right icons -->
      <div class="flex items-center gap-3">
        <button @click="emit('open-search')" class="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <!-- Cart button with live badge -->
        <button @click="emit('open-cart')" class="relative p-2 rounded-full hover:bg-gray-100" aria-label="Cart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <!-- Badge: only shows if cart has items -->
          <span v-if="cartCount > 0"
            class="absolute -top-0.5 -right-0.5 bg-[#1B2A6B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {{ cartCount > 9 ? '9+' : cartCount }}
          </span>
        </button>

        <!-- User: if logged in, clicking logs out. Otherwise opens AuthModal -->
        <button @click="handleUserClick" class="p-2 rounded-full hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <!-- Hamburger: only visible on mobile -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-2 rounded-full hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile dropdown menu -->
    <div v-if="mobileOpen" class="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
      <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to"
        class="text-sm text-gray-700 py-1" @click="mobileOpen = false">
        {{ link.label }}
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

// Declare events this component can emit to its parent
const emit = defineEmits<{
  'open-cart': []
  'open-auth': []
  'open-search': []
}>()

const cartStore = useCartStore()
const authStore = useAuthStore()
const mobileOpen = ref(false)

// computed() = auto-updates when cartStore.totalItems changes
const cartCount = computed(() => cartStore.totalItems)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/deals', label: 'Deals' },
]

function handleUserClick() {
  if (isLoggedIn.value) {
    authStore.logout()  // Already logged in → log out
  } else {
    emit('open-auth')   // Not logged in → open modal
  }
}
</script>