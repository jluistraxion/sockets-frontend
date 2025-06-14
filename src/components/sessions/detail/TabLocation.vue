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
        label="Ciudad IP:"
        :value="data?.gpsData?.ciudadIP"
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
        label="IP:"
        :value="data?.gpsData?.direccionIP"
        :loading
      />
      <InfoLabel
        label="Distancia Geolocalización ID:"
        :value="data?.gpsData?.distanciaGeolocalizacionID"
        :loading
      />
      <InfoLabel
        label="Distancia Geolocalización IP:"
        :value="data?.gpsData?.distanciaGeolocalizacionIP"
        :loading
      />
      <InfoLabel
        label="Identificador Hash:"
        :value="data?.gpsData?.identificadorHash"
        :loading
      />
      <InfoLabel
        label="Latitud:"
        :value="data?.gpsData?.latitud"
        :loading
      />
      <InfoLabel
        label="Latitud IP:"
        :value="data?.gpsData?.latitudIP"
        :loading
      />
      <InfoLabel
        label="Localidad:"
        :value="data?.gpsData?.localidad"
        :loading
      />
      <InfoLabel
        label="Longitud:"
        :value="data?.gpsData?.longitud"
        :loading
      />
      <InfoLabel
        label="Longitud IP:"
        :value="data?.gpsData?.longitudIP"
        :loading
      />
      <InfoLabel
        label="Modelo Dispositivo:"
        :value="data?.gpsData?.modeloDispositivo"
        :loading
      />
      <InfoLabel
        label="Navegador:"
        :value="data?.gpsData?.navegador"
        :loading
      />
      <InfoLabel
        label="Navegador Desconocido:"
        :value="data?.gpsData?.navegadorDesconocido"
        :loading
      />
      <InfoLabel
        label="Nombre País:"
        :value="data?.gpsData?.nombrePais"
        :loading
      />
      <InfoLabel
        label="País IP:"
        :value="data?.gpsData?.paisIP"
        :loading
      />
      <InfoLabel
        label="Región IP:"
        :value="data?.gpsData?.regionIP"
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
      <InfoLabel
        label="Tipo Dispositivo:"
        :value="data?.gpsData?.tipoDispositivo"
        :loading
      />
      <InfoLabel
        label="Ubicación:"
        :value="data?.gpsData?.ubicacion"
        :loading
      />
      <InfoLabel
        label="Versión OS:"
        :value="data?.gpsData?.versionOS"
        :loading
      />
      <InfoLabel
        label="Versión SDK:"
        :value="data?.gpsData?.versionSDK"
        :loading
      />
    </div>
  </div>
</template>

<script setup>
import InfoLabel from '@/ui/content/InfoLabel.vue'
defineProps(['data', 'loading'])
</script>
