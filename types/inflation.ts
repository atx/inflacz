// Basic category definition
export interface CategoryDefinition {
  id: string
  name: string
  description: string
}

// Time period structure
export interface TimePeriod {
  year: number
  month: number
}

// Monthly inflation rate data for a category
export interface CategoryInflationData {
  categoryId: string
  rates: Map<TimePeriod, number>
}

// Complete dataset structure
export interface InflationDataset {
  categories: CategoryDefinition[]
  inflationData: CategoryInflationData[]
  metadata: {
    lastUpdated: string
    version: string
    description: string
  }
}

// Computed inflation rate for a specific period
export interface InflationRate {
  period: TimePeriod
  value: number
  categoryId: string
}

// Helper functions for working with TimePeriod
export const createTimePeriod = (year: number, month: number): TimePeriod => {
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12')
  }
  return { year, month }
}

export const compareTimePeriods = (a: TimePeriod, b: TimePeriod): number => {
  if (a.year !== b.year) {
    return a.year - b.year
  }
  return a.month - b.month
}

export const timePeriodToString = (period: TimePeriod): string => {
  const monthStr = period.month.toString().padStart(2, '0')
  return `${period.year}-${monthStr}`
}

export const stringToTimePeriod = (str: string): TimePeriod => {
  const [year, month] = str.split('-').map(Number)
  return createTimePeriod(year, month)
}