<template>
  <Title>Detalle usuario</Title>
  <div>
    <fwb-tabs v-model="activeTab">
      <fwb-tab
        name="general"
        title="General"
      />
      <fwb-tab
        name="qr"
        title="QR"
      />
      <fwb-tab
        name="incode"
        title="Incode"
      />
      <fwb-tab
        name="second"
        title="Microblink"
      />
    </fwb-tabs>
    <div class="px-2 py-4">
      <UserSettings v-show="activeTab === 'general'" />
      <QRSettings
        v-show="activeTab === 'qr'"
        :settings="
          settings && Object.keys(settings).length > 0
            ? settings.find((e) => e.idparametro === 1).valores
            : {}
        "
      />
      <IncodeSettings
        v-show="activeTab === 'incode'"
        :settings="
          settings && Object.keys(settings).length > 0
            ? settings.find((e) => e.idparametro === 3).valores
            : {}
        "
      />
      <MicroblinkSettings
        v-show="activeTab === 'second'"
        :settings="
          settings && Object.keys(settings).length > 0
            ? settings.find((e) => e.idparametro === 4).valores
            : {}
        "
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FwbTab, FwbTabs } from 'flowbite-vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Title from '@/ui/content/Title.vue'
import QRSettings from '@/components/settings/QRSettings.vue'
import IncodeSettings from '@/components/settings/IncodeSettings.vue'
import MicroblinkSettings from '@/components/settings/MicroblinkSettings.vue'
import UserSettings from '@/components/settings/UserSettings.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const activeTab = ref('general')

const { data: settings } = useQuery({
  queryKey: ['user-settings', route.params.id],
  queryFn: () => api.post(`${API_URL}/getconfiguraciones`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id)
})
</script>
