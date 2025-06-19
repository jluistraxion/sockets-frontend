<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Imagenes</h3>
    <div class="flex flex-row gap-6 items-top">
      <fwb-img
        v-if="data?.imagenFrontal"
        class="rounded-xl"
        alt="flowbite-vue"
        size="w-64"
        :src="`data:image/jpeg;base64,${data?.imagenFrontal}`"
      />
      <fwb-img
        v-if="data?.imagenReverso"
        class="rounded-xl"
        alt="flowbite-vue"
        size="w-64"
        :src="`data:image/jpeg;base64,${data?.imagenReverso}`"
      />
      <div>
        <fwb-img
          v-if="data?.imagenFoto"
          class="rounded-xl"
          alt="flowbite-vue"
          size="w-24 h-24"
          :src="`data:image/jpeg;base64,${data?.imagenFoto}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbImg } from 'flowbite-vue'
defineProps(['data', 'loading'])
</script>
