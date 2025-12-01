export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connects to Your Phone',
      description: "Simply forward your clinic's calls to your dedicated Maddy number. She answers immediately with your custom greeting.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Understands the Patient',
      description: "Maddy listens to the patient's request, identifying if they need an appointment, have a question, or have an urgent issue.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Checks Your Calendar',
      description: "She instantly checks your Cliniko/Halaxy calendar for availability, respecting your practitioner preferences and appointment types.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Books & Notifies',
      description: "The appointment is booked directly into your software. You get a notification, and the patient gets a confirmation SMS.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-surface-grey relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-maddy-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-maddy-dark mb-6">
            How Maddy Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Seamless integration with your existing workflow. No new software to learn.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-maddy-blue/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative z-10 h-full hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-maddy-blue text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-maddy-blue/20 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl font-display font-bold text-gray-100 -z-10 group-hover:text-maddy-blue/10 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-maddy-dark mb-4">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
