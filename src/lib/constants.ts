import type { JellyTier } from './types';

// Jelly Score tiers configuration
export const JELLY_TIERS: JellyTier[] = [
  {
    range: [0, 20],
    emoji: '💤',
    label: 'Asleep',
    statusDescription: 'Significant inefficiencies detected',
  },
  {
    range: [20, 40],
    emoji: '🌱',
    label: 'Awake',
    statusDescription: 'Operational gaps identified',
  },
  {
    range: [40, 60],
    emoji: '🔥',
    label: 'Ready',
    statusDescription: 'Solid foundation, room to scale',
  },
  {
    range: [60, 80],
    emoji: '⚡',
    label: 'Scaling',
    statusDescription: 'Strong model, minor optimizations',
  },
  {
    range: [80, 100],
    emoji: '🚀',
    label: 'Exponential',
    statusDescription: 'Peak efficiency achieved',
  },
];

// Tier thresholds for progress bar markers
export const TIER_MARKERS = [20, 40, 60, 80];

// Get the current tier based on score
export function getCurrentTier(score: number): JellyTier {
  return JELLY_TIERS.find(
    (tier) => score >= tier.range[0] && score < tier.range[1]
  ) || JELLY_TIERS[JELLY_TIERS.length - 1];
}

// Get the next tier threshold
export function getNextTierInfo(score: number): { gap: number; label: string } | null {
  const nextTier = JELLY_TIERS.find((tier) => tier.range[0] > score);
  if (!nextTier) return null;
  return {
    gap: nextTier.range[0] - score,
    label: `${nextTier.emoji} ${nextTier.label}`,
  };
}

// Get score color gradient class
export function getScoreGradient(score: number): string {
  if (score < 20) return 'bg-gradient-to-r from-red-500 to-red-400';
  if (score < 40) return 'bg-gradient-to-r from-orange-500 to-orange-400';
  if (score < 60) return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
  if (score < 80) return 'bg-gradient-to-r from-cyan-500 to-cyan-400';
  return 'bg-gradient-to-r from-[#00f5ff] to-[#ff006e]';
}

// Get impact potential based on score
export function getImpactPotential(score: number): { level: string; description: string } {
  if (score < 40) return { level: 'High', description: 'Major transformation needed' };
  if (score < 70) return { level: 'Very High', description: 'Strategic tweaks = big wins' };
  if (score < 85) return { level: 'Rapid', description: 'Small moves = big results' };
  return { level: 'Legendary', description: 'You're already winning. Let's dominate.' };
}

// Brand colors
export const COLORS = {
  cyan: '#00f5ff',
  pink: '#ff006e',
  yellow: '#ffbe0b',
} as const;

// Quick prompt suggestions for the audit form
export const QUICK_PROMPTS = [
  '📉 Traffic is high, sales are low',
  '💸 Ads are getting too expensive',
  '🤝 We lose deals to cheaper competitors',
] as const;

// Rate limiting configuration
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  dailyLimit: 75,
} as const;

// Form validation
export const VALIDATION = {
  maxDescriptionLength: 280,
  domainRegex: /^[a-z0-9.-]+\.[a-z]{2,}$/,
} as const;
