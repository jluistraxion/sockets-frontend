<template>
  <fwb-breadcrumb>
    <fwb-breadcrumb-item
      v-for="(item, i) in breadcrumbRoutes"
      :key="i"
      :home="i === 0 ? true : false"
    >
      <router-link :to="item.href">
        {{ item.title }}
      </router-link>
    </fwb-breadcrumb-item>
  </fwb-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { FwbBreadcrumb, FwbBreadcrumbItem } from 'flowbite-vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const breadcrumbRoutes = computed(() => {
  const fullPath = []
  return route.matched
    .filter((r) => r.meta?.title)
    .map((r) => {
      fullPath.push(r.path.replace(/^\/|\/$/g, '')) // limpia slashes
      return {
        title: r.meta.title,
        href: r.path
      }
    })
})
</script>
