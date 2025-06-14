<template>
  <div class="flex flex-col gap-6 border border-slate-50 rounded-lg p-4 bg-white">
    <Title>Configuraciones</Title>
    <fwb-tabs
      v-model="activeTab"
      class="px-2"
    >
      <fwb-tab
        name="general"
        title="General"
      >
        <GeneralSettings />
      </fwb-tab>
      <fwb-tab
        name="incode"
        title="Incode"
      >
        Incode
      </fwb-tab>
      <fwb-tab
        name="second"
        title="Microblink"
      >
        Microblink
      </fwb-tab>
      <fwb-tab
        name="fourth"
        title="Fourth"
      >
        4 Lorem ipsum dolor...
      </fwb-tab>
    </fwb-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FwbTab, FwbTabs } from 'flowbite-vue'
import Title from '@/ui/content/Title.vue'
import GeneralSettings from '@/components/settings/GeneralSettings.vue'

const activeTab = ref('general')
</script>
