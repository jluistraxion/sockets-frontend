const demoRoutes = [
  {
    name: 'demo',
    path: '/demo',
    redirect: { name: 'demo.index' },
    children: [
      {
        path: '',
        name: 'demo.index',
        component: () => import('@/views/Demo.vue')
      },
      {
        path: 'incode',
        name: 'demo.incode',
        component: () => import('@/components/demo/IncodeScanner.vue')
      },
      {
        path: 'microblink',
        name: 'demo.microblink',
        component: () => import('@/components/demo/MicroblinkScanner.vue')
      }
    ]
  }
]

export default demoRoutes
