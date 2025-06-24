<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4"
    >
      <div class="text-2xl font-bold">Número de operaciones</div>
      <DonutChart
        :series="[10, 22, 15, 40]"
        :labels="['Microblink', 'Incode', 'Duales', 'Independientes']"
        :height="270"
      />
    </div>
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4 col-span-2"
    >
      <div class="text-2xl font-bold">Motor más utilizado</div>
      <LineChart
        :series="[
          { name: 'Microblink', data: [40, 25, 30, 23, 51, 76, 40] },
          { name: 'Incode', data: [10, 41, 35, 51, 49, 62, 69] }
        ]"
        :categories="['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']"
        :height="270"
        :colors="['#4F46E5', '#10B981']"
      />
    </div>
  </div>
  <div class="grid grid-cols-3 gap-4">
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4"
    >
      <div class="text-2xl font-bold">Motor más utilizado</div>
      <PieChart
        :series="[51, 49]"
        :labels="['Microblink', 'Incode']"
        :height="270"
        :colors="['#4F46E5', '#10B981']"
      />
    </div>
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4"
    >
      <div class="text-2xl font-bold">Tipo de operación</div>
      <PieChart
        :series="[68, 32]"
        :labels="['Independiente', 'Dual']"
        :height="270"
        :colors="['#A855F7', '#F59E0B']"
      />
    </div>
    <div
      class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4"
    >
      <div class="text-2xl font-bold">Tipo de dispositivo</div>
      <PieChart
        :series="[25, 80]"
        :labels="['Escritorio', 'Móvil']"
        :height="270"
        :colors="['#FF6363', '#67AE6E']"
      />
    </div>
  </div>
</template>

<script setup>
import PieChart from '@/ui/charts/PieChart.vue'
import DonutChart from '@/ui/charts/DonutChart.vue'
import LineChart from '@/ui/charts/LineChart.vue'
</script>
