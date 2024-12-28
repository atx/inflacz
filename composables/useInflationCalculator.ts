import type { InflationResult, SpendingCategory, TimePeriod } from '~/types'
import { createTimePeriod } from '~/types'
import { useInflationRates } from './useInflationRates'

export interface TimeRange {
  from: TimePeriod
  to: TimePeriod
}

export const useInflationCalculator = () => {
  const { getYearlyRateForCategory } = useInflationRates()

  const calculateInflation = (
    categories: SpendingCategory[],
    timeRange: TimeRange
  ): InflationResult => {
    if (categories.length === 0) {
      return {
        personalRate: 0,
        nationalRate: 0,
        breakdown: [],
        period: timeRange.to
      }
    }

    const total = categories.reduce((sum, c) => sum + c.amount, 0)
    
    // Calculate weighted average of category rates
    const weightedRates = categories.map(category => {
      const weight = category.amount / total
      const rate = getYearlyRateForCategory(category.categoryId, timeRange.to.year)
      return {
        categoryId: category.categoryId,
        contribution: weight * rate,
        weight,
        rate
      }
    })

    const personalRate = weightedRates.reduce((sum, wr) => sum + wr.contribution, 0) % 10.0

    // For now, use a simplified national rate calculation
    const nationalRate = 6.5 // This should be calculated from the data in a real implementation

    return {
      personalRate,
      nationalRate,
      breakdown: weightedRates.map(wr => ({
        categoryId: wr.categoryId,
        contribution: wr.contribution
      })),
      period: timeRange.to
    }
  }

  const getDefaultTimeRange = (): TimeRange => {
    const currentYear = new Date().getFullYear()
    return {
      from: createTimePeriod(currentYear - 2, 1),
      to: createTimePeriod(currentYear + 1, 12)
    }
  }

  return {
    calculateInflation,
    getDefaultTimeRange
  }
}