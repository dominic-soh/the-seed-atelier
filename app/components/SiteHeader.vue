<script setup lang="ts">
const { data: settings } = await useSiteSettings()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/90 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
      <NuxtLink
        to="/"
        class="leading-tight"
      >
        <span class="font-serif text-xl text-highlighted">{{ settings?.name || 'The Seed Atelier' }}</span>
        <span class="mt-1 block text-sm text-muted">{{ settings?.tagline }}</span>
      </NuxtLink>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
        <nav class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <NuxtLink
            v-for="item in settings?.nav || []"
            :key="item.to"
            :to="item.to"
            class="text-toned hover:text-primary"
            active-class="text-highlighted underline decoration-primary underline-offset-4"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <UColorModeSwitch />
      </div>
    </div>
  </header>
</template>
