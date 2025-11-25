"use client";

import { motion } from "framer-motion";
import type { EmailStatus } from "@/lib/types";

interface VerdictSectionProps {
  score: number;
  verdict: string;
  showEmailForm: boolean;
  email: string;
  emailStatus: EmailStatus;
  onEmailChange: (value: string) => void;
  onEmailSubmit: (e: React.FormEvent, type: "application" | "waitlist") => void;
}

export default function VerdictSection({
  score,
  verdict,
  showEmailForm,
  email,
  emailStatus,
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
              ) : (
                <LowScoreForm
                  email={email}
                  emailStatus={emailStatus}
                  onEmailChange={onEmailChange}
                  onSubmit={(e) => onEmailSubmit(e, "waitlist")}
                />
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
    <div className="space-y-4">
      <div className="text-[#0891b2] font-bold uppercase tracking-widest text-sm">
        🦄 Unicorn Potential Detected
      </div>
      <p className="text-gray-600 text-sm">
        You qualify for a strategic partnership. We have{" "}
        <span className="text-gray-900 font-bold">3 spots</span> left for 2025.
      </p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="ceo@yourcompany.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00f5ff] focus:ring-2 focus:ring-[#00f5ff]/20"
        />
        <button
          type="submit"
          disabled={emailStatus === "sending"}
          className="bg-[#00f5ff] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00f5ff]/90 transition-colors disabled:opacity-50 shadow-md shadow-[#00f5ff]/20"
        >
          {emailStatus === "sending" ? "..." : "APPLY"}
        </button>
      </form>
    </div>
  );
}

function LowScoreForm({ email, emailStatus, onEmailChange, onSubmit }: EmailFormProps) {
  return (
    <div className="space-y-4">
      <div className="text-[#ffbe0b] font-bold uppercase tracking-widest text-sm">
        🚧 Work in Progress
      </div>
      <p className="text-gray-600 text-sm">
        You&apos;re not ready for us yet. Join the waitlist to get our &quot;Golden
        Playbook&quot; and improve your score.
      </p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ffbe0b] focus:ring-2 focus:ring-[#ffbe0b]/20"
        />
        <button
          type="submit"
          disabled={emailStatus === "sending"}
          className="bg-gray-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 shadow-md"
        >
          {emailStatus === "sending" ? "..." : "JOIN"}
        </button>
      </form>
    </div>
  );
}
