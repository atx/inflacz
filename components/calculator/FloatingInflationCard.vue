<template>
  <div class="fixed right-4 bottom-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/50 p-4 z-50 transition-all duration-300 opacity-100">
    <div class="text-center h-[88px] flex flex-col justify-center">
      <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Vypočtená inflace</div>
      <div class="text-2xl font-bold leading-none mb-1">
        {{ isNaN(currentRate) ? "?" : currentRate.toFixed(1) }}%
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-500">{{ currentYear }}</div>
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
  return currentYearResult?.to.year ?? NaN
})

const currentRate = computed(() => {
  const currentYearResult = props.results.find(result => result.isLastComplete)
  return currentYearResult?.personalRate ?? NaN
})
</script>
