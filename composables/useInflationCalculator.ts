import type { InflationResult, SpendingCategory, TimePeriod, CategoryInflationData } from '~/types'
import { createTimePeriod, stringToTimePeriod, timePeriodToString } from '~/types'
import { inflationRates } from '~/data/inflationRates'

export interface TimeRange {
  from: TimePeriod
  to: TimePeriod
}

export const useInflationCalculator = () => {
  const determineLastCompleteYear = (): number => {
    // Get all unique years from the data keys
    const years = new Set<number>()
    
    // Use the first category's rates as reference for available time periods
    const timeKeys = Object.keys(inflationRates[0].rates)
    
    // Extract years from time keys (format: "YYYY-MM")
    timeKeys.forEach(key => {
      const year = parseInt(key.split('-')[0])
      years.add(year)
    })
    
    // Sort years in descending order
    const sortedYears = Array.from(years).sort((a, b) => b - a)
    
    // Find the most recent year with all 12 months
    for (const year of sortedYears) {
      let hasAllMonths = true
      for (let month = 1; month <= 12; month++) {
        const key = `${year}-${month.toString().padStart(2, '0')}`
        if (!timeKeys.includes(key)) {
          hasAllMonths = false
          break
        }
      }
      if (hasAllMonths) {
        return year
      }
    }
    
    // Fallback: return the earliest year if no complete year found
    return sortedYears[sortedYears.length - 1]
  }

  const calculateInflationForYear = (
    categories: SpendingCategory[],
    year: number
  ): InflationResult => {
    // Edge case handling:
    // If we do not have full data for the year, but we have the XXXX-01 month,
    // we take the largest available month that we have data for
    // We compare december of the previous year to december of this year
    // If we do not have data for january of the previous year, we return NaN

    const validTimeKeys = Object.keys(inflationRates[0].rates)
    const generateValidKeysForYear = (year: number) => {
      const keys = []
      for (let month = 1; month <= 12; month++) {
        const key = `${year}-${month.toString().padStart(2, '0')}`
        if (validTimeKeys.includes(key)) {
          keys.push(key)
        }
      }
      return keys
    }

    const prevKeys = generateValidKeysForYear(year - 1)
    const thisKeys = generateValidKeysForYear(year).filter(k => validTimeKeys.includes(k))
    if (prevKeys.length < 12) {
      return {
        personalRate: NaN,
        from: createTimePeriod(year - 1, 12),
        to: createTimePeriod(year, 12),
        isComplete: false,
        isLastComplete: false
      }
    }

    const sumSpendForKeys = (keys: string[]) => {
      return categories.reduce((acc, cat) => {
        const categoryData = inflationRates.find(c => c.id === cat.categoryId)
        if (!categoryData) {
          // WTF?
          console.log(`Could not find category data for ${cat.categoryId}`)
          return NaN
        }
        const rates = categoryData.rates
        return keys.reduce((acc, key) => {
          return acc + cat.amount * rates[key]
        }, acc)
      }, 0)
    }

    const avgSpendBefore = sumSpendForKeys(prevKeys) / prevKeys.length
    const avgSpendAfter = sumSpendForKeys(thisKeys) / thisKeys.length

    const avgSpendRatio = avgSpendAfter / avgSpendBefore
    // Annualize the ratio
    const annualizedRatio = Math.pow(avgSpendRatio, 12 / thisKeys.length)

    const personalRate = (annualizedRatio - 1.0) * 100

    return {
      personalRate,
      from: stringToTimePeriod(thisKeys[0]),
      to: stringToTimePeriod(thisKeys[thisKeys.length - 1]),
      isComplete: thisKeys.length === 12,
      isLastComplete: year === determineLastCompleteYear()
    }
  }

  return {
    calculateInflationForYear
  }
}
