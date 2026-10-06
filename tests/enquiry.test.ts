import { describe, expect, it } from 'vitest'
import { enquirySchema, isHoneypotFilled, renderConfirmation, renderEnquiry } from '../shared/utils/enquiry'

const valid = {
  firstName: 'Amina',
  lastName: 'Rahman',
  email: 'amina@example.com',
  message: 'Saturday morning in Tiong Bahru.',
  updates: false
}

describe('enquiry', () => {
  it('requires a name, email, and message', () => {
    const result = enquirySchema.safeParse({
      firstName: ' ',
      lastName: '',
      email: 'not-an-email',
      message: ''
    })
    expect(result.success).toBe(false)
  })

  it('accepts a general enquiry without guests', () => {
    const result = enquirySchema.safeParse(valid)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.guests).toBeUndefined()
      expect(result.data.updates).toBe(false)
    }
  })

  it('accepts guests when they are provided', () => {
    const result = enquirySchema.parse({ ...valid, guests: 6, serviceSlug: 'private-ikebana' })
    expect(result.guests).toBe(6)
  })

  it('drops a filled honeypot from consideration', () => {
    expect(isHoneypotFilled('spammers inc')).toBe(true)
    expect(isHoneypotFilled('   ')).toBe(false)
    expect(isHoneypotFilled(undefined)).toBe(false)
  })

  it('renders both email payloads', () => {
    const lead = renderEnquiry({
      ...valid,
      serviceTitle: 'Private Ikebana & Floral Workshop',
      guests: 6
    })
    expect(lead).toContain('Service: Private Ikebana & Floral Workshop')
    expect(lead).toContain('Guests: 6')
    expect(lead).toContain('News and updates: no')

    const general = renderEnquiry({ ...valid, updates: true })
    expect(general).not.toContain('Guests:')
    expect(general).toContain('News and updates: yes')

    const note = renderConfirmation(
      'Thank you, {firstName}. We have your note about {service}.',
      { firstName: 'Amina', serviceTitle: 'Private Ikebana & Floral Workshop' }
    )
    expect(note).toBe('Thank you, Amina. We have your note about Private Ikebana & Floral Workshop.')
  })
})
