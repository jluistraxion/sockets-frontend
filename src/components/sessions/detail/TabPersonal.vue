<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Información Personal</h3>
    <div class="grid grid-cols-3 gap-4">
      <InfoLabel
        label="Nombre:"
        :value="data?.nombreCompleto"
        :loading
      />
      <InfoLabel
        label="Fecha nacimiento:"
        :value="data?.fechaNacimiento"
        :loading
      />
      <InfoLabel
        label="Sexo:"
        :value="data?.sexo"
        :loading
      />
      <InfoLabel
        label="CURP:"
        :value="data?.curp"
        :loading
      />
      <InfoLabel
        label="Clave elector:"
        :value="data?.claveElector"
        :loading
      />
      <InfoLabel
        label="Año emisión:"
        :value="data?.annoEmision"
        :loading
      />
      <InfoLabel
        label="Número de emisión:"
        :value="data?.numeroEmision"
        :loading
      />
      <InfoLabel
        label="Año registro:"
        :value="data?.annoRegistro"
        :loading
      />
      <InfoLabel
        label="Fecha expiración:"
        :value="data?.fechaExpiracion"
        :loading
      />
      <InfoLabel
        label="Folio:"
        :value="data?.folio"
        :loading
      />
      <InfoLabel
        label="CIC:"
        :value="data?.cic"
        :loading
      />
    </div>
  </div>
</template>

<script setup>
import InfoLabel from '@/ui/content/InfoLabel.vue'
defineProps(['data', 'loading'])
</script>
