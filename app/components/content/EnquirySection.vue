<script setup lang="ts">
defineProps<{
  heading?: string
}>()
</script>

<template>
  <EnquiryForm :heading="heading" />
</template>
