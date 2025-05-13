import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/:id?',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'demo',
    path: '/demo',
    component: () => import('@/views/Demo.vue')
  },
  {
    name: 'qr',
    path: '/qr/:id',
    component: () => import('@/views/QR.vue')
  },
  {
    name: 'microblink',
    path: '/microblink',
    component: () => import('@/components/blinkid//BlinkIdScanner.vue')
  },
  {
    name: 'incode-scanner',
    path: '/incode-scanner',
    component: () => import('@/components/incode/IncodeScanner.vue')
  },
  {
    name: 'incode-document',
    path: '/incode-document',
    component: () => import('@/components/incode/IncodeDocument.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
