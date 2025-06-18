import { createWebHistory, createRouter } from 'vue-router'
// import { useAuthStore } from '@/composables/useAuthStore'
import client from './client'
import admin from './admin'

const routes = [...client, ...admin]

// const { isAuthenticated } = useAuthStore()

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // const auth = useAuthStore()
  const isAuthenticated = localStorage.getItem('auth') === 'true'

  // if (to.meta.requiresAuth && !auth.isAuthenticated) {
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }
  next()
})

export default router
