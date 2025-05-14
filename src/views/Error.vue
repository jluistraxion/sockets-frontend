<template>
  <div class="h-screen w-screen flex items-center justify-center bg-slate-50 overflow-hidden">
    <div class="flex flex-col items-center justify-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="90"
        class="bi bi-emoji-frown fill-red-600"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path
          d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"
        />
      </svg>
      <div class="text-3xl text-red-600 font-bold">¡Oops!</div>
      <div class="text-center">{{ error }}</div>
      <div class="text-sm text-gray-600 text-center px-4 md:px-2">
        Si no conoces el error, por favor contacta con el administrador de la aplicación para mayor
        información.
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['error'])
</script>
