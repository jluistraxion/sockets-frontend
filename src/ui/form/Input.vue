<template>
  <fwb-input
    :label
    :placeholder
    :size
    v-model="model"
    :type="inputType"
  >
    <template
      #prefix
      v-show="icon"
    >
      <i
        class="text-gray-500 text-xl"
        :class="[icon]"
      />
    </template>
    <template
      #suffix
      v-if="type == 'password'"
    >
      <i
        class="cursor-pointer p-1 bi"
        :class="[showPassword ? 'bi-eye' : 'bi-eye-slash']"
        role="button"
        @click="showPassword = !showPassword"
      />
    </template>
  </fwb-input>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FwbInput } from 'flowbite-vue'

const showPassword = ref(false)

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  }
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const model = defineModel()
</script>
