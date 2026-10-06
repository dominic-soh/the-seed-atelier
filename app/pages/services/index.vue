<script setup lang="ts">
const { data: page } = await useAsyncData('services-page', () =>
  queryCollection('pages').where('path', '=', '/services').first()
)
const { data: services } = await useAsyncData('services', () =>
  queryCollection('services').order('order', 'ASC').all()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Services page is missing' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
    <div>
      <h1 class="font-serif text-5xl text-highlighted">
        {{ page?.title }}
      </h1>
      <div class="mt-4 max-w-2xl text-lg text-toned">
        <ContentRenderer
          v-if="page"
          :value="page"
        />
      </div>
    </div>
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
