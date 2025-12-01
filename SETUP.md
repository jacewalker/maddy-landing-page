# Maddy Landing Page - Quick Setup Guide

## ✅ What's Been Built

A complete Next.js 15 landing page with:

- **Hero section** with logo and CTAs
- **How It Works** - 4-step process explanation
- **Features** - 8 feature cards + "Coming Soon" section
- **For Clinics** - ROI benefits and use cases
- **Security & Privacy** - 6 security features
- **FAQ** - 8 expandable questions
- **Waitlist Form** - Full validation with Zod
- **API Endpoint** - `/api/waitlist` for form submissions
- **Responsive Design** - Mobile-first, works on all devices
- **Brand-Consistent** - Uses Maddy colors, Inter font, Australian voice

## 🚀 Getting Started

### 1. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project, go to the SQL Editor and run this schema:

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

-- Optional: Create policy to view data (for admin dashboard later)
CREATE POLICY "Allow authenticated reads" ON waitlist
  FOR SELECT TO authenticated
  USING (true);
```

3. Get your Supabase credentials:
   - Go to Project Settings > API
   - Copy the **Project URL** and **anon public** key

### 2. Configure Environment Variables

Create a `.env.local` file in the `landing-page` folder:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server

```bash
cd landing-page
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 4. Test the Waitlist Form

1. Scroll down to the waitlist section
2. Fill out the form
3. Submit and verify it appears in your Supabase table

## 📁 Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx              # Root layout with Inter font & footer
│   ├── page.tsx                # Main page (assembles all sections)
│   ├── globals.css             # Tailwind + custom styles
│   └── api/waitlist/
│       └── route.ts            # POST endpoint for waitlist
├── components/
│   ├── Navigation.tsx          # Fixed header with logo & nav
│   ├── Hero.tsx                # Hero section
│   ├── HowItWorks.tsx          # 4-step process
│   ├── Features.tsx            # Feature grid
│   ├── ForClinics.tsx          # Benefits & use cases
│   ├── Security.tsx            # Security features
│   ├── FAQ.tsx                 # Accordion FAQ
│   └── WaitlistForm.tsx        # Form with validation
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── validations.ts          # Zod schemas
└── public/
    └── logo.png                # Maddy logo
```

## 🎨 Brand Colors in Code

```typescript
// Primary
'maddy-blue': '#1B5CFF'
'clinical-white': '#FFFFFF'
'ink-charcoal': '#111418'

// Secondary
'eucalyptus-green': '#2FA680'
'soft-sky': '#E8F0FF'
'warm-sand': '#F8EACC'

// Status
'urgent-red': '#FF4D4F'
'success-green': '#1FB57A'
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

### Other Options

- Netlify
- AWS Amplify
- Any platform supporting Next.js

## 📊 Viewing Submissions

To view waitlist submissions, go to your Supabase dashboard:

1. Select your project
2. Go to **Table Editor** > **waitlist**
3. View all submissions with timestamps

## 🔒 Security Features

- ✅ Honeypot spam protection (hidden `website` field)
- ✅ Server-side validation with Zod
- ✅ Supabase Row Level Security enabled
- ✅ No PHI collected (only clinic contact info)
- ✅ Environment variables for credentials

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Next Steps

1. **Set up your Supabase project** and add credentials
2. **Test the form** locally to ensure it works
3. **Deploy to Vercel** for hosting
4. **Share the URL** with potential customers
5. **Monitor submissions** in Supabase dashboard

## 🎯 Features to Add Later

- Admin dashboard to view/manage waitlist
- Email notifications when someone joins
- Export waitlist to CSV
- Priority scoring based on PMS choice
- Integration with email marketing tools

---

Built with Next.js 15, TypeScript, TailwindCSS, and Supabase.
