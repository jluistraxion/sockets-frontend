<template>
  <fwb-list-group>
    <fwb-list-group-item
      v-for="item in items"
      :key="item.name"
      :class="[
        activeTab === item.name
          ? 'bg-green-600 text-white hover:bg-green-600 hover:text-white'
          : 'hover:text-green-600'
      ]"
      hover
      @click="activeTab = item.name"
    >
      <i :class="`${item.icon} me-1`" /> {{ item.label }}
    </fwb-list-group-item>
  </fwb-list-group>
</template>

<script setup>
import { FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const activeTab = defineModel('activeTab')
</script>
