<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <template v-if="profile">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Nastavení výdajů - {{ profile.name }}
      </h1>

      <CalculatorInflationDisplay :results="inflationResults" />
      
      <CalculatorFloatingInflationCard :results="inflationResults" />

      <div class="bg-white rounded-lg shadow p-6">
        <CalculatorCategoryList
          :categories="categories"
          v-model="spendingByCategory"
          :max-value="maxSliderValue"
          @slider-release="updateMaxValue"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDefinition, InflationResult, SpendingCategory } from '~/types'
import { useInflationCalculator } from '~/composables/useInflationCalculator'
import { calculateMaxValue } from '~/utils/scaling'

const route = useRoute()
const { getProfile, getProfileSpending } = useProfiles()
const { calculateInflation } = useInflationCalculator()

const profile = computed(() => getProfile(route.params.profile as string))
const categories = ref<CategoryDefinition[]>(useCategories())
const spendingByCategory = ref<Record<string, number>>({})
const maxSliderValue = ref(10000) // Initial default value

const currentSpending = computed((): SpendingCategory[] => {
  return categories.value.map(category => ({
    categoryId: category.id,
    amount: spendingByCategory.value[category.id] || 0
  }))
})

const yearRange = computed(() => {
  // Return current year and 1 year to the future
  const currentYear = new Date().getFullYear()
  const years = []
  // We do not include 2018 as we do not have data for 2017-12 to start
  // the computation on
  for (let i = 2019; i <= currentYear + 1; i++) {
    years.push(i)
  }
  return years
})

const inflationResults = computed((): InflationResult[] => {
  return yearRange.value.map(year => {
    const periodRange = {
      from: { year, month: 1 },
      to: { year, month: 12 }
    }
    return calculateInflation(currentSpending.value, periodRange)
  })
})
  
function handleSpendingUpdate(newSpending: Record<string, number>) {
  spendingByCategory.value = newSpending
}

function updateMaxValue() {
  maxSliderValue.value = calculateMaxValue(spendingByCategory.value)
}

onMounted(() => {
  // Initialize all categories with 0
  categories.value.forEach(category => {
    spendingByCategory.value[category.id] = 0
  })
  
  // Apply profile spending if any
  const profileSpending = getProfileSpending(route.params.profile as string)
  Object.entries(profileSpending).forEach(([categoryId, amount]) => {
    spendingByCategory.value[categoryId] = amount
  })
  
  // Set initial max value based on profile spending
  maxSliderValue.value = calculateMaxValue(spendingByCategory.value)
})
</script>
