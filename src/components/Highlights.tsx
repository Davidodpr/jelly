import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    tag: 'Coaching',
    icon: '🧠',
    name: "Johannes L.",
    role: "Executive Coach",
    title: "Personal Connection at Scale",
    quote: "I thought automation meant sounding like a robot. Jellymove proved me wrong. We started showing real care for potential clients through personal—but automated—outreach. The difference was night and day.",
    results: [
      '3x Discovery Calls',
      '100% Automated Follow-up',
      'Zero "Salesy" Vibes',
    ],
  },
  {
    tag: 'D2C / E-com',
    icon: '🐶',
    name: "Augusto D.",
    role: "Founder",
    title: "Puppy Love at Scale",
    quote: "Dog owners can smell 'fake' a mile away. We used Jellymove to check in on customers' pets by name. It sounds crazy, but people reply thanking us. Retention is through the roof.",
    results: [
      'Retention up 40%',
      'LTV Doubled',
      'Viral Word-of-Mouth',
    ],
  },
  {
    tag: 'Premium B2B',
    icon: '👑',
    name: "Ludwig H.",
    role: "Head of Sales",
    title: "Selling the Throne",
    quote: "We sell the most expensive toilets in the Nordics. You don't cold call architects about that. Jellymove helped us start conversations about 'design language' instead. Now we're in every major hotel project.",
    results: [
      '3 Major Hotel Deals',
      'Avg Deal: €50k+',
      '100% Response Rate',
    ],
  },
  {
    tag: 'SaaS',
    icon: '🚀',
    name: "Sarah M.",
    role: "VP of Sales",
    title: "Cutting Through the Noise",
    quote: "Our SDRs were burning out writing custom emails. Jellymove gave us a playbook that feels 100% human but runs on autopilot. We booked more demos in Q4 than the rest of the year combined.",
    results: [
      '20% Reply Rate',
      'Record Pipeline Growth',
      'SDR Burnout: Gone',
    ],
  },
];

const Highlights = () => {
  return (
    <section id="highlights" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0891b2]">
              The Results
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Don&apos;t just take our word for it.
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              See how different industries are using Jellymove to change the game.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} delay={100 + index * 100}>
              <div className="h-full bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <div className="text-4xl">{item.icon}</div>
                </div>

                <blockquote className="text-lg text-gray-600 italic mb-8 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="space-y-6">
                  <div>
                    <p className="text-[#0891b2] font-bold mb-3 uppercase tracking-wider text-xs">The Impact</p>
                    <div className="flex flex-wrap gap-2">
                      {item.results.map((result, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-sm font-bold border border-cyan-100">
                          <span className="mr-2 text-[#00f5ff]">⚡</span>
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 italic max-w-lg mx-auto">
              <span className="font-bold text-gray-500 not-italic">🔒 Client Confidentiality:</span> We don&apos;t name-drop our clients publicly (it&apos;s part of the secret sauce). Specific references available upon request during discovery.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Highlights;
