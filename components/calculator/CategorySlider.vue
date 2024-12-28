<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label class="block text-sm font-medium text-gray-700">
        {{ category.name }}
      </label>
      <span class="text-sm text-gray-500">
        {{ Math.round(modelValue) }} Kč
      </span>
    </div>
    <input
      type="range"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
      :min="0"
      :max="maxValue"
      class="w-full"
      step="50"
    >
    <p class="text-sm text-gray-500">{{ category.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDefinition } from '~/types'

defineProps<{
  category: CategoryDefinition
  modelValue: number
  maxValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'sliderRelease': [value: number]
}>()

function handleInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  emit('update:modelValue', value)
}

function handleChange(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  emit('sliderRelease', value)
}
</script>