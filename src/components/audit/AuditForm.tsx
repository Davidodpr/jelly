"use client";

import { motion } from "framer-motion";
import { QUICK_PROMPTS, VALIDATION } from "@/lib/constants";

interface AuditFormProps {
  domain: string;
  description: string;
  loading: boolean;
  error: string;
  onDomainChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuditForm({
  domain,
  description,
  loading,
  error,
  onDomainChange,
  onDescriptionChange,
  onSubmit,
}: AuditFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 relative overflow-hidden"
    >
      <form onSubmit={onSubmit} className="space-y-6 relative z-10" noValidate>
        <div className="space-y-2">
          <label
            htmlFor="domain"
            className="text-sm font-bold text-[#0891b2] tracking-widest uppercase"
          >
            Your Business Domain
          </label>
          <div className="flex">
            <span className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl px-4 py-4 text-gray-500 text-sm flex items-center">
              https://
            </span>
            <input
              type="text"
              id="domain"
              name="domain"
              autoComplete="url"
              placeholder="yourbusiness.com"
              required
              spellCheck="false"
              data-lpignore="true"
              value={domain}
              onChange={(e) => onDomainChange(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-r-xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00f5ff] focus:ring-2 focus:ring-[#00f5ff]/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-bold text-[#ff006e] tracking-widest uppercase"
          >
            What is your biggest business headache right now?
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Be honest. e.g. 'We are great at delivery but terrible at sales' or 'We rely 100% on referrals'..."
            required
            maxLength={VALIDATION.maxDescriptionLength}
            data-lpignore="true"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff006e] focus:ring-2 focus:ring-[#ff006e]/20 transition-all h-32 resize-none"
          />
          <div className="flex justify-between items-start pt-1">
            <div className="flex flex-wrap gap-2 pr-4">
              {QUICK_PROMPTS.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => onDescriptionChange(text)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors text-left"
                >
                  {text}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">
              {description.length}/{VALIDATION.maxDescriptionLength}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="group relative px-8 py-4 bg-gray-900 text-white font-black text-lg rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-gray-900/20"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ANALYZING BUSINESS DNA...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                RUN THE PLAY
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            )}
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[#ff006e] font-bold mt-4"
          >
            {error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
