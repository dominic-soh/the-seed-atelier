import nodemailer from 'nodemailer'

export interface OutboundMail {
  to: string
  replyTo?: string
  subject: string
  text: string
}

export async function sendGmail(message: OutboundMail) {
  const config = useRuntimeConfig()
  assertMailConfigured(config.gmailUser, config.gmailAppPassword)
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword
    }
  })

  try {
    await transport.sendMail({
      from: config.gmailUser,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Mail could not be sent' })
  }
}

export async function trySendGmail(message: OutboundMail) {
  try {
    await sendGmail(message)
    return true
  } catch {
    return false
  }
}

function assertMailConfigured(user: string, password: string) {
  if (user && password) {
    return
  }
  throw createError({ statusCode: 503, statusMessage: 'Mail is not configured' })
}
