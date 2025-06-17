<template>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      />
    </svg>
  </button>
  <Sidebar :options />
  <div class="min-h-screen px-4 py-3 sm:ml-64 bg-slate-100">
    <div class="flex flex-col gap-4 border border-slate-50 rounded-lg p-4 bg-white">
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
  { name: 'Usuarios', to: 'users', icon: 'bi bi-people-fill' },
  { name: 'Configuraciones', to: 'settings', icon: 'bi bi-gear-fill' }
]
</script>
