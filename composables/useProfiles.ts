import { userProfiles } from '~/data/userProfiles'
import type { UserProfile, SpendingCategory } from '~/types'

export const useProfiles = () => {
  const getProfile = (id: string): UserProfile | undefined => {
    return userProfiles.find(profile => profile.id === id)
  }

  const isValidProfile = (id: string): boolean => {
    return userProfiles.some(profile => profile.id === id)
  }

  const getProfileSpending = (profileId: string): Record<string, number> => {
    const profile = getProfile(profileId)
    if (!profile) return {}
    
    return profile.categories.reduce((acc, category) => {
      acc[category.categoryId] = category.amount
      return acc
    }, {} as Record<string, number>)
  }

  return {
    profiles: userProfiles,
    getProfile,
    isValidProfile,
    getProfileSpending
  }
}