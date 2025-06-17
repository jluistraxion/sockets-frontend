<template>
  <Title> Información de la sesión </Title>
  <Card class="p-5 !min-w-full">
    <div class="md:flex gap-4">
      <ListGroup
        v-model:activeTab="activeTab"
        :items="[
          { name: 'personal', icon: 'bi bi-person-circle', label: 'Personal' },
          { name: 'address', icon: 'bi bi-house-door', label: 'Dirección' },
          { name: 'location', icon: 'bi bi-geo-alt', label: 'Ubicación' },
          { name: 'images', icon: 'bi bi-person-vcard', label: 'Imagenes' }
        ]"
      />
      <div
        class="p-6 py-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
      >
        <TabPersonal
          v-show="activeTab === 'personal'"
          :data="data?.data"
          :loading="isFetching"
        />
        <TabAddress
          v-show="activeTab === 'address'"
          :data="data?.data"
          :loading="isFetching"
        />
        <TabLocation
          v-show="activeTab === 'location'"
          :data="data?.data"
          :loading="isFetching"
        />
        <TabImages
          v-show="activeTab === 'images'"
          :data="data?.data"
          :loading="isFetching"
        />
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import api from '@/api/api'
import Card from '@/ui/cards/Card.vue'
import ListGroup from '@/ui/lists/ListGroup.vue'
import TabPersonal from '@/components/sessions/detail/TabPersonal.vue'
import TabAddress from '@/components/sessions/detail/TabAddress.vue'
import TabLocation from '@/components/sessions/detail/TabLocation.vue'
import TabImages from '@/components/sessions/detail/TabImages.vue'
import Title from '@/ui/content/Title.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const activeTab = ref('personal')

const { data, isFetching } = useQuery({
  queryKey: ['operacion', route.params.id],
  queryFn: () => api.post(`${API_URL}/getdata`, { idoperacion: route.params.id })
  // select: (data) => data?.Items,
})
</script>
