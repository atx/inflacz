<template>
  <div 
    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer"
    @mouseup="handleClick"
  >
    <div class="flex items-center space-x-4 mb-4">
      <img
        :src="profile.image.src"
        :alt="profile.image.alt"
        :width="profile.image.width"
        :height="profile.image.height"
      />
      <h3 class="text-xl font-semibold text-gray-900">
        {{ profile.title }}
      </h3>
    </div>
    <p class="text-gray-600">
      {{ profile.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '~/types/profile'
import { useRouter } from 'vue-router'

const props = defineProps<{
  profile: UserProfile
}>()

const router = useRouter()

const handleClick = (event: MouseEvent) => {
  if (event.button === 1) { // Middle mouse button
    window.open(`/calculator/${props.profile.id}`, '_blank')
  } else {
    router.push(`/calculator/${props.profile.id}`)
  }
}
</script>
