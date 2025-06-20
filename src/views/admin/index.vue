<template>
  <Sidebar :options />
  <div class="min-h-screen px-4 py-3 sm:ml-64 bg-slate-100 dark:bg-gray-800">
    <div
      class="flex flex-col gap-4 border border-slate-50 rounded-lg p-4 bg-white dark:bg-gray-800"
    >
      <Breadcrumb />
      <RouterView :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import Breadcrumb from '@/ui/breadcrumbs/Breadcrumb.vue'

const options = [
  { name: 'Dashboard', to: 'dashboard', icon: 'bi bi-pie-chart-fill' },
  { name: 'Sesiones', to: 'sessions', icon: 'bi bi-card-list' },
  { name: 'Usuarios', to: 'users', icon: 'bi bi-people-fill' }
]
</script>
