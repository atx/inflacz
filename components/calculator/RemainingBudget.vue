<template>
  <div class="mt-8 p-4 bg-gray-50 rounded-md">
    <div class="flex justify-between items-center">
      <span class="font-medium">Zbývající částka:</span>
      <span :class="{'text-red-600': amount < 0, 'text-green-600': amount >= 0}">
        {{ Math.round(amount) }} Kč
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  amount: number
}>()
</script>