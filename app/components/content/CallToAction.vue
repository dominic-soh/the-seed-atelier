<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  to: string
  align?: 'left' | 'center' | 'right'
}>(), {
  align: 'right'
})
</script>

<template>
  <div
    class="flex"
    :class="{
      'justify-start': align === 'left',
      'justify-center': align === 'center',
      'justify-end': align === 'right'
    }"
  >
    <UButton
      :to="to"
      size="lg"
      class="rounded-full px-8"
    >
      {{ label }}
    </UButton>
  </div>
</template>
