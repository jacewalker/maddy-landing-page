'use client'

import { useState } from 'react'
import LeadCaptureModal from './LeadCaptureModal'

export default function Pricing() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const plans = [
        {
            name: 'Starter',
            price: '$349',
            period: '/month',
            description: 'Solo practitioners and small clinics',
            features: [
                'Up to 150 inbound calls per month',
                'Book, cancel, and reschedule appointments',
                'New patient intake',
                'Australian natural voice',
                'Standard clinic greeting',
                'Basic Cliniko notes',
            ],
            cta: 'Get Starter',
            popular: false,
            dark: false,
        },
        {
            name: 'Pro',
            price: '$690',
            period: '/month',
            description: 'Growing clinics with 3–8 practitioners',
            features: [
                'Up to 500 inbound calls per month',
                'Continuity of care (books with usual practitioner)',
                'Urgent escalation alerts',
                'Outbound reminder and follow-up calls',
                'Customisable greeting & script',
                'Detailed Cliniko notes',
                'Priority call handling',
            ],
            cta: 'Get Pro',
            popular: true,
            dark: true,
        },
        {
            name: 'Unlimited Plus',
            price: '$1,150',
            period: '/month',
            description: 'Large clinics and high-volume providers',
            features: [
                'Unlimited inbound calls',
                'All Pro features',
                'Sick-practitioner rebooking campaigns',
                'Analytics reporting',
                'Custom voice tuning',
                'Multi-clinic routing support',
                'Priority support SLA',
            ],
            cta: 'Get Unlimited Plus',
            popular: false,
            dark: false,
        },
        {
            name: 'Enterprise',
            price: 'From $2,500',
            period: '/month',
            description: 'Multi-site allied health groups',
            features: [
                'Custom workflows & integrations',
                'Halaxy and Nookal support',
                'Dedicated account manager',
                'Voice cloning',
                'SLA guarantees',
                'Custom reporting',
            ],
            cta: 'Talk to Sales',
            popular: false,
            dark: false,
        },
    ]

    const addOns = [
        {
            name: 'Custom Voice',
            price: '+$120/month',
            description: 'Use a fully branded voice created for your clinic.',
        },
        {
            name: 'After-Hours Only Mode',
            price: '$260/month',
            description: 'Have Maddy answer just your after-hours calls.',
        },
    ]

    const comparisonFeatures = [
        { feature: 'Inbound Calls', starter: '150', pro: '500', unlimited: 'Unlimited', enterprise: 'Unlimited' },
        { feature: 'Cliniko Booking', starter: true, pro: true, unlimited: true, enterprise: true },
        { feature: 'Continuity of Care', starter: false, pro: true, unlimited: true, enterprise: true },
        { feature: 'Urgent Escalation', starter: false, pro: true, unlimited: true, enterprise: true },
        { feature: 'Outbound Calls', starter: false, pro: true, unlimited: true, enterprise: 'Custom' },
        { feature: 'Custom Scripts', starter: 'Basic', pro: 'Advanced', unlimited: 'Advanced', enterprise: 'Fully Custom' },
        { feature: 'Analytics', starter: false, pro: true, unlimited: true, enterprise: true },
        { feature: 'Custom Voice', starter: 'Add-on', pro: 'Add-on', unlimited: true, enterprise: true },
        { feature: 'SLA', starter: false, pro: false, unlimited: false, enterprise: true },
    ]

    const renderCellValue = (value: boolean | string) => {
        if (value === true) {
            return (
                <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )
        }
        if (value === false) {
            return <span className="text-gray-400">–</span>
        }
        return <span className="text-gray-700 text-sm">{value}</span>
    }

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

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl p-8 shadow-sm border relative flex flex-col h-full ${
                                plan.dark
                                    ? 'bg-maddy-dark border-maddy-blue/20 shadow-xl transform lg:-translate-y-4'
                                    : 'bg-white border-gray-100 hover:shadow-xl transition-shadow'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-maddy-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className={`text-xl font-bold mb-2 ${plan.dark ? 'text-white' : 'text-maddy-dark'}`}>
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className={`text-3xl font-bold ${plan.dark ? 'text-white' : 'text-maddy-dark'}`}>
                                    {plan.price}
                                </span>
                                <span className={plan.dark ? 'text-gray-400' : 'text-gray-500'}>{plan.period}</span>
                            </div>
                            <p className={`mb-6 text-sm ${plan.dark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {plan.description}
                            </p>

                            <ul className="space-y-3 flex-grow">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className={`flex items-start gap-3 text-sm ${
                                            plan.dark ? 'text-gray-200' : 'text-gray-700'
                                        }`}
                                    >
                                        <svg
                                            className={`w-5 h-5 flex-shrink-0 ${
                                                plan.dark ? 'text-accent-teal' : 'text-green-500'
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className={`w-full py-3 px-4 font-bold rounded-xl transition-colors mt-8 ${
                                    plan.dark
                                        ? 'bg-maddy-blue text-white hover:bg-blue-600 shadow-lg shadow-maddy-blue/25'
                                        : 'bg-surface-grey text-maddy-dark hover:bg-gray-200'
                                }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add-Ons Section */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-maddy-dark text-center mb-8">Add-Ons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {addOns.map((addon, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-bold text-maddy-dark">{addon.name}</h4>
                                    <span className="text-maddy-blue font-bold text-sm whitespace-nowrap ml-2">
                                        {addon.price}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">{addon.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                <div>
                    <h3 className="text-2xl font-bold text-maddy-dark text-center mb-8">Compare Plans</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-4 px-6 font-bold text-maddy-dark">Feature</th>
                                    <th className="text-center py-4 px-4 font-bold text-maddy-dark">Starter</th>
                                    <th className="text-center py-4 px-4 font-bold text-maddy-blue">Pro</th>
                                    <th className="text-center py-4 px-4 font-bold text-maddy-dark">Unlimited Plus</th>
                                    <th className="text-center py-4 px-4 font-bold text-maddy-dark">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={index !== comparisonFeatures.length - 1 ? 'border-b border-gray-50' : ''}
                                    >
                                        <td className="py-4 px-6 text-gray-700 font-medium">{row.feature}</td>
                                        <td className="py-4 px-4 text-center">{renderCellValue(row.starter)}</td>
                                        <td className="py-4 px-4 text-center bg-maddy-blue/5">{renderCellValue(row.pro)}</td>
                                        <td className="py-4 px-4 text-center">{renderCellValue(row.unlimited)}</td>
                                        <td className="py-4 px-4 text-center">{renderCellValue(row.enterprise)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
