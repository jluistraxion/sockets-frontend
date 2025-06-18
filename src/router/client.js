import Error from '@/views/Error.vue'

const client = [
  {
    name: 'process',
    path: '/process',
    component: () => import('@/views/client/index.vue'),
    redirect: { name: 'healt' },
    children: [
      {
        name: 'healt',
        path: 'healt',
        component: () => import('@/views/client/Healt.vue')
      },
      {
        name: 'home',
        path: 'home/:id?',
        component: () => import('@/views/client/Home.vue')
      },
      {
        name: 'microblink',
        path: 'microblink/:id',
        component: () => import('@/components/blinkid/BlinkIdScanner.vue')
      },
      {
        name: 'blink-scanner',
        path: 'blink-scanner/:id',
        component: () => import('@/components/blinkid/BlinkSDKScanner.vue')
      },
      {
        name: 'incode-scanner',
        path: 'incode-scanner/:id',
        component: () => import('@/components/incode/IncodeScanner.vue')
      },
      {
        name: 'session-not-found',
        path: 'session-not-found',
        component: Error,
        props: () => ({ error: `Sesión no encontrada` })
      },
      {
        name: 'session-already-exists',
        path: 'session-already-exists',
        component: Error,
        props: () => ({
          error: `La sesión ya se encuentra en uso, cierre esta ventana para poder continuar.`
        })
      },
      {
        name: 'success',
        path: 'success',
        component: () => import('@/views/client/Success.vue')
      },
      {
        name: 'timeout',
        path: 'timeout',
        component: () => import('@/views/client/Timeout.vue')
      },
      {
        name: 'preview',
        path: 'preview/:id?',
        component: () => import('@/views/client/Preview.vue')
      },
      {
        name: 'combined',
        path: 'combined',
        component: () => import('@/views/client/CombinedScanner.vue')
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/client/Login.vue')
      }
    ]
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: Error,
    props: () => ({ error: `Error 404. Página no encontrada` })
  }
]

export default client
