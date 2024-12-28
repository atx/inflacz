// User's spending configuration
export interface SpendingCategory {
  categoryId: string
  amount: number
}

export interface UserProfile {
  id: string
  name: string
  categories: SpendingCategory[]
}

// Computed results
export interface InflationResult {
  personalRate: number
  nationalRate: number
  breakdown: {
    categoryId: string
    contribution: number
  }[]
  period: TimePeriod
}