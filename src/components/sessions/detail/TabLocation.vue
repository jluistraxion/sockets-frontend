<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Ubicación</h3>
    <div class="grid grid-cols-3 gap-4">
      <InfoLabel
        label="IP:"
        :value="data?.direccionIP"
        :loading
      />
      <InfoLabel
        label="País:"
        :value="data?.paisIP"
        :loading
      />
      <InfoLabel
        label="Ciudad:"
        :value="data?.ciudadIP"
        :loading
      />
      <InfoLabel
        label="Región:"
        :value="data?.regionIP"
        :loading
      />
      <InfoLabel
        label="Latitud:"
        :value="data?.latitudIP"
        :loading
      />
      <InfoLabel
        label="Longitud:"
        :value="data?.longitudIP"
        :loading
      />
    </div>
  </div>
</template>

<script setup>
import InfoLabel from '@/ui/content/InfoLabel.vue'
defineProps(['data', 'loading'])
</script>
