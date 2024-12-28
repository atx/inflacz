<template>
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Celkové měsíční výdaje
    </label>
    <input
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="Zadejte částku v Kč"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
}>()
defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>