"use client";

import { motion } from "framer-motion";
import JellyButton from "./JellyButton";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

      {/* Animated background blobs (Subtle) */}
      {/* Fluid Cloud Mesh Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[#ff006e]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] bg-[#00f5ff]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#ffbe0b]/10 rounded-full blur-[100px]"
        />
        {/* White overlay to fade it out at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

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
            Sales plays, AI-powered
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-gray-200 bg-white p-12 md:p-16 shadow-2xl shadow-gray-200/50 backdrop-blur-xl"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-semibold tracking-widest uppercase text-gray-500"
          >
            The game moved.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-2 text-6xl md:text-8xl font-black leading-none -tracking-tighter text-gray-900 drop-shadow-sm"
          >
            You didn&apos;t.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 md:mt-10 text-lg md:text-xl text-gray-600"
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
              href="#audit-section"
              className="rounded-full bg-[#ff006e] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff006e]/30 transition hover:bg-[#00f5ff] hover:text-gray-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00f5ff]"
            >
              Get Audited
            </JellyButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-6 text-xs text-gray-400 tracking-wide"
          >
            Built on millions of real conversations. We&apos;ve heard every &quot;no&quot; so you don&apos;t have to.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-2 text-xs text-gray-500"
        >
          {["Finish smooth", "Can't predict, can't defend", "Built for closers", "All flair, no fluff"].map((text, i) => (
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
