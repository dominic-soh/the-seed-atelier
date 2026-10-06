<script setup lang="ts">
defineProps<{
  images: Array<{
    src: string
    alt?: string
  }>
}>()
</script>

<template>
  <section class="grid grid-cols-2 gap-3 md:grid-cols-4">
    <img
      v-for="image in images"
      :key="image.src"
      :src="image.src"
      :alt="image.alt || ''"
      class="aspect-square w-full rounded-lg object-cover"
    >
  </section>
</template>
