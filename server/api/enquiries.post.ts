import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'
import { enquirySchema, isHoneypotFilled, renderConfirmation, renderEnquiry } from '../../shared/utils/enquiry'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, enquirySchema.parse)
  if (isHoneypotFilled(body.company)) {
    return { ok: true, confirmationSent: false }
  }

  const settings = await queryCollection(event, 'settings').first()
  if (!settings) {
    throw createError({ statusCode: 500, statusMessage: 'Site settings are missing' })
  }

  const service = await findService(event, body.serviceSlug)
  const guests = guestsForService(service, body.guests)
  const serviceTitle = service?.title

  await sendGmail({
    to: settings.enquiryEmail,
    replyTo: body.email,
    subject: leadSubject(serviceTitle),
    text: renderEnquiry({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      message: body.message,
      updates: body.updates,
      serviceTitle,
      guests
    })
  })

  const confirmationSent = await trySendGmail({
    to: body.email,
    subject: settings.confirmationSubject,
    text: renderConfirmation(settings.confirmationBody, {
      firstName: body.firstName,
      serviceTitle
    })
  })

  if (!confirmationSent) {
    await trySendGmail({
      to: settings.enquiryEmail,
      subject: 'Confirmation was not delivered',
      text: `The request from ${body.email} is in the previous email. The confirmation to them did not send.`
    })
  }

  return { ok: true, confirmationSent }
})

async function findService(event: H3Event, slug: string | undefined) {
  if (!slug) {
    return null
  }
  const bySlug = await queryCollection(event, 'services').where('slug', '=', slug).first()
  if (bySlug) {
    return bySlug
  }
  const byPath = await queryCollection(event, 'services').path(`/services/${slug}`).first()
  if (!byPath) {
    throw createError({ statusCode: 400, statusMessage: 'That service is not available' })
  }
  return byPath
}

function guestsForService(
  service: { asksForGuests?: boolean } | null,
  guests: number | undefined
) {
  if (!service?.asksForGuests) {
    return undefined
  }
  return guests
}

function leadSubject(serviceTitle: string | undefined) {
  if (!serviceTitle) {
    return 'New atelier enquiry'
  }
  return `Request: ${serviceTitle}`
}
