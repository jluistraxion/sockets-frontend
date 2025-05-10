import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'qr',
    path: '/qr/:id',
    component: () => import('@/views/QR.vue')
  },
  {
    name: 'microblink',
    path: '/microblink',
    component: () => import('@/views/BlinkIdScanner.vue')
  },
  {
    name: 'incode-scanner',
    path: '/incode-scanner',
    component: () => import('@/views/IncodeScanner.vue')
  },
  {
    name: 'incode-document',
    path: '/incode-document',
    component: () => import('@/views/IncodeDocument.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
