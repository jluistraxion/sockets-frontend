<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Imagenes</h3>
    <div
      v-if="imgs.length"
      class="flex flex-row gap-6 items-top"
    >
      <Image
        v-if="data?.imagenFrontal"
        size="w-64"
        :src="`data:image/jpeg;base64,${data?.imagenFrontal}`"
        @click="showLightbox(0)"
      />
      <Image
        v-if="data?.imagenReverso"
        class="cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
        size="w-64"
        :src="`data:image/jpeg;base64,${data?.imagenReverso}`"
        @click="showLightbox(1)"
      />
      <div>
        <Image
          v-if="data?.imagenFoto"
          class="cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105"
          size="w-24 h-24"
          :src="`data:image/jpeg;base64,${data?.imagenFoto}`"
          @click="showLightbox(2)"
        />
      </div>
      <VueEasyLightbox
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="visible = false"
      />
    </div>
    <div
      v-else
      class="text-sm text-slate-500"
    >
      No hay imagenes para mostrar.
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Image from '@/ui/images/Image.vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const props = defineProps(['data', 'loading'])

const visible = ref(false)
const index = ref(0)

const imgs = computed(() => {
  const { data } = props
  return [
    data?.imagenFrontal ? `data:image/jpeg;base64,${data.imagenFrontal}` : null,
    data?.imagenReverso ? `data:image/jpeg;base64,${data.imagenReverso}` : null,
    data?.imagenFoto ? `data:image/jpeg;base64,${data.imagenFoto}` : null
  ].filter(Boolean)
})

const showLightbox = (i) => {
  index.value = i
  visible.value = true
}
</script>
