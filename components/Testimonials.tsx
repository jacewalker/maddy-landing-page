export default function Testimonials() {
    return (
        <section className="py-24 bg-maddy-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                        Trusted by Australian Clinics
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Join the growing number of Allied Health practices reclaiming their time with Maddy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex gap-1 text-yellow-400 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            "Since installing Maddy, our missed calls have dropped to zero. Patients love that they can book instantly, and my reception team can focus on the people in the waiting room."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-maddy-blue flex items-center justify-center text-white font-bold">
                                JD
                            </div>
                            <div>
                                <div className="font-bold text-white">James D.</div>
                                <div className="text-sm text-gray-400">Practice Owner, Melbourne Physio</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex gap-1 text-yellow-400 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            "The integration with Cliniko is seamless. It's like having a receptionist who knows exactly how I like my calendar managed. Highly recommend."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent-teal flex items-center justify-center text-white font-bold">
                                SL
                            </div>
                            <div>
                                <div className="font-bold text-white">Sarah L.</div>
                                <div className="text-sm text-gray-400">Osteopath, Sydney</div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex gap-1 text-yellow-400 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            "I was worried about an AI answering calls, but the voice is so natural most patients don't even realise. It's been a game changer for my solo practice."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent-purple flex items-center justify-center text-white font-bold">
                                MR
                            </div>
                            <div>
                                <div className="font-bold text-white">Michael R.</div>
                                <div className="text-sm text-gray-400">Chiropractor, Brisbane</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
