import { defineStore } from 'pinia'
import type { AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthResponse | null,
    token: localStorage.getItem('token') ?? null,
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
  },
  actions: {
    async login(username: string, password: string) {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 })
      })
      const data: AuthResponse = await res.json()
      this.token = data.token
      this.user = data
      localStorage.setItem('token', data.token)
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})