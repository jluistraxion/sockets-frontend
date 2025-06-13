<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Dirección</h3>
    <div class="grid grid-cols-3 gap-4">
      <InfoLabel
        class="col-span-2"
        label="Dirección completa:"
        :value="data?.direccion"
        :loading
      />
      <InfoLabel
        label="Calle:"
        :value="data?.calle"
        :loading
      />
      <InfoLabel
        label="Código Postal:"
        :value="data?.codigoPostal"
        :loading
      />
      <InfoLabel
        label="Estado:"
        :value="data?.estado"
        :loading
      />
      <InfoLabel
        label="Localidad:"
        :value="data?.localidad"
        :loading
      />
      <InfoLabel
        label="Municipio:"
        :value="data?.municipio"
        :loading
      />
    </div>
  </div>
</template>

<script setup>
import InfoLabel from '@/ui/content/InfoLabel.vue'
defineProps(['data', 'loading'])
</script>
