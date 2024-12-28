import type { InflationResult, SpendingCategory, TimePeriod, CategoryInflationData } from '~/types'
import { createTimePeriod, stringToTimePeriod, timePeriodToString } from '~/types'
import { inflationRates } from '~/data/inflationRates'

export interface TimeRange {
  from: TimePeriod
  to: TimePeriod
}

export const useInflationCalculator = () => {

  const getCategoryInflationData = (categoryId: string) => {
    return inflationRates.find(c => c.id === categoryId)
  }

  const calculateInflation = (
    categories: SpendingCategory[],
    timeRange: TimeRange
  ): InflationResult => {
    if (categories.length === 0) {
      return {
        personalRate: 0,
        nationalRate: 0,
        period: timeRange.to
      }
    }

    let totalSpendBefore = 0.0
    let totalSpendAfter = 0.0
    // TODO: Maybe preprocess the inflationRates object
    categories.forEach(cat => {
      const categoryData = inflationRates.find(c => c.id === cat.categoryId)
      if (!categoryData) {
        // WTF
        return
      }
      const rates = categoryData.rates
      const rateBefore = rates[timePeriodToString(timeRange.from)]
      const rateAfter = rates[timePeriodToString(timeRange.to)]
      totalSpendBefore += cat.amount * rateBefore
      totalSpendAfter += cat.amount * rateAfter
    })

    const personalRate = totalSpendAfter / totalSpendBefore - 1

    return {
      personalRate: personalRate * 100,
      from: timeRange.from,
      to: timeRange.to,
      isComplete: timeRange.to.year <= 2024,
      isLastComplete: timeRange.to.year === 2024
    }
  }

  return {
    calculateInflation
  }
}
