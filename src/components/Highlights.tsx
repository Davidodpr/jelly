import ScrollReveal from './ScrollReveal';

const cases = [
  {
    tag: 'Moving Portal',
    title: "Wait, We're Profitable Now?",
    setup: "5M EUR in revenue sounds nice until you're losing 150K/month. They were doing everything for everyone—and drowning in it.",
    move: "We figured out which lead sources actually paid the bills, ditched the rest, and made their outreach feel like a human wrote it. (Because one did. Sort of.)",
    results: [
      '750K EUR/month (yeah, really)',
      'Profitable in under 12 months',
      'No new funding. Just focus.',
    ],
    quote: 'In less than a year, we went from surviving to dominating.',
  },
  {
    tag: 'Solar Panels',
    title: "Your Best Leads Were Already in the CRM",
    setup: "Chasing new customers is expensive. Meanwhile, their existing customer base was just sitting there—forgotten and ignored.",
    move: "We dusted off the CRM and started talking to people who already knew them. Turns out they wanted to buy more.",
    results: [
      'CAC down 30%',
      'Revenue up 40% in 6 months',
      'Happier customers (who knew?)',
    ],
    quote: 'We were looking everywhere except where the money already was.',
  },
];

const Highlights = () => {
  return (
    <section id="highlights" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#0891b2]">
              Humble Brag
            </p>
            <h2 className="mt-4 text-4xl font-bold text-gray-900">Not luck. Court vision.</h2>
            <p className="mt-3 text-lg text-gray-600">See what happens when you move first.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cases.map((caseItem, index) => (
            <ScrollReveal key={caseItem.title} delay={100 + index * 100}>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg hover-jelly hover:border-[#00f5ff]/40">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b]" />

                <p className="text-xs uppercase tracking-[0.2em] text-[#ff006e] mb-2 font-bold">
                  {caseItem.tag}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {caseItem.title}
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-[#0891b2] font-bold mb-1 uppercase tracking-wider text-xs">THE SETUP</p>
                    <p className="text-gray-600">{caseItem.setup}</p>
                  </div>

                  <div>
                    <p className="text-[#0891b2] font-bold mb-1 uppercase tracking-wider text-xs">THE MOVE</p>
                    <p className="text-gray-600">{caseItem.move}</p>
                  </div>

                  <div>
                    <p className="text-[#0891b2] font-bold mb-1 uppercase tracking-wider text-xs">THE RESULT</p>
                    <ul className="space-y-1">
                      {caseItem.results.map((result) => (
                        <li key={result} className="text-gray-600 font-medium">
                          <span className="text-[#ffbe0b] mr-2">→</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm italic text-gray-500">
                    &ldquo;{caseItem.quote}&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
