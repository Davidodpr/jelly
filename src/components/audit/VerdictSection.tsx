"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EmailStatus } from "@/lib/types";

interface VerdictSectionProps {
  score: number;
  verdict: string;
  showEmailForm: boolean;
  email: string;
  emailStatus: EmailStatus;
  generatedImage?: string | null;
  imageLoading?: boolean;
  onEmailChange: (value: string) => void;
  onEmailSubmit: (e: React.FormEvent, type: "application" | "waitlist") => void;
}

export default function VerdictSection({
  score,
  verdict,
  showEmailForm,
  email,
  emailStatus,
  generatedImage,
  imageLoading,
  onEmailChange,
  onEmailSubmit,
}: VerdictSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden z-20 shadow-xl shadow-gray-200/50"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f5ff] via-[#ff006e] to-[#ffbe0b]" />

      <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-widest">
        The Verdict
      </h3>

      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600">
          {score}
        </div>
        <div className="text-left">
          <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">
            Jelly Score
          </div>
          <div className="text-xs text-gray-300">Potential Impact</div>
        </div>
      </div>

      <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
        &quot;{verdict}&quot;
      </p>

      {/* Sharing & Download */}
      {generatedImage && !imageLoading && (
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = generatedImage;
              link.download = `jelly-score-${score}.png`;
              link.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-bold transition-colors"
          >
          </button>
          <button
            onClick={() => {
              const text = `JellyBrain just roasted my business with a score of ${score}/100! 🧠🔥\n\n"${verdict}"\n\nSee if you're ready for Jellymove: jellymove.ai`;
              navigator.clipboard.writeText(text);
              alert("Roast copied to clipboard! Share it on LinkedIn or X.");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#00f5ff]/10 hover:bg-[#00f5ff]/20 text-[#0891b2] rounded-full text-sm font-bold transition-colors"
          >
            <span>🔗</span> Copy Share Text
          </button>
        </div>
      )}

      {/* Generated Image */}
      {(imageLoading || generatedImage) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          {imageLoading ? (
            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-[#00f5ff] rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Generating your artwork...</p>
              </div>
            </div>
          ) : generatedImage ? (
            <div className="relative w-64 h-64 mx-auto group">
              <Image
                src={generatedImage}
                alt="Your personalized Jelly Score artwork"
                fill
                className="object-contain rounded-2xl shadow-lg transition-transform group-hover:scale-105"
                unoptimized
              />
            </div>
          ) : null}
        </motion.div>
      )}

      {showEmailForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-200"
        >
          {emailStatus === "success" ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">📨</div>
              <h4 className="text-gray-900 font-bold text-lg mb-1">
                Check your inbox!
              </h4>
              <p className="text-gray-500 text-sm">
                We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              {score >= 80 ? (
                <HighScoreForm
                  email={email}
                  emailStatus={emailStatus}
                  onEmailChange={onEmailChange}
                  onSubmit={(e) => onEmailSubmit(e, "application")}
                />
              ) : score >= 50 ? (
                <MediumScoreForm
                  email={email}
                  emailStatus={emailStatus}
                  onEmailChange={onEmailChange}
                  onSubmit={(e) => onEmailSubmit(e, "waitlist")}
                />
              ) : (
                <LowScoreMessage />
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

interface EmailFormProps {
  email: string;
  emailStatus: EmailStatus;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function HighScoreForm({ email, emailStatus, onEmailChange, onSubmit }: EmailFormProps) {
  return (
    <div className="space-y-4 text-left">
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e] font-black uppercase tracking-widest text-sm text-center">
        Unicorn Match Found 🦄
      </div>
      <p className="text-gray-600 text-sm">
        Your business is built for exponential growth. We only work with 3 clients at a time to ensure legendary results. <span className="text-gray-900 font-bold">1 spot left for 2025.</span>
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="ceo@yourcompany.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00f5ff] focus:ring-2 focus:ring-[#00f5ff]/20"
        />
        <button
          type="submit"
          disabled={emailStatus === "sending"}
          className="w-full bg-gray-900 text-white font-bold px-6 py-4 rounded-lg hover:bg-black transition-all disabled:opacity-50 shadow-lg shadow-gray-200 flex items-center justify-center gap-2 group"
        >
          {emailStatus === "sending" ? "..." : "APPLY FOR THE GOLDEN TICKET"}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </form>
    </div>
  );
}

function MediumScoreForm({ email, emailStatus, onEmailChange, onSubmit }: EmailFormProps) {
  return (
    <div className="space-y-4 text-left">
      <div className="text-[#0891b2] font-bold uppercase tracking-widest text-sm text-center">
        Almost There ⚡
      </div>
      <p className="text-gray-600 text-sm">
        You have a solid foundation but manual friction is slowing you down. Join the waitlist for the <span className="font-bold">&quot;Golden Playbook&quot;</span> - our internal guide to automating your growth.
      </p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00f5ff] focus:ring-2 focus:ring-[#00f5ff]/20"
        />
        <button
          type="submit"
          disabled={emailStatus === "sending"}
          className="bg-[#00f5ff] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00f5ff]/90 transition-colors disabled:opacity-50 shadow-md shadow-[#00f5ff]/20"
        >
          {emailStatus === "sending" ? "..." : "JOIN"}
        </button>
      </form>
    </div>
  );
}

function LowScoreMessage() {
  return (
    <div className="space-y-4 text-center">
      <div className="text-red-500 font-bold uppercase tracking-widest text-sm">
        Permission Denied 🚧
      </div>
      <p className="text-gray-600 text-sm">
        Your current business model isn&apos;t a fit for Jellymove automation yet. Take the advice above, fix the fundamentals, and come back when you&apos;re ready to scale.
      </p>
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 text-xs text-gray-400 font-medium">
        LOCKED: THE GOLDEN PLAYBOOK
      </div>
    </div>
  );
}
