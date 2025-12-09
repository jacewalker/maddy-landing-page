export default function LiveDemo() {
    return (
        <section className="relative py-12 bg-gradient-to-r from-maddy-blue to-accent-purple overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold mb-4 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Live Demo Online
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Don't just take our word for it. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                                Talk to Maddy right now.
                            </span>
                        </h2>
                        <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
                            Skip the form. Call our demo line to hear Maddy in action. She'll answer your questions and secure your waitlist spot instantly.
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <a
                            href="tel:+61390072450"
                            className="group relative flex items-center gap-4 bg-white text-maddy-blue px-8 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 bg-maddy-blue/10 rounded-full flex items-center justify-center group-hover:bg-maddy-blue group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Call Maddy</span>
                                <span className="font-display">(03) 9007 2450</span>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                                Try it!
                            </div>
                        </a>
                        <p className="text-center text-blue-200 text-sm mt-3">
                            Standard call rates apply
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
