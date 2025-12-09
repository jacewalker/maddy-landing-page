'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LeadCaptureModal from './LeadCaptureModal'

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-clinical-white/95 backdrop-blur-sm border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Maddy Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-extrabold text-ink-charcoal">Maddy</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-ink-charcoal hover:text-maddy-blue transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-ink-charcoal hover:text-maddy-blue transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-ink-charcoal hover:text-maddy-blue transition-colors">
                Pricing
              </Link>
              <Link href="#security" className="text-ink-charcoal hover:text-maddy-blue transition-colors">
                Security
              </Link>
              <Link href="#faq" className="text-ink-charcoal hover:text-maddy-blue transition-colors">
                FAQ
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-maddy-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-maddy-blue text-white rounded-lg font-medium text-sm"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>
      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
