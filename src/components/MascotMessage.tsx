"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MascotMessageProps {
  message: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function MascotMessage({
  message,
  size = "md",
  className = "",
}: MascotMessageProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const bubbleSizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`${sizeClasses[size]} relative flex-shrink-0`}
      >
        <Image
          src="/mascot.png"
          alt="Jelly mascot"
          fill
          className="object-contain"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative bg-white border border-gray-200 rounded-2xl shadow-sm ${bubbleSizes[size]}`}
      >
        {/* Speech bubble tail */}
        <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-200 border-b-[6px] border-b-transparent" />
        <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-white border-b-[5px] border-b-transparent" />
        <span className="text-gray-700 font-medium">{message}</span>
      </motion.div>
    </motion.div>
  );
}
