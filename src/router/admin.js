const admin = [
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/components/layout/AdminLayout.vue'),
    redirect: { name: 'dashboard' },
    meta: { requiresAuth: true, title: 'Inicio' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard' },
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta: { title: 'Usuarios' },
        redirect: { name: 'users.index' },
        children: [
          {
            path: '',
            name: 'users.index',
            component: () => import('@/views/admin/users/index.vue')
          },
          {
            path: ':id',
            name: 'user',
            meta: { title: 'Usuario' },
            component: () => import('@/views/admin/users/User.vue')
          }
        ]
      },
      {
        path: 'sessions',
        name: 'sessions',
        meta: { title: 'Sesiones' },
        redirect: { name: 'sessions.index' },
        children: [
          {
            path: '',
            name: 'sessions.index',
            component: () => import('@/views/admin/sessions/index.vue')
          },
          {
            path: ':id',
            name: 'session',
            meta: { title: 'Sesion' },
            component: () => import('@/views/admin/sessions/Session.vue')
          }
        ]
      }
    ]
  }
]

export default admin
