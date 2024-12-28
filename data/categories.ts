import type { CategoryDefinition } from '~/types'
import { inflationRates } from './inflationRates'

// Convert inflation rates data to category definitions
export const categories: CategoryDefinition[] = inflationRates.map(rate => ({
  id: rate.id,
  name: rate.name,
  description: rate.description
}))