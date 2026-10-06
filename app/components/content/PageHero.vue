<script setup lang="ts">
defineProps<{
  heading: string
  eyebrow?: string
  image?: string
  imageAlt?: string
}>()
</script>

<template>
  <section class="grid items-center gap-10 md:grid-cols-2">
    <div>
      <p
        v-if="eyebrow"
        class="mb-3 text-sm tracking-wide text-muted uppercase"
      >
        {{ eyebrow }}
      </p>
      <h1 class="font-serif text-5xl leading-tight text-highlighted md:text-6xl">
        {{ heading }}
      </h1>
      <div class="mt-6 max-w-xl text-lg text-toned">
        <slot />
      </div>
    </div>
    <img
      v-if="image"
      :src="image"
      :alt="imageAlt || ''"
      class="aspect-4/5 w-full rounded-lg object-cover"
    >
  </section>
</template>
