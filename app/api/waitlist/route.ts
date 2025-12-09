import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSalesNotificationEmail } from '@/lib/email-templates'

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  clinicName: z.string().min(2, 'Clinic name is required'),
  software: z.string().min(2, 'Practice software is required'),
  practitionerCount: z.string().min(1, 'Practitioner count is required'),
  topFeatures: z.array(z.string()).min(1, 'At least one feature must be selected'),
  biggestChallenge: z.string().min(1, 'Biggest challenge is required'),
})

type WaitlistData = z.infer<typeof waitlistSchema>

async function submitToHubSpot(data: WaitlistData) {
  const hubspotApiKey = process.env.HUBSPOT_API_KEY

  if (!hubspotApiKey) {
    console.warn('HUBSPOT_API_KEY not configured, skipping HubSpot submission')
    return null
  }

  const hubspotData = {
    properties: {
      email: data.email,
      firstname: data.name.split(' ')[0],
      lastname: data.name.split(' ').slice(1).join(' ') || '',
      phone: data.phone,
      company: data.clinicName,
      practice_management_software: data.software,
      number_of_practitioners: data.practitionerCount,
      top_features: data.topFeatures.join('; '),
      biggest_phone_challenge: data.biggestChallenge,
      lifecyclestage: 'lead',
    },
  }

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${hubspotApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hubspotData),
  })

  if (!response.ok) {
    // If contact already exists, try to update instead
    if (response.status === 409) {
      const searchResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hubspotApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filterGroups: [{
              filters: [{
                propertyName: 'email',
                operator: 'EQ',
                value: data.email,
              }],
            }],
          }),
        }
      )

      if (searchResponse.ok) {
        const searchResult = await searchResponse.json()
        if (searchResult.results && searchResult.results.length > 0) {
          const contactId = searchResult.results[0].id

          // Update existing contact
          const updateResponse = await fetch(
            `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
            {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${hubspotApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ properties: hubspotData.properties }),
            }
          )

          if (updateResponse.ok) {
            return await updateResponse.json()
          }
        }
      }
    }

    const errorText = await response.text()
    throw new Error(`HubSpot API error: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

async function sendUserConfirmationEmail(data: WaitlistData) {
  const smtp2goApiKey = process.env.SMTP2GO_API_KEY

  if (!smtp2goApiKey) {
    throw new Error('SMTP2GO_API_KEY not configured')
  }

  const firstName = data.name.split(' ')[0]

  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: smtp2goApiKey,
      sender: 'Maddy Virtual Receptionist <hello@callmaddy.au>',
      to: [data.email],
      template_id: '3598597',
      template_data: {
        first_name: firstName,
        clinic_name: data.clinicName,
        practice_management_software: data.software,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`SMTP2GO API error: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

async function sendSalesNotificationEmail(data: WaitlistData) {
  const smtp2goApiKey = process.env.SMTP2GO_API_KEY

  if (!smtp2goApiKey) {
    throw new Error('SMTP2GO_API_KEY not configured')
  }

  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: smtp2goApiKey,
      sender: 'Maddy Virtual Receptionist <hello@callmaddy.au>',
      to: ['sales@callmaddy.au'],
      subject: `New Waitlist Signup: ${data.clinicName}`,
      html_body: getSalesNotificationEmail(data),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`SMTP2GO API error: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = waitlistSchema.parse(body)

    // Submit to HubSpot (don't block on failure)
    try {
      await submitToHubSpot(validatedData)
    } catch (hubspotError) {
      console.error('HubSpot submission error:', hubspotError)
      // Continue with email sending even if HubSpot fails
    }

    // Send sales notification email
    await sendSalesNotificationEmail(validatedData)

    // Send user confirmation email via SMTP2GO template
    await sendUserConfirmationEmail(validatedData)

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
