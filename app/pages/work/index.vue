<script setup lang="ts">
const { data: projects } = await useAsyncData('work', () =>
  queryCollection('work').order('order', 'ASC').all()
)

useSeoMeta({
  title: 'Work',
  description: 'Selected spatial curation and botanical projects from The Seed Atelier.'
})
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
    <h1 class="font-serif text-5xl text-highlighted">
      Selected work
    </h1>
    <article
      v-for="project in projects"
      :key="project.slug"
      class="grid gap-4 border-b border-default py-8 md:grid-cols-[1fr_2fr]"
    >
      <div>
        <p class="text-sm tracking-wide text-muted uppercase">
          {{ project.category }}
        </p>
        <h2 class="mt-2 font-serif text-3xl text-highlighted">
          {{ project.client }}
        </h2>
      </div>
      <div>
        <p class="text-lg text-default">
          {{ project.title }}
        </p>
        <p class="mt-2 text-muted">
          {{ project.role }}
        </p>
        <UButton
          :to="`/work/${project.slug}`"
          variant="link"
          class="mt-4 px-0"
        >
          View project
        </UButton>
      </div>
    </article>
  </div>
</template>
