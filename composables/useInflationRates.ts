import type { CategoryInflationData, TimePeriod } from '~/types'
import { stringToTimePeriod, timePeriodToString } from '~/types'
import { inflationRates } from '~/data/inflationRates'

export const useInflationRates = () => {
  const getRateForCategory = (categoryId: string, period: TimePeriod): number => {
    const category = inflationRates.find(c => c.id === categoryId)
    if (!category) return 0

    const periodStr = timePeriodToString(period)
    return category.rates[periodStr] || 0
  }

  const getYearlyRateForCategory = (categoryId: string, year: number): number => {
    const category = inflationRates.find(c => c.id === categoryId)
    if (!category) return 0

    // Calculate average rate for the year
    const yearRates = Object.entries(category.rates)
      .filter(([period]) => period.startsWith(year.toString()))
      .map(([, rate]) => rate)

    if (yearRates.length === 0) return 0
    return yearRates.reduce((sum, rate) => sum + rate, 0) / yearRates.length
  }

  const getCategoryDefinition = (categoryId: string) => {
    return inflationRates.find(c => c.id === categoryId)
  }

  return {
    getRateForCategory,
    getYearlyRateForCategory,
    getCategoryDefinition
  }
}