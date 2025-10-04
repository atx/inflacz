<template>
  <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
    <p>Data aktuální k {{ formattedDate }} • Zdroj: <a href="https://vdb.czso.cz/vdbvo2/faces/cs/index.jsf" class="underline hover:text-gray-700 dark:hover:text-gray-300">Český statistický úřad</a></p>
  </div>
</template>

<script setup lang="ts">
import { inflationMetadata } from '~/data/inflationRates'

const formattedDate = computed(() => {
  const date = new Date(inflationMetadata.fetchedAt)
  return date.toISOString().split('T')[0] // YYYY-MM-DD format
})
</script>
