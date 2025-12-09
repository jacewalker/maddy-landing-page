export default function Problem() {
  const stats = [
    {
      stat: '20–45%',
      description: 'of calls go unanswered during busy periods',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.28 3H5z" />
        </svg>
      ),
    },
    {
      stat: '$70k–$110k',
      description: 'spent annually on reception salaries',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      stat: '$150–$400',
      description: 'lost per missed appointment',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      stat: '3 rings',
      description: 'is all it takes to lose a new patient',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-maddy-dark mb-4">
            The Hidden Cost of Missed Calls
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Across Australia, allied health clinics are losing patients and revenue every day to unanswered phones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="relative bg-surface-grey rounded-2xl p-6 border border-gray-100 hover:border-maddy-blue/20 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-100 transition-colors">
                {item.icon}
              </div>
              <div className="text-3xl font-display font-bold text-maddy-dark mb-2">
                {item.stat}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-maddy-dark font-medium">
            Maddy answers every call, 24/7 — so you never miss another opportunity.
          </p>
        </div>
      </div>
    </section>
  )
}
