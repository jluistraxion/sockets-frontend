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
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
            :class="[
              true
                ? 'bg-[#17a54d] text-white hover:bg-[#278252]'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <i
              class="text-lg transition duration-75 bi bi-pie-chart-fill"
              :class="[
                true
                  ? 'text-white'
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
              ]"
            />
            <span class="ms-3">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path
                d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"
              />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <i
              class="bi bi-arrow-right-circle-fill text-lg shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
            <span class="flex-1 ms-3 whitespace-nowrap">Salir</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup></script>

<style lang="scss" scoped></style>
