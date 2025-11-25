import type { Variants, Transition } from "framer-motion";

// Standard transitions
export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  smooth: { duration: 0.3, ease: "easeOut" } as Transition,
  slow: { duration: 0.6, ease: "easeOut" } as Transition,
} as const;

// Fade in animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Height collapse/expand
export const heightCollapse: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

// Button hover effects
export const buttonHover = {
  scale: 1.05,
  transition: transitions.spring,
};

export const buttonTap = {
  scale: 0.95,
};

// Card hover effects
export const cardHover = {
  y: -5,
  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

// Progress bar animation
export const progressBar = (percentage: number): Variants => ({
  hidden: { width: 0 },
  visible: {
    width: `${percentage}%`,
    transition: { duration: 1.5, ease: "easeOut" },
  },
});

// Delayed fade in with index
export const staggeredFadeIn = (index: number, baseDelay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: baseDelay + index * 0.1 },
  },
});
