export default function FAQ() {
  const faqs = [
    {
      question: "Does Maddy integrate with my practice software?",
      answer: "Yes! Maddy integrates seamlessly with Cliniko, Halaxy, Nookal, and Power Diary. She can read your calendar in real-time and book appointments directly."
    },
    {
      question: "Is patient data secure?",
      answer: "Absolutely. All data is hosted in Australia and encrypted at rest and in transit. We are fully compliant with Australian Privacy Principles and do not use patient data to train our models."
    },
    {
      question: "What happens if Maddy can't answer a question?",
      answer: "If Maddy encounters a complex medical query or an emergency, she can escalate the call to your staff or take a detailed message and flag it as urgent in your system."
    },
    {
      question: "Can I customise Maddy's voice and greeting?",
      answer: "Yes, you can choose from several Australian voices and fully customise the greeting script to match your clinic's tone and branding."
    }
  ]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-maddy-dark mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-8 last:border-0">
              <h3 className="text-xl font-bold text-maddy-dark mb-3">{faq.question}</h3>
              <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
