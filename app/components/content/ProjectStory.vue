<script setup lang="ts">
defineProps<{
  focusAreas?: string[]
}>()
</script>

<template>
  <section class="grid gap-10 md:grid-cols-[2fr_1fr]">
    <div class="text-lg text-default">
      <slot />
    </div>
    <ul
      v-if="focusAreas?.length"
      class="flex flex-col gap-3"
    >
      <li
        v-for="area in focusAreas"
        :key="area"
        class="border-t border-default pt-3"
      >
        {{ area }}
      </li>
    </ul>
  </section>
</template>
