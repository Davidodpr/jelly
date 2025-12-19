"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Suggestion, EmailStatus } from "@/lib/types";
import {
  getMascotLoading,
  getMascotError,
  getMascotReaction,
} from "@/lib/mascot";
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

  // Mascot state
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mascotReaction, setMascotReaction] = useState("");

  // Results state
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

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
          generatedImage,
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
    setErrorMessage("");
    setSuggestions(null);
    setScore(null);
    setVerdict("");
    setShowEmailForm(false);
    setMascotReaction("");
    setLoadingMessage(getMascotLoading());
    setGeneratedImage(null);
    setImageLoading(false);

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
      if (data.score) {
        setScore(data.score);
        setMascotReaction(getMascotReaction(data.score));

        // Generate image in the background
        setImageLoading(true);
        fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: data.score, domain, description }),
        })
          .then((imgRes) => imgRes.json())
          .then((imgData) => {
            if (imgData.image) {
              setGeneratedImage(imgData.image);
            }
          })
          .catch((err) => {
            console.error("Image generation failed:", err);
          })
          .finally(() => {
            setImageLoading(false);
          });
      }
      if (data.verdict) setVerdict(data.verdict);

      // Show email form after a short delay
      setTimeout(() => setShowEmailForm(true), 2000);
    } catch (err: unknown) {
      setErrorMessage(getMascotError());
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <section
      id="audit-section"
      className="relative py-32 px-4 overflow-hidden bg-gray-50"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,245,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,110,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-black tracking-[0.2em] text-[#ff006e] uppercase"
          >
            The Gatekeeper 3.0
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight"
          >
            Audition for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e]">
              Exclusivity.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
          >
            We don&apos;t sell services. We partner with winners. 
            Analyze your business potential and see if you qualify.
          </motion.p>

          {/* Scarcity Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff006e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff006e]"></span>
              </span>
              <span className="text-sm font-bold text-gray-900 tracking-widest">
                SPOTS LEFT IN 2025: <span className="text-[#ff006e]">1</span>
              </span>
            </div>
            <div className="h-px w-12 bg-gray-200" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
          {/* Form */}
          <AuditForm
            domain={domain}
            description={description}
            loading={loading}
            error={error}
            loadingMessage={loadingMessage}
            errorMessage={errorMessage}
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
                {score !== null && (
                  <JellyScoreDisplay score={score} mascotReaction={mascotReaction} />
                )}

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
              generatedImage={generatedImage}
              imageLoading={imageLoading}
              onEmailChange={setEmail}
              onEmailSubmit={handleEmailSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}
