<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Ubicación</h3>
    <div class="grid grid-cols-3 gap-4">
      <InfoLabel
        label="Área Administrativa"
        :value="data?.gpsData?.areaAdministrativa"
        :loading
      />
      <InfoLabel
        label="Calle:"
        :value="data?.gpsData?.calle"
        :loading
      />
      <InfoLabel
        label="Código País:"
        :value="data?.gpsData?.codigoPais"
        :loading
      />
      <InfoLabel
        label="Código Postal:"
        :value="data?.gpsData?.codigoPostal"
        :loading
      />
      <InfoLabel
        label="Distancia Geolocalización ID:"
        :value="data?.gpsData?.distanciaGeolocalizacionID"
        :loading
      />
      <InfoLabel
        label="Latitud:"
        :value="data?.gpsData?.latitud"
        :loading
      />
      <InfoLabel
        label="Longitud:"
        :value="data?.gpsData?.longitud"
        :loading
      />
      <InfoLabel
        label="Localidad:"
        :value="data?.gpsData?.localidad"
        :loading
      />
      <InfoLabel
        label="Nombre País:"
        :value="data?.gpsData?.nombrePais"
        :loading
      />
      <InfoLabel
        label="Sub área Administrativa:"
        :value="data?.gpsData?.subAreaAdministrativa"
        :loading
      />
      <InfoLabel
        label="Sub Localidad:"
        :value="data?.gpsData?.subLocalidad"
        :loading
      />
      <InfoLabel
        label="Sub Número Calle:"
        :value="data?.gpsData?.subNumeroCalle"
        :loading
      />
      <div class="col-span-3">
        <InfoLabel
          label="Ubicación:"
          :value="data?.gpsData?.ubicacion"
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
