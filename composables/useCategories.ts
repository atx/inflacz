import type { CategoryDefinition } from '~/types'
import { categories } from '~/data/categories'

export const useCategories = () => {
  return categories
}