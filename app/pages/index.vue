<script setup lang="ts">
const { data: page } = await useAsyncData('home-page', () =>
  queryCollection('pages').where('path', '=', '/').first()
)
const { data: services } = await useAsyncData('home-services', () =>
  queryCollection('services').order('order', 'ASC').limit(2).all()
)
const { data: work } = await useAsyncData('home-work', () =>
  queryCollection('work').order('order', 'ASC').limit(2).all()
)

useSeoMeta({
  title: page.value?.title || 'The Seed Atelier',
  description: page.value?.description
})
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
    <section class="grid items-center gap-10 md:grid-cols-2">
      <div>
        <h1 class="font-serif text-5xl leading-tight text-highlighted md:text-6xl">
          {{ page?.title }}
        </h1>
        <p class="mt-6 max-w-xl text-lg text-toned">
          {{ page?.description }}
        </p>
      </div>
      <img
        v-if="page?.image"
        :src="page.image"
        :alt="page.imageAlt || ''"
        class="aspect-[4/5] w-full rounded-lg object-cover"
      >
    </section>

    <section>
      <h2 class="font-serif text-4xl text-highlighted">
        Our Services
      </h2>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <article
          v-for="service in services"
          :key="service.slug"
          class="rounded-lg border border-default p-6"
        >
          <h3 class="font-serif text-2xl text-highlighted">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-toned">
            {{ service.summary }}
          </p>
          <UButton
            :to="`/services/${service.slug}`"
            variant="link"
            class="mt-4 px-0"
            trailing-icon="i-lucide-arrow-right"
          >
            Learn more
          </UButton>
        </article>
      </div>
    </section>

    <section>
      <div class="flex items-end justify-between gap-4">
        <h2 class="font-serif text-4xl text-highlighted">
          Selected work
        </h2>
        <UButton
          to="/work"
          variant="link"
          class="px-0"
        >
          All projects
        </UButton>
      </div>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <article
          v-for="project in work"
          :key="project.slug"
          class="rounded-lg border border-default p-6"
        >
          <p class="text-sm tracking-wide text-muted uppercase">
            {{ project.category }}
          </p>
          <h3 class="mt-2 font-serif text-2xl text-highlighted">
            {{ project.client }}
          </h3>
          <p class="mt-3 text-toned">
            {{ project.title }}
          </p>
          <UButton
            :to="`/work/${project.slug}`"
            variant="link"
            class="mt-4 px-0"
            trailing-icon="i-lucide-arrow-right"
          >
            View project
          </UButton>
        </article>
      </div>
    </section>

    <section
      v-if="page?.gallery?.length"
      class="grid grid-cols-2 gap-3 md:grid-cols-4"
    >
      <img
        v-for="photo in page.gallery"
        :key="photo.src"
        :src="photo.src"
        :alt="photo.alt"
        class="aspect-square w-full rounded-lg object-cover"
      >
    </section>

    <div class="flex justify-end">
      <UButton
        to="/contact"
        size="lg"
        class="rounded-full px-8"
      >
        Work With Us
      </UButton>
    </div>
  </div>
</template>
