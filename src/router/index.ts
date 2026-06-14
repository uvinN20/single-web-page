import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import DealsView from '../views/DealsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/categories', component: CategoriesView },
    { path: '/deals', component: DealsView },
    { path: '/product/:id', component: () => import('../views/ProductView.vue') }
  ]
  
})