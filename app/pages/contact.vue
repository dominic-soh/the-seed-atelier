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
  <div class="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
    <section class="grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 class="font-serif text-5xl leading-tight text-highlighted">
          {{ page?.title }}
        </h1>
        <div class="mt-4 max-w-md text-lg text-toned">
          <ContentRenderer
            v-if="page"
            :value="page"
          />
        </div>
      </div>
      <img
        v-if="page?.image"
        :src="page.image"
        :alt="page.imageAlt || ''"
        class="aspect-[4/5] w-full rounded-lg object-cover"
      >
    </section>
    <EnquiryForm />
  </div>
</template>
