<script setup lang="ts">
const { data: page } = await useAsyncData('home-page', () =>
  queryCollection('pages').where('path', '=', '/').first()
)

useSeoMeta({
  title: page.value?.title || 'The Seed Atelier',
  description: page.value?.description
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-12">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="flex flex-col gap-16"
    />
  </div>
</template>
