<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <template v-if="profile">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Nastavení výdajů - {{ profile.name }}
      </h1>

      <CalculatorInflationDisplay :results="inflationResults" />
      
      <CalculatorFloatingInflationCard 
        v-if="showFloatingCard" 
        :results="inflationResults" 
      />

      <div class="bg-white rounded-lg shadow p-6">
        <CalculatorCategoryList
          :categories="metadata.categories"
          v-model="spendingByCategory"
          :max-value="maxSliderValue"
          @slider-release="updateMaxValue"
        />
      </div>

      <CalculatorDataInfo />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDefinition, InflationResult, SpendingCategory } from '~/types'
import type { DataMetadata } from '~/composables/useMetadata'
import { useInflationCalculator } from '~/composables/useInflationCalculator'
import { calculateMaxValue } from '~/utils/scaling'

const route = useRoute()
const { getProfile, getProfileSpending } = useProfiles()
const { calculateInflationForYear } = useInflationCalculator()

const profile = computed(() => getProfile(route.params.profile as string))
const metadata = ref<DataMetadata>(useMetadata())
const categories = ref<CategoryDefinition[]>(useCategories())
const spendingByCategory = ref<Record<string, number>>({})
const maxSliderValue = ref(10000) // Initial default value
const showFloatingCard = ref(false)

// Show floating card after scrolling 200px
const handleScroll = () => {
  showFloatingCard.value = window.scrollY > 150
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const currentSpending = computed((): SpendingCategory[] => {
  return metadata.value.categories.map(category => ({
    categoryId: category.id,
    amount: spendingByCategory.value[category.id] || 0
  }))
})

const yearRange = computed(() => {
  const years = []
  // We do not include 2018 as we do not have data for 2017-12 to start
  // the computation on
  for (let i = metadata.value.minTimePeriod.year + 1; i <= metadata.value.maxTimePeriod.year; i++) {
    years.push(i)
  }
  return years
})

const inflationResults = computed((): InflationResult[] => {
  return yearRange.value.map(year => {
    return calculateInflationForYear(currentSpending.value, year)
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
