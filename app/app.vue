<script setup lang="ts">
import { siteOrigin } from '~~/shared/utils/crawl'

const route = useRoute()
const origin = siteOrigin(useRuntimeConfig().public.siteUrl)
const canonical = computed(() => `${origin}${route.path}`)

useSeoMeta({
  titleTemplate: '%s · The Seed Atelier',
  ogType: 'website',
  ogUrl: canonical
})

useHead({
  link: computed(() => [{ rel: 'canonical', href: canonical.value }])
})
</script>

<template>
  <UApp>
    <div class="flex min-h-screen flex-col bg-default text-default">
      <SiteHeader />
      <UMain class="flex-1">
        <NuxtPage />
      </UMain>
      <SiteFooter />
    </div>
  </UApp>
</template>
