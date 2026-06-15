import { defineStore } from 'pinia'
import type { AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: null as AuthResponse | null,
    // Read token from localStorage on startup — persists across page refreshes
    token: localStorage.getItem('lb_token') as string | null,
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token, // true if token exists
    displayName: (state): string =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },

  actions: {
    // Calls DummyJSON's real login endpoint and gets a JWT back
    async login(username: string, password: string): Promise<void> {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message ?? 'Login failed')
      }

      const data: AuthResponse = await res.json()
      this.token = data.token  // Save in memory
      this.user = data
      localStorage.setItem('lb_token', data.token) // Also save to disk
    },

    logout(): void {
      this.token = null
      this.user = null
      localStorage.removeItem('lb_token') // Clear from disk too
    },
  },
})

// Demo credentials for testing:
// Username: emilys   Password: emilyspass