const admin = [
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/components/layout/AdminLayout.vue'),
    redirect: { name: 'admin.dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'admin.users',
        component: () => import('@/views/admin/Users.vue')
      },
      {
        path: 'sessions',
        name: 'admin.sessions',
        component: () => import('@/views/admin/Sessions.vue')
      },
      {
        path: 'config',
        name: 'admin.config',
        component: () => import('@/views/admin/Config.vue')
      }
    ]
  }
]

export default admin
