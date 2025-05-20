<template>
  <div class="h-screen w-screen flex items-center justify-center bg-slate-50 overflow-hidden">
    <div class="flex flex-col items-center justify-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="90"
        fill="currentColor"
        class="bi bi-check-circle fill-green-600"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path
          d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
        />
      </svg>
      <div class="text-center">{{ message }}</div>
      <div class="text-3xl text-green-600 font-bold text-center">
        ¡Operación completada con éxito!
      </div>
      <div class="text-sm text-gray-600 text-center px-4 md:px-2">
        Puedes cerrar esta ventana o volver a la página principal para continuar.
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['message'])
</script>
