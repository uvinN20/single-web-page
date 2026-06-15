import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Eager: loads immediately on app start

const routes: RouteRecordRaw[] = [
  {
    path: '/',             // URL: http://localhost:5173/
    name: 'home',
    component: HomeView,   // Loads immediately (most users land here first)
  },
  {
    path: '/categories',   // URL: /categories
    name: 'categories',
    // Lazy loaded — only downloads when user clicks "Categories"
    component: () => import('../views/CategoriesView.vue'),
  },
  {
    path: '/deals',
    name: 'deals',
    component: () => import('../views/DealsView.vue'),
  },
  {
    path: '/product/:id',  // Dynamic segment — :id can be 1, 42, 100, etc.
    name: 'product',
    component: () => import('../views/ProductView.vue'),
    props: true,           // Passes :id as a prop to the component
  },
  {
    path: '/:pathMatch(.*)*',  // Catch all unknown URLs
    redirect: '/',              // Send them back to Home
  },
]

const router = createRouter({
  history: createWebHistory(),  // Clean URLs without # symbol
  routes,
  // After navigation, scroll to top (or restore previous scroll position)
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

export default router