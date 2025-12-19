"use client";

import { motion } from "framer-motion";
import JellyButton from "./JellyButton";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

      {/* Animated background blobs (Optimized) */}
      {/* Fluid Cloud Mesh Gradient - using radial gradients instead of blur filters for performance */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,0,110,0.08)_0%,transparent_70%)]"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,245,255,0.08)_0%,transparent_70%)]"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,190,11,0.08)_0%,transparent_70%)]"
          style={{ willChange: "transform" }}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group w-full"
        >
          {/* Floating Glows */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00f5ff] to-[#ff006e] rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative rounded-3xl border border-white/20 bg-white/40 p-12 md:p-20 shadow-2xl backdrop-blur-3xl overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
            
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
              
              {/* Animated Accent Line */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 1, duration: 1 }}
                className="h-1 bg-gradient-to-r from-[#00f5ff] to-[#ff006e] mt-4 hidden md:block" 
              />
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
                Get Audited <span className="text-[#00f5ff]">→</span>
              </JellyButton>
              
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                    {i === 1 ? '💎' : i === 2 ? '🔒' : '🚀'}
                  </div>
                ))}
                <span className="pl-6 text-sm font-bold text-gray-500 flex items-center">
                  ONLY 3 SPOTS LEFT
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-12 text-xs font-bold text-gray-400 tracking-[0.2em] uppercase"
            >
              Built on millions of real conversations.
            </motion.p>
          </div>
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
