import ScrollReveal from './ScrollReveal';

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28 bg-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#ff006e]/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-[#00f5ff]/10 blur-[130px]" />
      </div>
      <div className="container relative mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-[#0891b2]">
              Read the defense. Adjust mid-air. Finish with flair.
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">A jelly layup isn&apos;t about force.</h2>
            <h3 className="mt-3 text-2xl text-[#ff006e] font-semibold">It&apos;s about flow.</h3>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ScrollReveal delay={100}>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover-jelly hover:border-[#00f5ff]/40 md:-translate-y-2">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b]" />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Read the defense</h4>
              <p className="text-xs text-[#0891b2] font-bold mb-3">Know your market</p>
              <p className="text-sm text-gray-600">We see the passing lanes they don&apos;t. AI that finds openings before your competition even laces up.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover-jelly hover:border-[#00f5ff]/40 md:translate-y-3 md:rotate-[0.5deg]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b]" />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Adjust mid-air</h4>
              <p className="text-xs text-[#0891b2] font-bold mb-3">Test fast</p>
              <p className="text-sm text-gray-600">Shot clock&apos;s running. We test plays in days, not quarters. Your competition won&apos;t know what hit them.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg hover-jelly hover:border-[#00f5ff]/40 md:-rotate-[0.5deg]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#ffbe0b]" />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Finish smooth</h4>
              <p className="text-xs text-[#0891b2] font-bold mb-3">Close deals</p>
              <p className="text-sm text-gray-600">No clanking off the rim. AI outreach that sounds like you wrote it—because you&apos;re too busy closing to type.</p>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={400}>
          <div className="mt-10 text-lg text-gray-600 space-y-4 max-w-4xl mx-auto">
            <p>
              Most sales playbooks were written by someone who&apos;s never had to drive to the rim with a defender on their hip. Jellymove is different. We build moves that read the defense, adjust mid-air, and finish smooth—every time.
            </p>
            <p>
              That&apos;s the <span className="gradient-text font-semibold">jelly</span>. Creative. Unpredictable. Impossible to defend. And it makes scoring look effortless.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
