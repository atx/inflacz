<template>
  <div class="fixed right-4 bottom-4 bg-white rounded-lg shadow-lg p-4 z-50 transition-all duration-300">
    <div class="text-center h-[88px] flex flex-col justify-center">
      <div class="text-sm text-gray-600 mb-1">Aktuální inflace</div>
      <div class="text-2xl font-bold leading-none mb-1">
        {{ isNaN(currentRate) ? "?" : currentRate.toFixed(1) }}%
      </div>
      <div class="text-xs text-gray-500">{{ currentYear }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InflationResult } from '~/types'

const props = defineProps<{
  results: InflationResult[]
}>()

const currentYear = computed(() => {
  const currentYearResult = props.results.find(result => result.isLastComplete)
  return currentYearResult?.from.year ?? NaN
})

const currentRate = computed(() => {
  const currentYearResult = props.results.find(result => result.isLastComplete)
  return currentYearResult?.personalRate ?? NaN
})
</script>
