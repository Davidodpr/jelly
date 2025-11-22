import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Highlights from '@/components/Highlights';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-10 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[120px]" />
        <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px]" />
        <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>
      <Hero />
      <About />
      <Services />
      <Highlights />
      <Contact />
    </main>
  );
}
