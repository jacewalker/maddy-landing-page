'use client'

import { useState } from 'react'
import LeadCaptureModal from './LeadCaptureModal'

export default function Pricing() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section id="pricing" className="py-24 bg-surface-grey">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-maddy-dark mb-6">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        No contracts, no setup fees. Just a simple monthly subscription that pays for itself.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Starter Plan */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative">
                        <h3 className="text-xl font-bold text-maddy-dark mb-2">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-maddy-dark">$199</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <p className="text-gray-500 mb-8 text-sm">Perfect for solo practitioners just getting started.</p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Up to 100 calls/mo
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                24/7 Answering
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Basic Cliniko Integration
                            </li>
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3 px-4 bg-surface-grey text-maddy-dark font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Join Waitlist
                        </button>
                    </div>

                    {/* Growth Plan */}
                    <div className="bg-maddy-dark rounded-3xl p-8 shadow-xl border border-maddy-blue/20 relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-maddy-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            Most Popular
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">$399</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <p className="text-gray-400 mb-8 text-sm">For busy clinics growing fast.</p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-200">
                                <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Up to 300 calls/mo
                            </li>
                            <li className="flex items-center gap-3 text-gray-200">
                                <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Full Calendar Integration
                            </li>
                            <li className="flex items-center gap-3 text-gray-200">
                                <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Urgent Call Escalation
                            </li>
                            <li className="flex items-center gap-3 text-gray-200">
                                <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                SMS Confirmations
                            </li>
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3 px-4 bg-maddy-blue text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-maddy-blue/25"
                        >
                            Join Waitlist
                        </button>
                    </div>

                    {/* Scale Plan */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative">
                        <h3 className="text-xl font-bold text-maddy-dark mb-2">Scale</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-maddy-dark">$699</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <p className="text-gray-500 mb-8 text-sm">For multi-practitioner clinics.</p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Unlimited calls
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Priority Support
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Custom Voice & Scripting
                            </li>
                        </ul>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3 px-4 bg-surface-grey text-maddy-dark font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Join Waitlist
                        </button>
                    </div>
                </div>
            </div>
            <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
