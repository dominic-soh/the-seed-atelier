<script setup lang="ts">
const props = withDefaults(defineProps<{
  heading?: string
  limit?: number
  layout?: 'cards' | 'rows'
  showAllLink?: boolean
}>(), {
  layout: 'cards',
  showAllLink: false
})

const { data: projects } = await useAsyncData(
  `content-work-${props.layout}-${props.limit || 'all'}`,
  () => {
    const query = queryCollection('work').order('order', 'ASC')

    if (props.limit) {
      return query.limit(props.limit).all()
    }

    return query.all()
  }
)
</script>

<template>
  <section>
    <div
      v-if="heading"
      class="flex items-end justify-between gap-4"
    >
      <h2 class="font-serif text-4xl text-highlighted">
        {{ heading }}
      </h2>
      <UButton
        v-if="showAllLink"
        to="/work"
        variant="link"
        class="px-0"
      >
        All projects
      </UButton>
    </div>
    <div
      v-if="layout === 'cards'"
      class="mt-8 grid gap-6 md:grid-cols-2"
    >
      <article
        v-for="project in projects"
        :key="project.slug"
        :data-content-id="project.id"
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
          :to="project.path"
          variant="link"
          class="mt-4 px-0"
          trailing-icon="i-lucide-arrow-right"
        >
          View project
        </UButton>
      </article>
    </div>
    <div
      v-else
      class="mt-2"
    >
      <article
        v-for="project in projects"
        :key="project.slug"
        :data-content-id="project.id"
        class="grid items-center gap-6 border-b border-default py-6 md:grid-cols-[8rem_1fr_auto]"
      >
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.imageAlt || project.client"
          class="aspect-square w-full rounded-lg object-cover"
        >
        <div
          v-else
          class="hidden md:block"
        />
        <div>
          <p class="text-sm tracking-wide text-muted uppercase">
            {{ project.category }}
          </p>
          <h3 class="mt-2 font-serif text-3xl text-highlighted">
            {{ project.client }}
          </h3>
          <p class="mt-2 text-lg text-default">
            {{ project.title }}
          </p>
          <p class="mt-2 text-muted">
            {{ project.role }}
          </p>
        </div>
        <UButton
          :to="project.path"
          variant="link"
          class="px-0"
        >
          View project
        </UButton>
      </article>
    </div>
  </section>
</template>
