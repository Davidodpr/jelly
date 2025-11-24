"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
    title: string;
    description: string;
    icon: string;
    action: string;
}

export default function AuditSection() {
    const [domain, setDomain] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
    const [error, setError] = useState("");

    const [score, setScore] = useState<number | null>(null);
    const [verdict, setVerdict] = useState("");
    const [showEmailForm, setShowEmailForm] = useState(false);

    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleEmailSubmit = async (e: React.FormEvent, type: 'application' | 'waitlist') => {
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
                    suggestions, // Pass the plays
                    verdict      // Pass the verdict
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
                if (res.status === 429) throw new Error("Whoa, slow down! One audit per minute.");
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
        <section id="audit-section" className="relative py-32 px-4 overflow-hidden bg-[#050110]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00f5ff]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ff006e]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
                    >
                        Is your business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e]">stuck on the bench?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/60 max-w-2xl mx-auto"
                    >
                        Let our AI analyze your business and put you back in the game. Free & Instant.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-1 gap-12">
                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glossy sheen */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                            <div className="space-y-2">
                                <label htmlFor="domain" className="text-sm font-bold text-[#00f5ff] tracking-widest uppercase">Your Business Domain</label>
                                <div className="flex">
                                    <span className="bg-black/60 border border-white/10 border-r-0 rounded-l-xl px-4 py-4 text-white/40 text-sm flex items-center">https://</span>
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
                                        onChange={(e) => setDomain(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-r-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00f5ff] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-bold text-[#ff006e] tracking-widest uppercase">What is your biggest business headache right now?</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Be honest. e.g. 'We are great at delivery but terrible at sales' or 'We rely 100% on referrals'..."
                                    required
                                    maxLength={280}
                                    data-lpignore="true"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ff006e] transition-colors h-32 resize-none"
                                />
                                <div className="flex justify-between items-start pt-1">
                                    <div className="flex flex-wrap gap-2 pr-4">
                                        {[
                                            "📉 Traffic is high, sales are low",
                                            "💸 Ads are getting too expensive",
                                            "🤝 We lose deals to cheaper competitors"
                                        ].map((text) => (
                                            <button
                                                key={text}
                                                type="button"
                                                onClick={() => setDescription(text)}
                                                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/60 hover:text-white transition-colors text-left"
                                            >
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-xs text-white/30 whitespace-nowrap">{description.length}/280</div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative px-8 py-4 bg-white text-black font-black text-lg rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ANALYZING SITE STRUCTURE...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            RUN THE PLAY
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
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

                    {/* Results */}
                    <AnimatePresence>
                        {suggestions && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-12"
                            >
                                <div className="grid md:grid-cols-3 gap-6">
                                    {suggestions.map((suggestion, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group flex flex-col h-full"
                                        >
                                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{suggestion.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{suggestion.title}</h3>
                                            <p className="text-white/60 text-sm mb-6 italic flex-grow">&quot;{suggestion.description}&quot;</p>

                                            <div className="mt-auto pt-4 border-t border-white/10">
                                                <div className="text-[#00f5ff] text-xs font-bold uppercase tracking-widest mb-1">The Play</div>
                                                <p className="text-white text-sm font-medium">{suggestion.action}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* THE VERDICT SECTION */}
                                {score !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-gradient-to-br from-white/10 to-black/40 border border-white/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f5ff] via-[#ff006e] to-[#ffbe0b]" />

                                        <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">The Verdict</h3>

                                        <div className="flex justify-center items-center gap-4 mb-6">
                                            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                                {score}
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Jelly Score</div>
                                                <div className="text-xs text-white/30">Potential Impact</div>
                                            </div>
                                        </div>

                                        <p className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
                                            &quot;{verdict}&quot;
                                        </p>

                                        {showEmailForm && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="max-w-md mx-auto bg-black/40 rounded-2xl p-6 border border-white/10"
                                            >
                                                {emailStatus === "success" ? (
                                                    <div className="text-center py-4">
                                                        <div className="text-4xl mb-2">📨</div>
                                                        <h4 className="text-white font-bold text-lg mb-1">Check your inbox!</h4>
                                                        <p className="text-white/60 text-sm">We&apos;ll be in touch shortly.</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {score >= 80 ? (
                                                            <div className="space-y-4">
                                                                <div className="text-[#00f5ff] font-bold uppercase tracking-widest text-sm">🦄 Unicorn Potential Detected</div>
                                                                <p className="text-white/80 text-sm">
                                                                    You qualify for a strategic partnership. We have <span className="text-white font-bold">3 spots</span> left for 2025.
                                                                </p>
                                                                <form onSubmit={(e) => handleEmailSubmit(e, 'application')} className="flex gap-2">
                                                                    <input
                                                                        type="email"
                                                                        required
                                                                        placeholder="ceo@yourcompany.com"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00f5ff]"
                                                                    />
                                                                    <button
                                                                        type="submit"
                                                                        disabled={emailStatus === "sending"}
                                                                        className="bg-[#00f5ff] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00f5ff]/90 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {emailStatus === "sending" ? "..." : "APPLY"}
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-4">
                                                                <div className="text-[#ffbe0b] font-bold uppercase tracking-widest text-sm">🚧 Work in Progress</div>
                                                                <p className="text-white/80 text-sm">
                                                                    You&apos;re not ready for us yet. Join the waitlist to get our &quot;Golden Playbook&quot; and improve your score.
                                                                </p>
                                                                <form onSubmit={(e) => handleEmailSubmit(e, 'waitlist')} className="flex gap-2">
                                                                    <input
                                                                        type="email"
                                                                        required
                                                                        placeholder="you@yourcompany.com"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        className="flex-1 bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ffbe0b]"
                                                                    />
                                                                    <button
                                                                        type="submit"
                                                                        disabled={emailStatus === "sending"}
                                                                        className="bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {emailStatus === "sending" ? "..." : "JOIN"}
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
