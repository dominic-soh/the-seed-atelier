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
    class="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2"
  >
    <div>
      <h1 class="font-serif text-5xl leading-tight text-highlighted">
        {{ page.title }}
      </h1>
      <p class="mt-4 text-xl italic text-toned">
        {{ page.description }}
      </p>
      <div class="atelier-prose mt-8 text-default">
        <ContentRenderer :value="page" />
      </div>
    </div>
    <img
      v-if="page.image"
      :src="page.image"
      :alt="page.imageAlt || ''"
      class="aspect-[4/5] w-full rounded-lg object-cover"
    >
  </div>
</template>
