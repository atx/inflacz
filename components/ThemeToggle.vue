<template>
  <button @click="toggleTheme" class="flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none">
    <Icon v-if="$colorMode.preference === 'dark'" name="heroicons-outline:moon" class="w-6 h-6" />
    <Icon v-else-if="$colorMode.preference === 'light'" name="heroicons-outline:sun" class="w-6 h-6" />
    <Icon v-else name="heroicons-outline:computer-desktop" class="w-6 h-6" />
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleTheme = () => {
  const modes = ['light', 'dark', 'system']
  const current = modes.indexOf(colorMode.preference)
  const next = (current + 1) % modes.length
  colorMode.preference = modes[next]
}
</script>