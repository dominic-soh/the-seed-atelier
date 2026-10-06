import { z } from 'zod'

export const enquirySchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.email('A valid email is required'),
  message: z.string().trim().min(1, 'Message is required'),
  updates: z.boolean().default(false),
  serviceSlug: z.string().optional(),
  guests: z.number().int().min(1).max(30).optional(),
  company: z.string().optional()
})

export type Enquiry = z.output<typeof enquirySchema>

export function isHoneypotFilled(company: string | undefined) {
  if (!company) {
    return false
  }
  return company.trim().length > 0
}

export function renderEnquiry(input: {
  firstName: string
  lastName: string
  email: string
  message: string
  updates: boolean
  serviceTitle?: string
  guests?: number
}) {
  const lines = [
    `From: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    serviceLine(input.serviceTitle),
    guestLine(input.guests),
    `News and updates: ${yesNo(input.updates)}`,
    '',
    input.message
  ]
  return lines.filter(line => line !== undefined).join('\n')
}

export function renderConfirmation(template: string, input: {
  firstName: string
  serviceTitle?: string
}) {
  const service = input.serviceTitle || 'your project'
  return template
    .replaceAll('{firstName}', input.firstName)
    .replaceAll('{service}', service)
}

function serviceLine(title: string | undefined) {
  if (!title) {
    return undefined
  }
  return `Service: ${title}`
}

function guestLine(guests: number | undefined) {
  if (!guests) {
    return undefined
  }
  return `Guests: ${guests}`
}

function yesNo(value: boolean) {
  if (value) {
    return 'yes'
  }
  return 'no'
}
