import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Maddy - AI Virtual Receptionist for Australian Allied Health',
  description: "Your clinic's receptionist that never misses a call. AI-powered reception for Australian Allied Health practices.",
  keywords: ['AI receptionist', 'Allied Health', 'Australia', 'Cliniko', 'practice management', 'virtual receptionist'],
}

import MouseGlow from '@/components/MouseGlow'
import RecaptchaProvider from '@/components/RecaptchaProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-surface-white text-text-primary relative">
        <RecaptchaProvider>
          <MouseGlow />
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
        <footer className="bg-ink-charcoal text-white py-12 mt-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-extrabold mb-4">Maddy</h3>
                <p className="text-gray-300">
                  AI-powered virtual receptionist for Australian Allied Health practices.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Data & Privacy</h4>
                <p className="text-gray-300 text-sm">
                  All data hosted in Australia. Compliant with Australian Privacy Principles.
                  No training on patient data.
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Maddy Virtual Receptionist. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </RecaptchaProvider>
      </body>
    </html>
  )
}
