import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { getSalesNotificationEmail, getUserConfirmationEmail } from '@/lib/email-templates'

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  clinicName: z.string().min(2, 'Clinic name is required'),
  software: z.string().min(2, 'Practice software is required'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = waitlistSchema.parse(body)

    // Create transporter using cPanel SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send sales notification email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'sales@callmaddy.au',
      subject: `New Waitlist Signup: ${validatedData.clinicName}`,
      html: getSalesNotificationEmail(validatedData),
    })

    // Send user confirmation email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: validatedData.email,
      subject: 'Welcome to Maddy - Thanks for Joining!',
      html: getUserConfirmationEmail(validatedData.name),
    })

    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist submission error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to process waitlist submission' },
      { status: 500 }
    )
  }
}
