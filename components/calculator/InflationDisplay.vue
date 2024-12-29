<template>
  <div class="relative mb-12 overflow-hidden">
    <!-- Gradient overlays for scroll indication  -->
    <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
    <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
    
    <!-- Scrollable container -->
    <div 
      ref="scrollContainer"
      class="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
      style="scroll-behavior: smooth;"
    >
      <div class="flex items-end space-x-8 md:space-x-10 px-8 mx-auto justify-center">
        <div 
          v-for="rate in yearlyRates" 
          :key="`${rate.year}`"
          class="flex-none text-center snap-center"
          :class="{ 'scale-110': rate.isCurrent }"
        >
          <div 
            class="text-2xl md:text-3xl font-bold mb-2 w-[5.5ch] inline-block" 
            :class="{ 'text-3xl md:text-4xl': rate.isCurrent }"
          >
            <span class="inline-block text-center w-full">
              {{ isNaN(rate.value) ? "?" : rate.value.toFixed(1) }}%
            </span>
          </div>
          <div class="text-gray-600 whitespace-nowrap">
            {{ rate.year }}
            <span v-if="rate.isYTD" class="text-sm">(YTD)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InflationResult } from '~/types'

interface YearlyRate {
  year: number
  value: number
  isCurrent: boolean
  isYTD: boolean
}

const props = defineProps<{
  results: InflationResult[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const yearlyRates = computed<YearlyRate[]>(() => {
  const currentYear = new Date().getFullYear()
  
  return props.results.map(result => ({
    year: result.to.year,
    value: result.personalRate,
    isCurrent: result.isLastComplete,
    isYTD: !result.isComplete
  }))
})

// Scroll to current year when component mounts
onMounted(() => {
  nextTick(() => {
    if (!scrollContainer.value) return
    
    const currentYearElement = scrollContainer.value.querySelector('.scale-110')
    if (currentYearElement) {
      const containerWidth = scrollContainer.value.offsetWidth
      const elementOffset = currentYearElement.offsetLeft
      const elementWidth = currentYearElement.offsetWidth
      
      // Center the current year
      scrollContainer.value.scrollLeft = elementOffset - (containerWidth / 2) + (elementWidth / 2)
    }
  })
})
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;             /* Chrome, Safari and Opera */
}
</style>
