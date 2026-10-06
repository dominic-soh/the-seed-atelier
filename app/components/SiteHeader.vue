<script setup lang="ts">
const { data: settings } = await useSiteSettings()
const { data: pages } = await useAsyncData('site-nav', () =>
  queryCollection('pages').select('path', 'title', 'navigation', 'navOrder').all()
)
const nav = computed(() => {
  const items = pages.value || []
  return items
    .filter(item => item.navigation !== false)
    .sort((left, right) => (left.navOrder || 0) - (right.navOrder || 0))
    .map(item => ({ label: navigationLabel(item), to: item.path }))
})

function navigationLabel(item: { title: string, navigation?: boolean | { title?: string } | null }) {
  if (item.navigation && typeof item.navigation === 'object' && item.navigation.title) {
    return item.navigation.title
  }
  return item.title
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/90 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
      <NuxtLink
        to="/"
        class="leading-tight"
      >
        <img
          src="/images/logo.png"
          alt="The Seed Atelier"
          class="h-16 w-auto rounded-md md:h-20"
        >
        <span class="mt-2 block text-sm text-muted">{{ settings?.tagline }}</span>
      </NuxtLink>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
        <nav class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <NuxtLink
            v-for="item in nav"
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
