import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitlistEntry = {
  id?: string
  clinic_name: string
  contact_person: string
  email: string
  phone?: string
  pms: string
  pms_other?: string
  clinic_type: string
  clinic_type_other?: string
  reception_handling: string
  created_at?: string
}
