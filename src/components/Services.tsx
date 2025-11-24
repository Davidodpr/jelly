import ScrollReveal from './ScrollReveal';

const services = [
  {
    title: 'The Steal',
    description: "Your next customer is clicking through someone else's app right now. Moving platforms, insurance portals, partner ecosystems—we find them there and put you in front of them. Before they even think about searching. That's not luck. That's court vision."
  },
  {
    title: 'The Playbook',
    description: "We test stuff. Keep what works. Quietly delete what doesn't. No ego, no attachment—just results. Your plays get sharper every week while your competitors are still running last year's offense."
  },
  {
    title: 'Transition Game',
    description: "Your ideal customer is already on the move—switching platforms, changing providers, ready to buy. We get you the ball at the exact moment they're open. Fast break, easy bucket. Game over."
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-amber-600">
              The playbook
            </p>
            <h2 className="mt-4 text-4xl font-bold text-gray-900">Three plays to get you to the rim</h2>
            <p className="mt-3 text-lg text-[#0891b2] font-medium">Creative moves that defenders can&apos;t predict.</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={100 + index * 100}>
              <div
                className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover-jelly hover:border-[#00f5ff]/40 ${index === 0 ? 'md:-translate-y-2' :
                  index === 1 ? 'md:translate-y-3' :
                    'md:translate-y-0'
                  } ${index === 1 ? 'md:rotate-[0.5deg]' : index === 2 ? 'md:-rotate-[0.5deg]' : ''}`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b]" />
                <div className="mb-4 text-sm uppercase tracking-[0.2em] text-gray-400 font-bold">
                  <span>0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
