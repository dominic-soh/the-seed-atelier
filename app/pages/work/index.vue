<script setup lang="ts">
const { data: page } = await useAsyncData('work-page', () =>
  queryCollection('pages').where('path', '=', '/work').first()
)
const { data: projects } = await useAsyncData('work', () =>
  queryCollection('work').order('order', 'ASC').all()
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
