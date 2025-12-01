import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    clinicName: z.string().min(2, 'Clinic name is required'),
    software: z.string().min(2, 'Practice software is required'),
})

type FormData = z.infer<typeof formSchema>

interface LeadCaptureModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const selectedSoftware = watch('software')

    useEffect(() => {
        register('software')
    }, [register])

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit')
            }

            setIsSuccess(true)
            reset()
        } catch (error) {
            console.error('Submission error:', error)
            alert('Failed to submit. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
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
                                Thanks for your interest in Maddy. We'll be in touch shortly to schedule your demo.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 bg-maddy-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Early Access</h2>
                                <p className="text-gray-600">
                                    Join the waitlist and see how Maddy can transform your clinic.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full px-4 py-3 text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-maddy-blue focus:border-transparent transition-all outline-none flex justify-between items-center group hover:border-maddy-blue"
                                        >
                                            <span className={!selectedSoftware ? "text-gray-500" : "text-gray-900"}>
                                                {selectedSoftware || "Select software..."}
                                            </span>
                                            <svg className={`w-5 h-5 text-gray-400 group-hover:text-maddy-blue transition-colors transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-fade-in">
                                                {['Cliniko', 'Halaxy', 'Nookal', 'Power Diary', 'Jane App', 'Other'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => {
                                                            setValue('software', option, { shouldValidate: true })
                                                            setIsDropdownOpen(false)
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-6 bg-maddy-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-lg shadow-blue-500/30"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Request Access'
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
