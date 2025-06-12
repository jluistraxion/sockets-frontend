<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
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
      </ul>
    </div>
  </aside>
</template>

<script setup>
defineProps(['options'])
</script>
