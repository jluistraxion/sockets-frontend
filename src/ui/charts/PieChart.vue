<template>
  <div ref="pieChart" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'

// const props = defineProps(['title', 'series', 'labels'])
const props = defineProps({
  series: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    default: ['#00809D', '#80D8C3']
  },
  height: {
    type: Number,
    default: 320
  }
})

const pieChart = ref()

const getChartOptions = () => {
  return {
    // series: [52.8, 26.8, 20.4],
    // labels: ['Direct', 'Organic search', 'Referrals'],
    series: props.series,
    labels: props.labels,
    colors: props.colors,
    chart: {
      height: props.height,
      width: '100%',
      type: 'pie'
    },
    stroke: {
      colors: ['white'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        labels: {
          show: true
        },
        size: '100%',
        dataLabels: {
          offset: -25
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '%'
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '%'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  }
}

onMounted(() => {
  const el = pieChart.value
  if (!el) return
  const chart = new ApexCharts(el, getChartOptions())
  chart.render()
})
</script>
