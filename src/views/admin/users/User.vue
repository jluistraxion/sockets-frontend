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
        :settings="qrSettings"
      />
      <IncodeSettings
        v-show="activeTab === 'incode'"
        :settings="incodeSettings"
      />
      <MicroblinkSettings
        v-show="activeTab === 'second'"
        :settings="microblinkSettings"
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

const qrSettings = computed(() => getSettings(1))
const incodeSettings = computed(() => getSettings(3))
const microblinkSettings = computed(() => getSettings(4))

const getSettings = (idparametro) => {
  if (!settings.value) return
  if (Object.keys(settings.value).length === 0) return
  return settings.value.find((element) => element.idparametro === idparametro).valores
}

const getSettings2 = (idparametro) => {
  const val = settings.value?.find((el) => el.idparametro === idparametro)
  return val?.valores
}
</script>
