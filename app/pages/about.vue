<script setup lang="ts">
const { data: page } = await useAsyncData('about-page', () =>
  queryCollection('pages').where('path', '=', '/about').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'About page is missing' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div
    v-if="page"
    class="mx-auto max-w-6xl px-6 py-12"
  >
    <ContentRenderer :value="page" />
  </div>
</template>
