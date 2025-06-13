<template>
  <Card class="p-5 !min-w-full">
    <div class="md:flex gap-4">
      <fwb-list-group>
        <fwb-list-group-item
          hover
          @click="activeTab = 'personal'"
        >
          <i class="bi bi-person-circle me-1" /> Personal
        </fwb-list-group-item>
        <fwb-list-group-item
          hover
          @click="activeTab = 'address'"
        >
          <i class="bi bi-house-door me-1" /> Dirección
        </fwb-list-group-item>
        <fwb-list-group-item
          hover
          @click="activeTab = 'location'"
        >
          <i class="bi bi-geo-alt me-1" /> Ubicación
        </fwb-list-group-item>
        <fwb-list-group-item
          hover
          @click="activeTab = 'images'"
        >
          <i class="bi bi-person-vcard me-1" /> Imagenes
        </fwb-list-group-item>
      </fwb-list-group>
      <div
        class="p-6 py-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
      >
        <div v-show="activeTab === 'personal'">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Información Personal</h3>
          <div class="grid grid-cols-3 gap-4">
            <InfoLabel
              label="Nombre:"
              :value="data?.data.nombreCompleto"
              :loading="isFetching"
            />
            <InfoLabel
              label="Fecha nacimiento:"
              :value="data?.data.fechaNacimiento"
              :loading="isFetching"
            />
            <InfoLabel
              label="Sexo:"
              :value="data?.data.sexo"
              :loading="isFetching"
            />
            <InfoLabel
              label="CURP:"
              :value="data?.data.curp"
              :loading="isFetching"
            />
            <InfoLabel
              label="Clave elector:"
              :value="data?.data.claveElector"
              :loading="isFetching"
            />
          </div>
        </div>
        <div v-show="activeTab === 'address'">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Dirección</h3>
          <div class="grid grid-cols-3 gap-4">
            <InfoLabel
              class="col-span-3"
              label="Dirección completa:"
              :value="data?.data.direccion"
              :loading="isFetching"
            />
          </div>
        </div>
        <div v-show="activeTab === 'location'">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Ubicación</h3>
          <div class="grid grid-cols-3 gap-4">
            <InfoLabel
              label="IP:"
              :value="data?.data.direccionIP"
              :loading="isFetching"
            />
            <InfoLabel
              label="País:"
              :value="data?.data.paisIP"
              :loading="isFetching"
            />
            <InfoLabel
              label="Ciudad:"
              :value="data?.data.ciudadIP"
              :loading="isFetching"
            />
            <InfoLabel
              label="Región:"
              :value="data?.data.regionIP"
              :loading="isFetching"
            />
            <InfoLabel
              label="Latitud:"
              :value="data?.data.latitudIP"
              :loading="isFetching"
            />
            <InfoLabel
              label="Longitud:"
              :value="data?.data.longitudIP"
              :loading="isFetching"
            />
          </div>
        </div>
        <div v-show="activeTab === 'images'">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Imagenes</h3>
          <div class="flex flex-row gap-6 items-top">
            <fwb-img
              v-show="data?.data.imagenFrontal"
              class="rounded-xl"
              alt="flowbite-vue"
              size="w-64"
              :src="`data:image/jpeg;base64,${data?.data.imagenFrontal}`"
            />
            <fwb-img
              v-show="data?.data.imagenReverso"
              class="rounded-xl"
              alt="flowbite-vue"
              size="w-64"
              :src="`data:image/jpeg;base64,${data?.data.imagenReverso}`"
            />
            <div>
              <fwb-img
                v-show="data?.data.imagenFoto"
                class="rounded-xl"
                alt="flowbite-vue"
                size="w-24 h-24"
                :src="`data:image/jpeg;base64,${data?.data.imagenFoto}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import api from '@/api/api'
import InfoLabel from '@/ui/content/InfoLabel.vue'
import Card from '@/ui/cards/Card.vue'

import { FwbImg, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()

const activeTab = ref('personal')

const { data, isFetching } = useQuery({
  queryKey: ['operacion', route.params.id],
  queryFn: () => api.post(`${API_URL}/getdata`, { idoperacion: route.params.id })
  // select: (data) => data?.Items,
})
</script>
