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
    component: () => import('@/components/blinkid/BlinkIdScanner.vue')
  },
  {
    name: 'blink-scanner',
    path: '/blink-scanner/:id',
    component: () => import('@/components/blinkid/BlinkSDKScanner.vue')
  },
  {
    name: 'incode-scanner',
    path: '/incode-scanner/:id',
    component: () => import('@/components/incode/IncodeScanner.vue')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: Error,
    props: () => ({ error: `Error 404. Página no encontrada` })
  },
  {
    name: 'session-not-found',
    path: '/session-not-found',
    component: Error,
    props: () => ({ error: `Sesión no encontrada` })
  },
  {
    name: 'session-already-exists',
    path: '/session-already-exists',
    component: Error,
    props: () => ({
      error: `La sesión ya se encuentra en uso, cierre esta ventana para poder continuar.`
    })
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
  },
  {
    name: 'preview',
    path: '/preview/:id?',
    component: () => import('@/views/Preview.vue')
  },
  {
    name: 'combined',
    path: '/combined',
    component: () => import('@/components/demo/CombinedScanner.vue')
  },
  {
    name: 'client-ws',
    path: '/client-ws/:id',
    component: () => import('@/components/demo/ClientWS.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
