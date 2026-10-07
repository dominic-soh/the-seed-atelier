<script setup lang="ts">
const slug = useRoute().params.slug
const path = pagePath(slug)
const { data: page } = await useAsyncData(`page-${path}`, () =>
  queryCollection('pages').path(path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})

function pagePath(value: string | string[] | undefined) {
  const segments = [value].flat().filter(segment => segment)
  return `/${segments.join('/')}`
}
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
