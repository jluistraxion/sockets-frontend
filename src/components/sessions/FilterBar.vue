<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <Input
      class="lg:w-96"
      label="Buscar"
      size="sm"
      placeholder="Escribe algo para buscar..."
      v-model="searchCriteria"
      name="searchCriteria"
      icon="bi bi-search text-sm"
    />
    <div class="flex items-end gap-2">
      <Input
        label="Fecha inicio:"
        size="sm"
        type="date"
        v-model="initDate"
        name="initDate"
      />
      <Input
        label="Fecha fin:"
        size="sm"
        type="date"
        v-model="endDate"
        name="endDate"
      />
      <Button
        size="xs"
        @click="$emit('filter')"
        class="bg-green-600 hover:bg-green-700 focus:ring-green-300"
      >
        <div class="flex flex-row items-center gap-1">
          <i class="bi bi-filter text-xl" /> Filtrar
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup>
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'

const searchCriteria = defineModel('searchCriteria')
const initDate = defineModel('initDate')
const endDate = defineModel('endDate')

defineEmits(['filter'])
</script>
