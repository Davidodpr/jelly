"use client";

import { motion } from "framer-motion";
import JellyButton from "./JellyButton";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 text-gray-900 overflow-hidden">
      {/* Watercolor rainbow background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/rainbow-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#00f5ff]"
        >
          <motion.span
            whileHover={{ y: -5 }}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm cursor-default text-gray-600"
          >
            Crafted plays
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <div className="relative rounded-3xl border border-white/30 bg-white/70 p-12 md:p-20 shadow-xl backdrop-blur-xl overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase text-gray-400 mix-blend-multiply">
                The game moved.
              </h1>
            </motion.div>

            <div className="relative mt-4">
              <motion.p
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="text-7xl md:text-9xl font-black leading-none tracking-tight text-gray-900"
              >
                You <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e]">didn&apos;t.</span>
              </motion.p>
              
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto"
            >
              Creative plays that intercept customers mid-move. Nothing but net.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <JellyButton
                href="#audit-section"
                className="rounded-full bg-gray-900 px-10 py-5 text-lg font-black text-white shadow-2xl transition hover:scale-105 hover:bg-black active:scale-95 flex items-center gap-3"
              >
                Game Film Review <span className="text-[#00f5ff]">→</span>
              </JellyButton>
              
              <span className="text-sm font-medium text-gray-500">
                We don&apos;t have a waitlist. We have standards.
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-12 text-xs font-bold text-gray-400 tracking-[0.2em] uppercase"
            >
              Built by people who close deals.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-2 text-xs text-gray-500"
        >
          {["Finish smooth", "Can't predict, can't defend", "Score in the paint", "All flair, no fluff"].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + (i * 0.1) }}
              whileHover={{ scale: 1.1, rotate: (i % 2 === 0 ? 2 : -2) }}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 cursor-default shadow-sm"
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-[#00f5ff] transition-colors"
        aria-label="Scroll to content"
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.a>
    </section>
  );
};

export default Hero;
