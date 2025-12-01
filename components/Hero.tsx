'use client'

import { useState } from 'react'
import Image from 'next/image'
import LeadCaptureModal from './LeadCaptureModal'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden bg-maddy-dark pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-maddy-blue/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maddy-blue/10 border border-maddy-blue/20 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent-teal animate-pulse"></span>
              <span className="text-sm font-medium text-blue-200 tracking-wide">
                Built for Australian Allied Health
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
              The AI Receptionist <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-maddy-blue to-accent-teal">
                That Never Sleeps
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
              Capture every lead, book every appointment, and free your staff from the phone.
              Seamlessly integrated with Cliniko, Halaxy, and Nookal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-maddy-blue text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-maddy-blue/25"
              >
                Get Early Access
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                See How It Works
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">24/7 Availability</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">99% Accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">Instant Setup</span>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] w-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract UI Representation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-maddy-blue/20 to-accent-teal/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                {/* Mock Chat Interface */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-maddy-blue flex items-center justify-center text-xs font-bold text-white">M</div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-gray-200 max-w-[80%]">
                      Hi! Thanks for calling Bayside Physio. I can help you book an appointment or answer any questions. How can I help?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-accent-teal flex items-center justify-center text-xs font-bold text-white">P</div>
                    <div className="bg-maddy-blue/20 rounded-2xl rounded-tr-none p-4 text-sm text-white max-w-[80%]">
                      I'd like to book a physio appointment for next Tuesday morning please.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-maddy-blue flex items-center justify-center text-xs font-bold text-white">M</div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-gray-200 max-w-[80%]">
                      I have an opening at 9:30 AM or 11:00 AM on Tuesday. Which works better for you?
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white text-maddy-dark p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</div>
                    <div className="font-bold">Appointment Booked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
