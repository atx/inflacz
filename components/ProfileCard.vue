<template>
  <div 
  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer"
    @click.middle="handleClickMiddle"
    @click="handleClick"
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

const handleClickMiddle = (event: MouseEvent) => {
  // This magically works both in Firefox and Chromium
  // Apparently does not work on Chrome
  // https://stackoverflow.com/a/76529021
  const a = document.createElement('a');
  a.href = `/calculator/${props.profile.id}`;
  a.target = '_blank';
  const e = new MouseEvent('click', {
    ctrlKey: true, // for Windows or Linux
    metaKey: true, // for MacOS
  });
  a.dispatchEvent(e);
}

const handleClick = (event: MouseEvent) => {
  router.push(`/calculator/${props.profile.id}`)
}
</script>
