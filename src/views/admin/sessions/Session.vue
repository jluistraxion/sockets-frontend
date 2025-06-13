<template>
  <div>
    <fwb-accordion flushed>
      <fwb-accordion-panel>
        <fwb-accordion-header>Información Personal</fwb-accordion-header>
        <fwb-accordion-content>
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <InfoLabel
                label="Nombre:"
                :value="data?.data.nombreCompleto"
              />
              <InfoLabel
                label="Fecha nacimiento:"
                :value="data?.data.fechaNacimiento"
              />
              <InfoLabel
                label="CURP:"
                :value="data?.data.curp"
              />
              <InfoLabel
                label="Folio:"
                :value="data?.data.folio"
              />
            </div>
            <InfoLabel
              label="Dirección:"
              :value="data?.data.direccion"
            />
          </div>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import api from '@/api/api'
import InfoLabel from '@/ui/content/InfoLabel.vue'

import {
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel
} from 'flowbite-vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()

const { data, isFetching } = useQuery({
  queryKey: ['operacion', route.params.id],
  queryFn: () => api.post(`${API_URL}/getdata`, { idoperacion: route.params.id })
  // select: (data) => data?.Items,
})
</script>
