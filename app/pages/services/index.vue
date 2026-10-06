<script setup lang="ts">
const { data: services } = await useAsyncData('services', () =>
  queryCollection('services').order('order', 'ASC').all()
)

useSeoMeta({
  title: 'Services',
  description: 'Spatial curation, botanical art, workshops, and on-site styling from The Seed Atelier.'
})
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
    <h1 class="font-serif text-5xl text-highlighted">
      Our Services
    </h1>
    <article
      v-for="service in services"
      :key="service.slug"
      class="grid items-center gap-6 border-b border-default py-6 md:grid-cols-[8rem_1fr_auto]"
    >
      <img
        v-if="service.image"
        :src="service.image"
        :alt="service.imageAlt || service.title"
        class="aspect-square w-full rounded-lg object-cover"
      >
      <div
        v-else
        class="hidden md:block"
      />
      <div>
        <h2 class="font-serif text-3xl text-highlighted">
          {{ service.title }}
        </h2>
        <p class="mt-2 text-toned">
          {{ service.summary }}
        </p>
        <p
          v-if="service.priceLabel"
          class="mt-2 text-muted"
        >
          {{ service.priceLabel }}
        </p>
      </div>
      <UButton
        :to="`/services/${service.slug}`"
        variant="link"
        class="px-0"
      >
        Learn more
      </UButton>
    </article>
  </div>
</template>
