
import type { CategoryDefinition, TimePeriod } from '~/types'
import { stringToTimePeriod } from '~/types'
import { inflationRates } from '~/data/inflationRates'

export interface DataMetadata {
  categories: CategoryDefinition[],
  maxTimePeriod: TimePeriod,
  minTimePeriod: TimePeriod,
}

export const useMetadata = (): DataMetadata => {
  const categories = inflationRates.map((rate) => {
    return {
      id: rate.id,
      name: rate.name,
      description: rate.description,
    }
  })
  // We can assume that all categories have the same time periods
  const timeKeys = Object.keys(inflationRates[0].rates)
  const minTimePeriod = stringToTimePeriod(timeKeys.reduce((a, b) => a < b ? a : b, timeKeys[0]))
  const maxTimePeriod = stringToTimePeriod(timeKeys.reduce((a, b) => a > b ? a : b, timeKeys[0]))

  return {
    categories,
    maxTimePeriod,
    minTimePeriod,
  }
}
