<template>
  <button
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    @click="toggleSidebar"
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
  <div
    v-if="isMobile && isSidebarOpen"
    class="fixed inset-0 z-30 bg-slate-200/50 bg-opacity-50 sm:hidden"
    @click="closeSidebar"
  />
  <aside
    ref="sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform"
    :class="{
      '-translate-x-full': isMobile && !isSidebarOpen,
      'translate-x-0': !isMobile || isSidebarOpen,
      'shadow-xl': isMobile && isSidebarOpen
    }"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <a
        href="https://flowbite.com/"
        class="flex items-center ps-2.5 mb-8"
      >
        <img
          src="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
          class="h-5 me-3 sm:h-5"
          alt="Flowbite Logo"
        />
      </a>
      <ul class="space-y-2 font-medium">
        <li
          v-for="option in options"
          :key="option.name"
        >
          <router-link
            :to="{ name: option.to }"
            v-slot="{ isActive, navigate }"
          >
            <a
              @click="navigate"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
              :class="[
                isActive ? 'bg-[#17a54d] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              <i
                class="text-lg transition duration-75"
                :class="[
                  option.icon,
                  isActive
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                ]"
              />
              <span class="ms-3"> {{ option.name }} </span>
            </a>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'login' }">
            <a
              @click="logout"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
            >
              <i class="bi bi-box-arrow-in-left text-lg transition duration-75" />
              <span class="ms-3">Cerrar sesión</span>
            </a>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useBreakpoints, onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/composables/useAuthStore'
import { useRoute } from 'vue-router'

defineProps(['options'])

const { logout } = useAuthStore()
const route = useRoute()

const isSidebarOpen = ref(true)
const sidebar = ref(null)

const breakpoints = useBreakpoints({ mobile: 640 })
const isMobile = breakpoints.smaller('mobile')

onClickOutside(sidebar, () => {
  if (isMobile.value && isSidebarOpen.value) {
    closeSidebar()
  }
})

const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value)

const closeSidebar = () => (isSidebarOpen.value = false)

watch(
  () => [route.path],
  ([newRoute]) => {
    if (isMobile.value) closeSidebar()
  },
  { immediate: true }
)
</script>
