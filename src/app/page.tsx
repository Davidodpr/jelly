import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Highlights from '@/components/Highlights';
import Contact from '@/components/Contact';
import AuditSection from "@/components/AuditSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Hero />
      <AuditSection />
      <Services />
      <Highlights />
      <About />
      <Contact />
    </main>
  );
}
