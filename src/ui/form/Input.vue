<template>
  <fwb-input
    :label
    :placeholder
    :size
    v-model="value"
    :type="inputType"
    :validation-status="errorMessage ? 'error' : ''"
    :disabled="loading"
    label-class="dark:text-white"
  >
    <template
      #prefix
      v-show="icon"
    >
      <i
        class="text-gray-500 text-lg"
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
import { useField } from 'vee-validate'

const showPassword = ref(false)

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'sm'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const model = defineModel()

const { value, errorMessage } = useField(
  props.name,
  {},
  { initialValue: model.value, syncVModel: true }
)
</script>
