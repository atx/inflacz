<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <span class="text-2xl font-bold text-blue-600">infla.cz</span>
          </NuxtLink>
        </div>
        <div class="flex space-x-8">
          <NuxtLink to="/metodika" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600">
            Metodika
          </NuxtLink>
          <NuxtLink to="/kontakt" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600">
            Kontakt
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>