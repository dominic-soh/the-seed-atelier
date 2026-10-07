<script setup lang="ts">
const slug = String(useRoute().params.serviceSlug)
const { data: service } = await useAsyncData(`service-${slug}`, () =>
  queryCollection('services').path(`/services/${slug}`).first())

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

useSeoMeta({
  title: service.value.title,
  description: service.value.summary
})
</script>

<template>
  <div
    v-if="service"
    class="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12"
  >
    <div class="grid items-start gap-8 md:grid-cols-2">
      <img
        v-if="service.image"
        :src="service.image"
        :alt="service.imageAlt || service.title"
        class="aspect-[4/5] w-full rounded-lg object-cover"
      >
      <div>
        <p class="text-sm text-muted">
          <NuxtLink
            to="/services"
            class="hover:text-primary"
          >Services</NuxtLink>
        </p>
        <h1 class="mt-3 font-serif text-5xl leading-tight text-highlighted">
          {{ service.title }}
        </h1>
        <p class="mt-4 text-lg text-toned">
          {{ service.summary }}
        </p>
        <p
          v-if="service.priceLabel"
          class="mt-4 font-serif text-2xl text-primary"
        >
          {{ service.priceLabel }}
        </p>
        <div class="mt-6 text-default">
          <ContentRenderer :value="service" />
        </div>
      </div>
    </div>

    <EnquiryForm
      :heading="`Request ${service.title}`"
      :service-slug="service.slug"
      :asks-for-guests="service.asksForGuests"
    />
  </div>
</template>
