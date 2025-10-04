<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Spočítejte si svou vlastní míru inflace
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Vyberte si profil nebo vytvořte vlastní nastavení
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfileCard
        v-for="profile in profiles"
        :key="profile.id"
        :profile="profile"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useProfiles } from '~/composables/useProfiles'

const { profiles } = useProfiles()
</script>
