<script setup lang="ts">
const props = withDefaults(defineProps<{
  heading?: string
  limit?: number
  layout?: 'cards' | 'rows'
}>(), {
  layout: 'cards'
})

const { data: services } = await useAsyncData(
  `content-services-${props.layout}-${props.limit || 'all'}`,
  () => {
    const query = queryCollection('services').order('order', 'ASC')

    if (props.limit) {
      return query.limit(props.limit).all()
    }

    return query.all()
  },
  { getCachedData: contentCachedData }
)
</script>

<template>
  <section>
    <h2
      v-if="heading"
      class="font-serif text-4xl text-highlighted"
    >
      {{ heading }}
    </h2>
    <div
      v-if="layout === 'cards'"
      class="mt-8 grid gap-6 md:grid-cols-2"
    >
      <article
        v-for="service in services"
        :key="service.slug"
        :data-content-id="service.id"
        class="rounded-lg border border-default p-6"
      >
        <h3 class="font-serif text-2xl text-highlighted">
          {{ service.title }}
        </h3>
        <p class="mt-3 text-toned">
          {{ service.summary }}
        </p>
        <UButton
          :to="service.path"
          variant="link"
          class="mt-4 px-0"
          trailing-icon="i-lucide-arrow-right"
        >
          Learn more
        </UButton>
      </article>
    </div>
    <div
      v-else
      class="mt-2"
    >
      <article
        v-for="service in services"
        :key="service.slug"
        :data-content-id="service.id"
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
          <h3 class="font-serif text-3xl text-highlighted">
            {{ service.title }}
          </h3>
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
          :to="service.path"
          variant="link"
          class="px-0"
        >
          Learn more
        </UButton>
      </article>
    </div>
  </section>
</template>
