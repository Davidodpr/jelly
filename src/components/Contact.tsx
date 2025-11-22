import ScrollReveal from './ScrollReveal';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#ff006e]/20 via-purple-900/40 to-[#00f5ff]/20 p-10 md:p-16 text-center shadow-2xl backdrop-blur">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What&apos;s your move?
          </h2>
          <p className="mt-4 text-lg text-gray-100">
            Tell me what you sell. I&apos;ll send back three plays to run.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="mailto:hi@jellymove.com"
              className="group relative inline-block"
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#ff006e]/20 to-[#00f5ff]/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
              <span className="relative text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff006e] to-[#00f5ff] bg-clip-text text-transparent group-hover:from-[#00f5ff] group-hover:to-[#ff006e] transition-all duration-300">
                hi@jellymove.com
              </span>
            </a>
            <p className="text-xs text-white/50">
              Inbox open. Excuses closed.
            </p>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;
