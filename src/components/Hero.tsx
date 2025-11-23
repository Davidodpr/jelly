"use client";

import { motion } from "framer-motion";
import JellyButton from "./JellyButton";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff006e]/10 via-[#0d0221] to-[#0d0221]" />

      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-96 h-96 bg-[#ff006e]/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#00f5ff]/20 rounded-full blur-[100px]"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#00f5ff]/90"
        >
          <motion.span
            whileHover={{ y: -5 }}
            className="rounded-full border border-[#ff006e]/40 bg-white/5 px-4 py-2 backdrop-blur cursor-default"
          >
            Sales plays, AI-powered
          </motion.span>
          <motion.span
            whileHover={{ y: -5 }}
            className="rounded-full border border-[#00f5ff]/40 bg-white/5 px-4 py-2 backdrop-blur cursor-default"
          >
            Outreach that actually sounds like you
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border-2 border-[#00f5ff]/30 bg-gradient-to-br from-[#00f5ff]/5 via-[#0d0221] to-[#ff006e]/5 p-12 md:p-16 shadow-2xl shadow-[#00f5ff]/10 backdrop-blur-xl"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-semibold tracking-widest uppercase text-gray-300"
          >
            The game moved.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-2 text-6xl md:text-8xl font-black leading-none -tracking-tighter text-[#00f5ff] drop-shadow-[0_0_40px_rgba(0,245,255,0.7)]"
          >
            You didn&apos;t.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 md:mt-10 text-lg md:text-xl text-gray-200"
          >
            Creative plays that intercept customers mid-move. Nothing but net.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <JellyButton
              href="#contact"
              className="rounded-full bg-[#ff006e] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff006e]/30 transition hover:bg-[#00f5ff] hover:text-gray-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00f5ff]"
            >
              Let&apos;s talk
            </JellyButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-2 text-xs text-gray-300/90"
        >
          {["Finish smooth", "Can't predict, can't defend", "Score in the paint", "All flair, no fluff"].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + (i * 0.1) }}
              whileHover={{ scale: 1.1, rotate: (i % 2 === 0 ? 2 : -2) }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 cursor-default"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-[#00f5ff] transition-colors"
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
