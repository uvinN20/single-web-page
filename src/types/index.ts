// Product — matches the DummyJSON /products/:id response exactly
export interface Product {
  id: number               // Unique ID e.g. 1
  title: string            // "iPhone 15 Pro"
  description: string      // Long text description
  price: number            // 999.99
  discountPercentage: number // 12.5 (percent off)
  rating: number           // 4.7 (out of 5)
  stock: number            // How many are available
  brand?: string           // Optional — some products have no brand
  category: string         // "smartphones"
  thumbnail: string        // URL to main image
  images: string[]         // Array of image URLs for the gallery
  tags?: string[]          // Optional keywords
  availabilityStatus?: string
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
}

// The wrapper around a list of products from the API
export interface ProductsResponse {
  products: Product[]
  total: number  // Total products in database (used for pagination)
  skip: number   // How many we skipped
  limit: number  // How many we requested
}

// One item inside the shopping cart
export interface CartItem {
  product: Product   // The full product object
  quantity: number   // How many the user wants
}

// The response from POST /auth/login
export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string         // User avatar URL
  token: string         // JWT — we store this in localStorage
  refreshToken: string
}

// One item from GET /products/categories
export interface Category {
  slug: string   // e.g. "smartphones" — used in the API URL
  name: string   // e.g. "Smartphones" — shown in the UI
  url: string    // Full URL to the category endpoint
}