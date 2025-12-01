# Maddy Landing Page

AI-powered virtual receptionist landing page and waitlist for Australian Allied Health practices.

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- Supabase account (for waitlist storage)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Set up Supabase database:

Create a `waitlist` table with the following schema:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  pms TEXT NOT NULL,
  pms_other TEXT,
  clinic_type TEXT NOT NULL,
  clinic_type_other TEXT,
  reception_handling TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Features

- **Responsive Design**: Mobile-first, works on all devices
- **Brand-Consistent**: Uses Maddy brand colors and typography (Inter font)
- **Waitlist Form**: Collects clinic information with validation
- **Spam Protection**: Honeypot field for basic spam prevention
- **Supabase Integration**: Stores waitlist entries securely
- **Australian Focus**: Tailored for Allied Health practices in Australia

## Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx          # Root layout with Inter font
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles
│   └── api/
│       └── waitlist/
│           └── route.ts    # Waitlist API endpoint
├── components/
│   ├── Navigation.tsx      # Header navigation
│   ├── Hero.tsx            # Hero section
│   ├── HowItWorks.tsx      # Process explanation
│   ├── Features.tsx        # Feature cards
│   ├── ForClinics.tsx      # Benefits and use cases
│   ├── Security.tsx        # Security & privacy
│   ├── FAQ.tsx             # Accordion FAQ
│   └── WaitlistForm.tsx    # Waitlist form with validation
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── validations.ts      # Zod schemas
└── public/
    └── logo.png            # Maddy logo
```

## Brand Colors

- **Primary**: Maddy Blue (#1B5CFF), Clinical White (#FFFFFF), Ink Charcoal (#111418)
- **Secondary**: Eucalyptus Green (#2FA680), Soft Sky (#E8F0FF), Warm Sand (#F8EACC)
- **Status**: Urgent Red (#FF4D4F), Success Green (#1FB57A)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **Font**: Inter (Google Fonts)

## Deployment

This project can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

Make sure to set environment variables in your deployment platform.

## Security

- No PHI collected (only clinic contact information)
- Honeypot spam protection
- Server-side validation with Zod
- Supabase Row Level Security enabled
- All data encrypted in transit and at rest

## License

MIT
