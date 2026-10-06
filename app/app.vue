<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · The Seed Atelier',
  ogType: 'website'
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
