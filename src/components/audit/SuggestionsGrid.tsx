"use client";

import { motion } from "framer-motion";
import type { Suggestion } from "@/lib/types";

interface SuggestionsGridProps {
  suggestions: Suggestion[];
}

export default function SuggestionsGrid({ suggestions }: SuggestionsGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {suggestions.map((suggestion, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group flex flex-col h-full"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {suggestion.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {suggestion.title}
          </h3>
          <p className="text-gray-600 text-sm mb-6 italic flex-grow">
            &quot;{suggestion.description}&quot;
          </p>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="text-[#0891b2] text-xs font-bold uppercase tracking-widest mb-1">
              The Play
            </div>
            <p className="text-gray-900 text-sm font-medium">{suggestion.action}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
