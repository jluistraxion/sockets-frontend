<template>
  <div class="border border-slate-400 hidden grid-cols-4 gap-4 p-4">
    <div>
      <div class="text-slate-500">Incode</div>
    </div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <DonutChart
      title="Total de operaciones"
      :series="[10, 22, 15, 40]"
      :labels="['Incode', 'Microblink', 'Duales', 'Independientes']"
    />
    <PieChart
      title="Motor más utilizado"
      :series="[51, 49]"
      :labels="['Microblink', 'Incode']"
    />
  </div>
  <div class="grid grid-cols-2 gap-4">
    <PieChart
      title="Tipo de operación"
      :series="[68, 32]"
      :labels="['Individual', 'Dual']"
    />
    <PieChart
      title="Tipo de dispositivo"
      :series="[25, 80]"
      :labels="['Escritorio', 'Móvil']"
    />
  </div>
</template>

<script setup>
import PieChart from '@/ui/charts/PieChart.vue'
import DonutChart from '@/ui/charts/DonutChart.vue'
</script>
