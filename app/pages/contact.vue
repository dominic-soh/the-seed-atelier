<script setup lang="ts">
const { data: page } = await useAsyncData('contact-page', () =>
  queryCollection('pages').where('path', '=', '/contact').first()
)

useSeoMeta({
  title: page.value?.title || 'Contact',
  description: page.value?.description
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-12">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="flex flex-col gap-12"
    />
  </div>
</template>
