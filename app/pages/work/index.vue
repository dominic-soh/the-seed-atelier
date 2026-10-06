<script setup lang="ts">
const { data: page } = await useAsyncData('work-page', () =>
  queryCollection('pages').where('path', '=', '/work').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Work page is missing' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-12">
    <ContentRenderer
      v-if="page"
      :value="page"
      class="flex flex-col gap-8"
    />
  </div>
</template>
