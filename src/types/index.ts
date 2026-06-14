export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
}

export interface User {
  username: string
  password: string
}