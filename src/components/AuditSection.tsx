"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Suggestion, EmailStatus } from "@/lib/types";
import {
  AuditForm,
  JellyScoreDisplay,
  SuggestionsGrid,
  VerdictSection,
} from "./audit";

export default function AuditSection() {
  // Form state
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Results state
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState("");

  // Email capture state
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");

  const handleEmailSubmit = async (
    e: React.FormEvent,
    type: "application" | "waitlist"
  ) => {
    e.preventDefault();
    setEmailStatus("sending");

    try {
      const res = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          domain,
          score,
          type,
          suggestions,
          verdict,
        }),
      });

      if (res.ok) {
        setEmailStatus("success");
        setEmail("");
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuggestions(null);
    setScore(null);
    setVerdict("");
    setShowEmailForm(false);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, description }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 429)
          throw new Error("Whoa, slow down! One audit per minute.");
        throw new Error(errorData.error || "Something went wrong. Try again.");
      }

      const data = await res.json();
      setSuggestions(data.suggestions);
      if (data.score) setScore(data.score);
      if (data.verdict) setVerdict(data.verdict);

      // Show email form after a short delay
      setTimeout(() => setShowEmailForm(true), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="audit-section"
      className="relative py-32 px-4 overflow-hidden bg-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00f5ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ff006e]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
          >
            Is your business{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e]">
              stuck on the bench?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Let our AI analyze your business and put you back in the game. Free
            & Instant.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
          {/* Form */}
          <AuditForm
            domain={domain}
            description={description}
            loading={loading}
            error={error}
            onDomainChange={setDomain}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
          />

          {/* Results */}
          <AnimatePresence>
            {suggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-12"
              >
                {/* Jelly Score Breakdown */}
                {score !== null && <JellyScoreDisplay score={score} />}

                {/* Suggestions Grid */}
                <SuggestionsGrid suggestions={suggestions} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verdict Section */}
          {score !== null && (
            <VerdictSection
              score={score}
              verdict={verdict}
              showEmailForm={showEmailForm}
              email={email}
              emailStatus={emailStatus}
              onEmailChange={setEmail}
              onEmailSubmit={handleEmailSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}
