<template>
  <div class="flex flex-col gap-6 border border-slate-50 rounded-lg p-4 bg-white">
    <Title>Usuarios</Title>
    <EasyDataTable
      :headers="headers"
      :items="[]"
      :loading="false"
      table-class-name="customize-table"
      theme-color="#17a54d"
    />
  </div>
</template>

<script setup>
import Title from '@/ui/content/Title.vue'

const headers = [
  { text: 'Id', value: 'uuid', sortable: true },
  { text: 'Nombre', value: 'fecharegistro', sortable: true },
  { text: 'Tipo de Flujo', value: 'fecharegistro', sortable: true },
  { text: 'Motor de Preferencia', value: 'fecharegistro', sortable: true }
]
</script>
