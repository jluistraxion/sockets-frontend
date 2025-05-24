import { createWebHistory, createRouter } from 'vue-router'
import Error from '@/views/Error.vue'

const routes = [
  {
    name: 'healt',
    path: '/healt',
    component: () => import('@/views/Healt.vue')
  },
  {
    name: 'home',
    path: '/home/:id?',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'demo',
    path: '/demo',
    component: () => import('@/views/Demo.vue')
  },
  {
    name: 'example-incode',
    path: '/example-incode',
    component: () => import('@/components/demo/IncodeScanner.vue')
  },
  {
    name: 'demo-incode',
    path: '/example-microblink',
    component: () => import('@/components/demo/MicroblinkScanner.vue')
  },
  {
    name: 'qr',
    path: '/qr/:id',
    component: () => import('@/views/QR.vue')
  },
  {
    name: 'microblink',
    path: '/microblink/:id',
    component: () => import('@/components/blinkid//BlinkIdScanner.vue')
  },
  {
    name: 'incode-scanner',
    path: '/incode-scanner/:id',
    component: () => import('@/components/incode/IncodeScanner.vue')
  },
  {
    name: 'incode-document',
    path: '/incode-document/:id',
    component: () => import('@/components/incode/IncodeDocument.vue')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: Error,
    props: () => ({ error: `Error 404. Página no encontrada` })
  },
  {
    name: 'success',
    path: '/success',
    component: () => import('@/views/Success.vue')
  },
  {
    name: 'timeout',
    path: '/timeout',
    component: () => import('@/views/Timeout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
