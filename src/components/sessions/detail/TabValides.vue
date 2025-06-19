<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Validaciones</h3>
    <div class="grid grid-cols-3 gap-4">
      <InfoLabel
        class="col-span-3"
        label="Mensaje:"
        :value="data?.reasonMsg"
        :loading
      />
      <div class="grid grid-cols-2 gap-4">
        <InfoLabel
          label="Status:"
          :value="data?.status"
          :loading
        />
        <InfoLabel
          label="Valor:"
          :value="data?.value"
          :loading
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import InfoLabel from '@/ui/content/InfoLabel.vue'
defineProps(['data', 'loading'])
</script>
