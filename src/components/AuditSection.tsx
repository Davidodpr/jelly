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
        <section id="audit-section" className="relative py-32 px-4 overflow-hidden bg-gray-50">
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
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
                    >
                        Is your business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#ff006e]">stuck on the bench?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Let our AI analyze your business and put you back in the game. Free & Instant.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-1 gap-12">
                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 relative overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                            <div className="space-y-2">
                                <label htmlFor="domain" className="text-sm font-bold text-[#0891b2] tracking-widest uppercase">Your Business Domain</label>
                                <div className="flex">
                                    <span className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl px-4 py-4 text-gray-500 text-sm flex items-center">https://</span>
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
                                        className="w-full bg-white border border-gray-200 rounded-r-xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00f5ff] focus:ring-2 focus:ring-[#00f5ff]/20 transition-all"
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
                                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff006e] focus:ring-2 focus:ring-[#ff006e]/20 transition-all h-32 resize-none"
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
                                                className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors text-left"
                                            >
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-400 whitespace-nowrap">{description.length}/280</div>
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
                                {/* Jelly Score Breakdown */}
                                {score !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mb-12 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
                                    >
                                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                                            <span className="text-[#00f5ff]">🎯</span> Jelly Score Breakdown
                                        </h3>

                                        {/* Score Label */}
                                        <div className="flex justify-between text-sm font-bold text-gray-600 mb-3">
                                            <span>Your Score</span>
                                            <span className="text-gray-900">{score}/100</span>
                                        </div>

                                        {/* Unified Progress Bar */}
                                        <div className="relative h-6 md:h-8 bg-gray-100 rounded-full overflow-visible mb-8">
                                            {/* Filled Portion */}
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${score}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`h-full rounded-full relative z-10 ${score < 20 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                                                    score < 40 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                                                        score < 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                                            score < 80 ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' :
                                                                'bg-gradient-to-r from-[#00f5ff] to-[#ff006e]'
                                                    }`}
                                            />

                                            {/* Gap Portion (Shimmer Effect) */}
                                            <div
                                                className="absolute top-0 right-0 h-full rounded-full border-2 border-dashed border-gray-300 bg-gray-100 overflow-hidden"
                                                style={{ width: `${100 - score}%` }}
                                            >
                                                {/* Animated Shimmer Wave */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent w-1/2 animate-shimmer" />
                                            </div>

                                            {/* Tier Markers */}
                                            {[20, 40, 60, 80].map((marker) => (
                                                <div
                                                    key={marker}
                                                    className="absolute top-0 bottom-0 w-0.5 bg-white z-20"
                                                    style={{ left: `${marker}%` }}
                                                />
                                            ))}

                                            {/* Score Position Arrow */}
                                            <div
                                                className="absolute -top-6 z-30"
                                                style={{
                                                    left: `${score}%`,
                                                    transform: 'translateX(-50%)'
                                                }}
                                            >
                                                <span className="text-2xl animate-bounce">↓</span>
                                            </div>
                                        </div>

                                        {/* Tier Labels */}
                                        <div className="relative min-h-[80px] md:min-h-[100px]">
                                            {/* Desktop Layout */}
                                            <div className="hidden md:flex justify-between items-center text-center">
                                                {[
                                                    { range: [0, 20], emoji: '💤', label: 'Asleep', position: 10, threshold: 20 },
                                                    { range: [20, 40], emoji: '🌱', label: 'Awake', position: 30, threshold: 40 },
                                                    { range: [40, 60], emoji: '🚀', label: 'Ready', position: 50, threshold: 60 },
                                                    { range: [60, 80], emoji: '⚡', label: 'Scaling', position: 70, threshold: 80 },
                                                    { range: [80, 100], emoji: '🚀', label: 'Exponential', position: 90, threshold: 100 }
                                                ].map((tier, idx) => {
                                                    const isActive = score >= tier.range[0] && score < tier.range[1];
                                                    const isPassed = score >= tier.range[1];

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex flex-col items-center transition-all ${isActive ? 'scale-110' : isPassed ? 'opacity-50' : 'opacity-30'
                                                                }`}
                                                            style={{
                                                                position: 'absolute',
                                                                left: `${tier.position}%`,
                                                                transform: 'translateX(-50%)'
                                                            }}
                                                        >
                                                            <span className="text-2xl mb-1">{tier.emoji}</span>
                                                            <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-gray-900' : 'text-gray-400'
                                                                }`}>
                                                                {tier.label}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Mobile Layout */}
                                            <div className="md:hidden grid grid-cols-5 gap-1 text-center">
                                                {[
                                                    { range: [0, 20], emoji: '💤', label: 'Asleep' },
                                                    { range: [20, 40], emoji: '🌱', label: 'Awake' },
                                                    { range: [40, 60], emoji: '🚀', label: 'Ready' },
                                                    { range: [60, 80], emoji: '⚡', label: 'Scaling' },
                                                    { range: [80, 100], emoji: '🚀', label: 'Exponential' }
                                                ].map((tier, idx) => {
                                                    const isActive = score >= tier.range[0] && score < tier.range[1];
                                                    const isPassed = score >= tier.range[1];

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex flex-col items-center transition-all ${isActive ? 'scale-110' : isPassed ? 'opacity-50' : 'opacity-30'
                                                                }`}
                                                        >
                                                            <span className="text-xl mb-1">{tier.emoji}</span>
                                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-gray-900' : 'text-gray-400'
                                                                }`}>
                                                                {tier.label}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Insight Cards */}
                                        <div className="grid md:grid-cols-3 gap-4 mt-8">
                                            {/* Current Status Card */}
                                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4">
                                                <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Current Status</div>
                                                <div className="text-2xl font-black text-gray-900 mb-1">
                                                    {score < 20 ? '💤 Asleep' :
                                                        score < 40 ? '🌱 Awake' :
                                                            score < 60 ? '🔥 Ready' :
                                                                score < 80 ? '⚡ Scaling' :
                                                                    '🚀 Exponential'}
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    {score < 20 ? 'Significant inefficiencies detected' :
                                                        score < 40 ? 'Operational gaps identified' :
                                                            score < 60 ? 'Solid foundation, room to scale' :
                                                                score < 80 ? 'Strong model, minor optimizations' :
                                                                    'Peak efficiency achieved'}
                                                </p>
                                            </div>

                                            {/* Next Milestone Card */}
                                            <div className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 rounded-xl p-4">
                                                <div className="text-xs text-cyan-600 uppercase tracking-wider font-bold mb-1">Next Milestone</div>
                                                <div className="text-2xl font-black text-gray-900 mb-1">
                                                    {(() => {
                                                        const tiers = [
                                                            { threshold: 20, emoji: '🌱', label: 'Awake' },
                                                            { threshold: 40, emoji: '🚀', label: 'Ready' },
                                                            { threshold: 60, emoji: '⚡', label: 'Scaling' },
                                                            { threshold: 80, emoji: '🚀', label: 'Exponential' }
                                                        ];
                                                        const nextTier = tiers.find(t => t.threshold > score);
                                                        if (score >= 100) return "Perfect!";
                                                        if (nextTier) {
                                                            const gap = nextTier.threshold - score;
                                                            return `+${gap} pts`;
                                                        }
                                                        return "—";
                                                    })()}
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    {(() => {
                                                        const tiers = [
                                                            { threshold: 20, label: '🌱 Awake' },
                                                            { threshold: 40, label: '🚀 Ready' },
                                                            { threshold: 60, label: '⚡ Scaling Mode' },
                                                            { threshold: 80, label: '🚀 Quantum Leap' }
                                                        ];
                                                        if (score >= 100) return "Ready for quantum leap!";
                                                        if (score >= 80) return `${100 - score} pts to Exponential!`;
                                                        const nextTier = tiers.find(t => t.threshold > score);
                                                        return nextTier ? `to ${nextTier.label}` : "—";
                                                    })()}
                                                </p>
                                            </div>

                                            {/* Potential Impact Card */}
                                            <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-xl p-4">
                                                <div className="text-xs text-pink-600 uppercase tracking-wider font-bold mb-1">Impact Potential</div>
                                                <div className="text-2xl font-black text-gray-900 mb-1">
                                                    {score < 40 ? 'High' :
                                                        score < 70 ? 'Very High' :
                                                            'Exponential'}
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    {score < 40 ? 'Major transformation needed' :
                                                        score < 70 ? 'Strategic tweaks = big wins' :
                                                            'Minor optimizations = explosive growth'}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="grid md:grid-cols-3 gap-6">
                                    {suggestions.map((suggestion, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group flex flex-col h-full"
                                        >
                                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{suggestion.icon}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{suggestion.title}</h3>
                                            <p className="text-gray-600 text-sm mb-6 italic flex-grow">&quot;{suggestion.description}&quot;</p>

                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                <div className="text-[#0891b2] text-xs font-bold uppercase tracking-widest mb-1">The Play</div>
                                                <p className="text-gray-900 text-sm font-medium">{suggestion.action}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* THE VERDICT SECTION */}
                    {score !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden z-20 shadow-xl shadow-gray-200/50"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f5ff] via-[#ff006e] to-[#ffbe0b]" />

                            <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-widest">The Verdict</h3>

                            <div className="flex justify-center items-center gap-4 mb-6">
                                <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600">
                                    {score}
                                </div>
                                <div className="text-left">
                                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Jelly Score</div>
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
                                            <h4 className="text-gray-900 font-bold text-lg mb-1">Check your inbox!</h4>
                                            <p className="text-gray-500 text-sm">We&apos;ll be in touch shortly.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {score >= 80 ? (
                                                <div className="space-y-4">
                                                    <div className="text-[#0891b2] font-bold uppercase tracking-widest text-sm">🦄 Unicorn Potential Detected</div>
                                                    <p className="text-gray-600 text-sm">
                                                        You qualify for a strategic partnership. We have <span className="text-gray-900 font-bold">3 spots</span> left for 2025.
                                                    </p>
                                                    <form onSubmit={(e) => handleEmailSubmit(e, 'application')} className="flex gap-2">
                                                        <input
                                                            type="email"
                                                            required
                                                            placeholder="ceo@yourcompany.com"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
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
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="text-[#ffbe0b] font-bold uppercase tracking-widest text-sm">🚧 Work in Progress</div>
                                                    <p className="text-gray-600 text-sm">
                                                        You&apos;re not ready for us yet. Join the waitlist to get our &quot;Golden Playbook&quot; and improve your score.
                                                    </p>
                                                    <form onSubmit={(e) => handleEmailSubmit(e, 'waitlist')} className="flex gap-2">
                                                        <input
                                                            type="email"
                                                            required
                                                            placeholder="you@yourcompany.com"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
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
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
