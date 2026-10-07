<script setup lang="ts">
const slug = readRouteParam(useRoute().params.workSlug)
const { data: project } = await useAsyncData(`work-${slug}`, () =>
  queryCollection('work').path(`/work/${slug}`).first(),
{ getCachedData: contentCachedData }
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: `${project.value.client} · ${project.value.title}`,
  description: project.value.role
})
</script>

<template>
  <article
    v-if="project"
    class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12"
  >
    <div class="grid items-start gap-8 md:grid-cols-2">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.imageAlt || project.client"
        class="aspect-[4/5] w-full rounded-lg object-cover"
      >
      <div>
        <p class="text-sm text-muted">
          <NuxtLink
            to="/work"
            class="hover:text-primary"
          >Work</NuxtLink>
        </p>
        <p class="mt-4 text-sm tracking-wide text-muted uppercase">
          {{ project.category }}
        </p>
        <h1 class="mt-2 font-serif text-5xl leading-tight text-highlighted">
          {{ project.client }}
        </h1>
        <p class="mt-3 text-xl text-default">
          {{ project.title }}
        </p>
        <p class="mt-4 text-toned">
          {{ project.role }}
        </p>
        <p
          v-if="project.aesthetic"
          class="mt-4 text-muted"
        >
          {{ project.aesthetic }}
        </p>
      </div>
    </div>

    <ContentRenderer :value="project" />
  </article>
</template>
