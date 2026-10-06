<script setup lang="ts">
const { data: settings } = await useSiteSettings()
</script>

<template>
  <footer class="mt-16 border-t border-default">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
      <p class="font-serif text-3xl text-highlighted">
        {{ settings?.name }}
      </p>
      <div class="text-right">
        <a
          v-if="settings?.enquiryEmail"
          class="text-lg text-primary"
          :href="`mailto:${settings.enquiryEmail}`"
        >
          {{ settings.enquiryEmail }}
        </a>
        <div class="mt-3 flex justify-end gap-3">
          <UButton
            v-for="social in settings?.socials || []"
            :key="social.label"
            :to="social.href"
            target="_blank"
            color="neutral"
            variant="outline"
            size="sm"
          >
            {{ social.label }}
          </UButton>
        </div>
      </div>
    </div>
  </footer>
</template>
