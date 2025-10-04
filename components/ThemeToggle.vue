<template>
  <button @click="toggleTheme" class="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none">
    <Icon v-if="$colorMode.value === 'dark'" name="heroicons-outline:moon" class="w-5 h-5" />
    <Icon v-else name="heroicons-outline:sun" class="w-5 h-5" />
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>