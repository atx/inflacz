import type { SpendingCategory } from './calculator'

export interface ProfileImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface UserProfile {
  id: string
  name: string
  description: string
  categories: SpendingCategory[]
  image: ProfileImage
}