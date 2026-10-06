<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { enquirySchema, type Enquiry } from '~~/shared/utils/enquiry'

const props = defineProps<{
  serviceSlug?: string
  asksForGuests?: boolean
  heading?: string
}>()

const toast = useToast()
const sent = ref(false)
const confirmationSent = ref(false)

const state = reactive<Partial<Enquiry>>({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  updates: false,
  serviceSlug: props.serviceSlug,
  guests: undefined,
  company: ''
})

async function onSubmit(event: FormSubmitEvent<Enquiry>) {
  try {
    const result = await $fetch('/api/enquiries', {
      method: 'POST',
      body: event.data
    })
    confirmationSent.value = result.confirmationSent
    sent.value = true
  } catch (error) {
    toast.add({
      title: 'Could not send',
      description: readErrorMessage(error),
      color: 'error'
    })
  }
}

function readErrorMessage(error: unknown) {
  if (!error || typeof error !== 'object') {
    return 'The request could not be sent.'
  }
  if ('statusMessage' in error && typeof error.statusMessage === 'string') {
    return error.statusMessage
  }
  return 'The request could not be sent.'
}
</script>

<template>
  <section class="rounded-lg bg-elevated p-6 md:p-8">
    <div
      v-if="sent"
      class="max-w-md"
    >
      <h2 class="font-serif text-3xl text-highlighted">
        Request received
      </h2>
      <p class="mt-3 text-toned">
        We have your note<span v-if="state.firstName">, {{ state.firstName }}</span>, and will reply to {{ state.email }}.
      </p>
      <p
        v-if="confirmationSent"
        class="mt-2 text-sm text-muted"
      >
        A confirmation is on its way from the atelier.
      </p>
    </div>

    <UForm
      v-else
      :schema="enquirySchema"
      :state="state"
      class="grid gap-6 md:grid-cols-2"
      @submit="onSubmit"
    >
      <div>
        <h2 class="font-serif text-4xl leading-tight text-highlighted">
          {{ heading || 'Begin Your Project' }}
        </h2>
        <p class="mt-4 max-w-sm text-toned">
          Submit the form to explore how a cultivated approach can shape the work.
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <div class="grid gap-4 sm:grid-cols-2">
          <UFormField
            name="firstName"
            label="First name"
            required
          >
            <UInput
              v-model="state.firstName"
              class="w-full"
            />
          </UFormField>
          <UFormField
            name="lastName"
            label="Last name"
            required
          >
            <UInput
              v-model="state.lastName"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField
          name="email"
          label="Email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            class="w-full"
          />
        </UFormField>
        <UFormField
          v-if="asksForGuests"
          name="guests"
          label="Guests"
        >
          <UInputNumber
            v-model="state.guests"
            :min="1"
            :max="30"
            class="w-full"
          />
        </UFormField>
        <UFormField
          name="message"
          label="Message"
          required
        >
          <UTextarea
            v-model="state.message"
            :rows="4"
            class="w-full"
          />
        </UFormField>
        <UCheckbox
          v-model="state.updates"
          label="Sign up for news and updates"
        />
        <div
          class="absolute -left-[9999px]"
          aria-hidden="true"
        >
          <label>
            Company website
            <input
              v-model="state.company"
              tabindex="-1"
              autocomplete="off"
            >
          </label>
        </div>
        <UButton
          type="submit"
          size="lg"
          class="self-start rounded-full px-8"
        >
          Send
        </UButton>
      </div>
    </UForm>
  </section>
</template>
