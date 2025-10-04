<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Měsíční výdaje podle kategorií</h2>
      <div class="text-lg font-medium">
        Celkem: {{ Math.round(totalSpending) }} Kč
      </div>
    </div>

    <div class="space-y-6">
      <CalculatorCategorySlider
        v-for="category in categories"
        :key="category.id"
        :category="category"
        v-model="spending[category.id]"
        :max-value="maxValue"
        @slider-release="handleSliderRelease"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDefinition } from '~/types'

const props = defineProps<{
  categories: CategoryDefinition[]
  modelValue: Record<string, number>
  maxValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, number>]
  'sliderRelease': []
}>()

const spending = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const totalSpending = computed(() => 
  Object.values(spending.value).reduce((sum, value) => sum + (value || 0), 0)
)

function handleSliderRelease() {
  emit('sliderRelease')
}
</script>