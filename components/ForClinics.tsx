export default function ForClinics() {
  const benefits = [
    {
      title: 'Save on Reception Costs',
      description: 'A full-time receptionist costs $50-70k per year. Maddy handles unlimited calls for a fraction of the cost, with zero sick days or holidays.',
      metric: 'Save $50k+/yr',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '100% Call Answer Rate',
      description: "Never send patients to voicemail again. Every call is answered immediately, even during busy periods, lunch breaks, or after hours.",
      metric: '0 Missed Calls',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: 'More Bookings',
      description: 'Instant availability lookups and immediate booking means patients get appointments faster, reducing drop-offs and filling your calendar.',
      metric: '+20% Revenue',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ]

  const useCases = [
    {
      type: 'Solo Practitioners',
      description: "You're treating patients back-to-back. Let Maddy handle calls while you focus on care.",
      fit: 'Perfect for',
    },
    {
      type: 'Small Clinics',
      description: '2-5 practitioners sharing reception duties? Maddy eliminates interruptions and streamlines bookings.',
      fit: 'Ideal for',
    },
    {
      type: 'Multi-Site Practices',
      description: 'Manage bookings across multiple locations from a single AI receptionist.',
      fit: 'Great for',
    },
  ]

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-maddy-dark mb-6">
            Why Clinics Choose Maddy
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Whether you're a solo practitioner or a multi-site practice, Maddy saves you time and money while improving patient experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl bg-surface-grey border border-gray-100 overflow-hidden group hover:bg-maddy-blue transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-maddy-blue mb-6 shadow-sm group-hover:text-maddy-blue">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-maddy-dark mb-4 group-hover:text-white transition-colors">{benefit.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed group-hover:text-blue-100 transition-colors">{benefit.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-maddy-blue shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {benefit.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-maddy-dark rounded-3xl p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-maddy-blue/20 to-accent-purple/20" />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />

          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold text-white mb-12 text-center">
              Tailored for Your Practice Size
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-sm font-bold text-accent-teal mb-3 uppercase tracking-wider">{useCase.fit}</div>
                  <h4 className="text-xl font-bold text-white mb-4">{useCase.type}</h4>
                  <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
