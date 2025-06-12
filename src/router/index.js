import { createWebHistory, createRouter } from 'vue-router'
import publicRoutes from './publicRoutes'
import admin from './admin'

const routes = [...publicRoutes, ...admin]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
