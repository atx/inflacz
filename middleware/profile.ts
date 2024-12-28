export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/calculator/')) {
    const { isValidProfile } = useProfiles()
    const profileId = to.params.profile as string
    
    if (!isValidProfile(profileId)) {
      return navigateTo('/')
    }
  }
})