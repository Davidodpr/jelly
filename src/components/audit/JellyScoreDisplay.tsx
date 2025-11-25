"use client";

import { motion } from "framer-motion";
import {
  JELLY_TIERS,
  TIER_MARKERS,
  getCurrentTier,
  getNextTierInfo,
  getScoreGradient,
  getImpactPotential,
} from "@/lib/constants";

interface JellyScoreDisplayProps {
  score: number;
}

export default function JellyScoreDisplay({ score }: JellyScoreDisplayProps) {
  const currentTier = getCurrentTier(score);
  const nextTierInfo = getNextTierInfo(score);
  const impactPotential = getImpactPotential(score);

  return (
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
          className={`h-full rounded-full relative z-10 ${getScoreGradient(score)}`}
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
        {TIER_MARKERS.map((marker) => (
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
            transform: "translateX(-50%)",
          }}
        >
          <span className="text-2xl animate-bounce">↓</span>
        </div>
      </div>

      {/* Tier Labels */}
      <div className="relative min-h-[80px] md:min-h-[100px]">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center text-center">
          {JELLY_TIERS.map((tier, idx) => {
            const isActive = score >= tier.range[0] && score < tier.range[1];
            const isPassed = score >= tier.range[1];
            const position = tier.range[0] + (tier.range[1] - tier.range[0]) / 2;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center transition-all ${
                  isActive ? "scale-110" : isPassed ? "opacity-50" : "opacity-30"
                }`}
                style={{
                  position: "absolute",
                  left: `${position}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span className="text-2xl mb-1">{tier.emoji}</span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {tier.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-5 gap-1 text-center">
          {JELLY_TIERS.map((tier, idx) => {
            const isActive = score >= tier.range[0] && score < tier.range[1];
            const isPassed = score >= tier.range[1];

            return (
              <div
                key={idx}
                className={`flex flex-col items-center transition-all ${
                  isActive ? "scale-110" : isPassed ? "opacity-50" : "opacity-30"
                }`}
              >
                <span className="text-xl mb-1">{tier.emoji}</span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
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
          <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
            Current Status
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            {currentTier.emoji} {currentTier.label}
          </div>
          <p className="text-xs text-gray-600">{currentTier.statusDescription}</p>
        </div>

        {/* Next Milestone Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 rounded-xl p-4">
          <div className="text-xs text-cyan-600 uppercase tracking-wider font-bold mb-1">
            Next Milestone
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            {score >= 100 ? "Perfect!" : nextTierInfo ? `+${nextTierInfo.gap} pts` : "—"}
          </div>
          <p className="text-xs text-gray-600">
            {score >= 100
              ? "Ready for quantum leap!"
              : nextTierInfo
                ? `to ${nextTierInfo.label}`
                : "—"}
          </p>
        </div>

        {/* Potential Impact Card */}
        <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-xl p-4">
          <div className="text-xs text-pink-600 uppercase tracking-wider font-bold mb-1">
            Impact Potential
          </div>
          <div className="text-2xl font-black text-gray-900 mb-1">
            {impactPotential.level}
          </div>
          <p className="text-xs text-gray-600">{impactPotential.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
