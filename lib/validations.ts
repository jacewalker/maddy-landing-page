import { z } from 'zod'

export const waitlistSchema = z.object({
  clinic_name: z.string().min(1, 'Clinic name is required'),
  contact_person: z.string().min(1, 'Contact person name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  pms: z.string().min(1, 'Please select your Practice Management Software'),
  pms_other: z.string().optional(),
  clinic_type: z.string().min(1, 'Please select your clinic type'),
  clinic_type_other: z.string().optional(),
  reception_handling: z.string().min(10, 'Please tell us a bit more (at least 10 characters)'),
  // Honeypot field for spam protection
  website: z.string().optional(),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>
