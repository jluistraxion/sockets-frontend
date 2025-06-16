const admin = [
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/components/layout/AdminLayout.vue'),
    redirect: { name: 'admin.dashboard' },
    meta: { requiresAuth: true, title: 'Inicio' },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        meta: { title: 'Dashboard' },
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'admin.users',
        meta: { title: 'Usuarios' },
        component: () => import('@/views/admin/Users.vue')
      },
      {
        path: 'sessions',
        name: 'admin.sessions',
        meta: { title: 'Sesiones' },
        component: () => import('@/views/admin/sessions/Sessions.vue'),
        children: [
          {
            path: ':id',
            name: 'admin.session',
            meta: { title: 'Sesion' },
            component: () => import('@/views/admin/sessions/Session.vue')
          }
        ]
      },
      {
        path: 'settings',
        name: 'admin.settings',
        meta: { title: 'Configuraciones' },
        component: () => import('@/views/admin/Settings.vue')
      }
    ]
  }
]

export default admin
