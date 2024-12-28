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
  from: TimePeriod
  to: TimePeriod
  isComplete: boolean
  isLastComplete: boolean
}
