<template>
  <Title>Detalle usuario</Title>
  <div>
    <fwb-tabs
      v-model="activeTab"
      class="px-2 py-4"
    >
      <fwb-tab
        name="user"
        title="Usuario"
      >
        <UserSettings />
      </fwb-tab>
      <fwb-tab
        name="qr"
        title="QR"
      >
        <QRSettings />
      </fwb-tab>
      <fwb-tab
        name="urls"
        title="URLs"
      >
        <UrlsSettings />
      </fwb-tab>
      <fwb-tab
        name="incode"
        title="Incode"
      >
        <IncodeSettings />
      </fwb-tab>
      <fwb-tab
        name="second"
        title="Microblink"
      >
        <MicroblinkSettings />
      </fwb-tab>
    </fwb-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FwbTab, FwbTabs } from 'flowbite-vue'
import Title from '@/ui/content/Title.vue'
import QRSettings from '@/components/settings/QRSettings.vue'
import IncodeSettings from '@/components/settings/IncodeSettings.vue'
import MicroblinkSettings from '@/components/settings/MicroblinkSettings.vue'
import UserSettings from '@/components/settings/UserSettings.vue'
import UrlsSettings from '@/components/settings/UrlsSettings.vue'

const activeTab = ref('user')
</script>
