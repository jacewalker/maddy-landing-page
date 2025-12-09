import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number is required'),
    clinicName: z.string().min(2, 'Clinic name is required'),
    software: z.string().min(2, 'Practice software is required'),
    practitionerCount: z.string().min(1, 'Please select practitioner count'),
    topFeatures: z.array(z.string()).min(1, 'Please select at least one feature'),
    biggestChallenge: z.string().min(1, 'Please select your biggest challenge'),
    interestedPlan: z.string().optional(),
})

const planOptions = [
    'Starter ($349/month)',
    'Pro ($690/month)',
    'Unlimited Plus ($1,150/month)',
    'Enterprise (Custom)',
    'Not sure yet',
]

type FormData = z.infer<typeof formSchema>

interface LeadCaptureModalProps {
    isOpen: boolean
    onClose: () => void
}

const featureOptions = [
    '24/7 call answering',
    'Appointment booking & rescheduling',
    'Continuity of care (same practitioner)',
    'Urgent case escalation',
    'Outbound reminders & follow-ups',
    'Outbound calling to reschedule appointments',
    'Patient intake & notes',
    'After-hours coverage only',
]

const challengeOptions = [
    'Missing calls during busy periods',
    'High reception staff costs',
    'After-hours call coverage',
    'Patient no-shows',
    'Staff spending too much time on phones',
    'Difficulty scaling with growth',
]

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [step, setStep] = useState(1)
    const { executeRecaptcha } = useGoogleReCaptcha()

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topFeatures: [],
        },
    })

    const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false)
    const [isPractitionerDropdownOpen, setIsPractitionerDropdownOpen] = useState(false)
    const [isChallengeDropdownOpen, setIsChallengeDropdownOpen] = useState(false)
    const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false)
    const selectedSoftware = watch('software')
    const selectedPractitionerCount = watch('practitionerCount')
    const selectedFeatures = watch('topFeatures') || []
    const selectedChallenge = watch('biggestChallenge')
    const selectedPlan = watch('interestedPlan')

    useEffect(() => {
        register('software')
        register('practitionerCount')
        register('topFeatures')
        register('biggestChallenge')
        register('interestedPlan')
    }, [register])

    const handleNext = async () => {
        const fieldsToValidate = step === 1
            ? ['name', 'email', 'clinicName', 'software', 'practitionerCount'] as const
            : ['topFeatures', 'biggestChallenge'] as const

        const isValid = await trigger(fieldsToValidate)
        if (isValid) {
            setStep(2)
        }
    }

    const toggleFeature = (feature: string) => {
        const current = selectedFeatures || []
        if (current.includes(feature)) {
            setValue('topFeatures', current.filter(f => f !== feature), { shouldValidate: true })
        } else {
            setValue('topFeatures', [...current, feature], { shouldValidate: true })
        }
    }

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            // Get reCAPTCHA token
            let recaptchaToken = ''
            if (executeRecaptcha) {
                recaptchaToken = await executeRecaptcha('waitlist_submit')
            }

            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, recaptchaToken }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit')
            }

            setIsSuccess(true)
            reset()
            setStep(1)
        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to submit. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setStep(1)
        setIsSuccess(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up max-h-[95vh] min-h-[600px] overflow-visible">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8">
                    {isSuccess ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                            <p className="text-gray-600 mb-6">
                                Thanks for your interest in Maddy. We'll be in touch as we get closer to launch in 2026.
                            </p>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 px-4 bg-maddy-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <div className="inline-block px-3 py-1 bg-accent-teal/10 text-accent-teal text-sm font-medium rounded-full mb-3">
                                    Coming 2026
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Early Access</h2>
                                <p className="text-gray-600 text-sm">
                                    Join the waitlist and help us build the features you need most.
                                </p>
                            </div>

                            {/* Progress indicator */}
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-maddy-blue' : 'bg-gray-300'}`} />
                                <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-maddy-blue' : 'bg-gray-300'}`} />
                                <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-maddy-blue' : 'bg-gray-300'}`} />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {step === 1 ? (
                                    <>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                {...register('name')}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none"
                                                placeholder="Dr. Sarah Smith"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Work Email
                                            </label>
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none"
                                                placeholder="sarah@clinic.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                {...register('phone')}
                                                type="tel"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none"
                                                placeholder="04XX XXX XXX"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Clinic Name
                                            </label>
                                            <input
                                                {...register('clinicName')}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none"
                                                placeholder="Bayside Physio"
                                            />
                                            {errors.clinicName && (
                                                <p className="mt-1 text-sm text-red-500">{errors.clinicName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="software" className="block text-sm font-medium text-gray-700 mb-1">
                                                Practice Management Software
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)}
                                                    className="w-full px-4 py-3 text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none flex justify-between items-center group hover:border-maddy-blue"
                                                >
                                                    <span className={!selectedSoftware ? "text-gray-500" : "text-gray-900"}>
                                                        {selectedSoftware || "Select software..."}
                                                    </span>
                                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-maddy-blue transition-colors transform ${isSoftwareDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isSoftwareDropdownOpen && (
                                                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-fade-in">
                                                        {['Cliniko', 'Halaxy', 'Nookal', 'Jane App', 'Other'].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('software', option, { shouldValidate: true })
                                                                    setIsSoftwareDropdownOpen(false)
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-maddy-blue transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between group"
                                                            >
                                                                {option}
                                                                {selectedSoftware === option && (
                                                                    <svg className="w-4 h-4 text-maddy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.software && (
                                                <p className="mt-1 text-sm text-red-500">{errors.software.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="practitionerCount" className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Practitioners
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsPractitionerDropdownOpen(!isPractitionerDropdownOpen)}
                                                    className="w-full px-4 py-3 text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none flex justify-between items-center group hover:border-maddy-blue"
                                                >
                                                    <span className={!selectedPractitionerCount ? "text-gray-500" : "text-gray-900"}>
                                                        {selectedPractitionerCount || "Select..."}
                                                    </span>
                                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-maddy-blue transition-colors transform ${isPractitionerDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isPractitionerDropdownOpen && (
                                                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-fade-in">
                                                        {['1 (Solo)', '2-3', '4-8', '9-15', '16+'].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('practitionerCount', option, { shouldValidate: true })
                                                                    setIsPractitionerDropdownOpen(false)
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-maddy-blue transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between group"
                                                            >
                                                                {option}
                                                                {selectedPractitionerCount === option && (
                                                                    <svg className="w-4 h-4 text-maddy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.practitionerCount && (
                                                <p className="mt-1 text-sm text-red-500">{errors.practitionerCount.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="w-full py-4 px-6 bg-maddy-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] mt-6 shadow-lg shadow-blue-500/30"
                                        >
                                            Next
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Which features are most important to you? <span className="text-gray-500">(Select all that apply)</span>
                                            </label>
                                            <div className="space-y-2">
                                                {featureOptions.map((feature) => (
                                                    <button
                                                        key={feature}
                                                        type="button"
                                                        onClick={() => toggleFeature(feature)}
                                                        className={`w-full px-4 py-3 text-left rounded-lg border transition-all flex items-center justify-between ${
                                                            selectedFeatures.includes(feature)
                                                                ? 'border-maddy-blue bg-maddy-blue/5 text-maddy-blue'
                                                                : 'border-gray-300 hover:border-maddy-blue'
                                                        }`}
                                                    >
                                                        <span className="text-sm">{feature}</span>
                                                        {selectedFeatures.includes(feature) && (
                                                            <svg className="w-5 h-5 text-maddy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                            {errors.topFeatures && (
                                                <p className="mt-1 text-sm text-red-500">{errors.topFeatures.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                What's your biggest phone challenge?
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsChallengeDropdownOpen(!isChallengeDropdownOpen)}
                                                    className="w-full px-4 py-3 text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none flex justify-between items-center group hover:border-maddy-blue"
                                                >
                                                    <span className={!selectedChallenge ? "text-gray-500" : "text-gray-900 text-sm"}>
                                                        {selectedChallenge || "Select your biggest challenge..."}
                                                    </span>
                                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-maddy-blue transition-colors transform ${isChallengeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isChallengeDropdownOpen && (
                                                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-fade-in">
                                                        {challengeOptions.map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('biggestChallenge', option, { shouldValidate: true })
                                                                    setIsChallengeDropdownOpen(false)
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-maddy-blue transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between group text-sm"
                                                            >
                                                                {option}
                                                                {selectedChallenge === option && (
                                                                    <svg className="w-4 h-4 text-maddy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.biggestChallenge && (
                                                <p className="mt-1 text-sm text-red-500">{errors.biggestChallenge.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Which plan interests you? <span className="text-gray-400">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                                                    className="w-full px-4 py-3 text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none flex justify-between items-center group hover:border-maddy-blue"
                                                >
                                                    <span className={!selectedPlan ? "text-gray-500" : "text-gray-900 text-sm"}>
                                                        {selectedPlan || "Select a plan..."}
                                                    </span>
                                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-maddy-blue transition-colors transform ${isPlanDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isPlanDropdownOpen && (
                                                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-fade-in">
                                                        {planOptions.map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('interestedPlan', option)
                                                                    setIsPlanDropdownOpen(false)
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-maddy-blue transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between group text-sm"
                                                            >
                                                                {option}
                                                                {selectedPlan === option && (
                                                                    <svg className="w-4 h-4 text-maddy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-all"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 py-4 px-6 bg-maddy-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        ...
                                                    </span>
                                                ) : (
                                                    'Join Waitlist'
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
