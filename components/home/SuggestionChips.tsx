"use client";

import { motion } from "framer-motion";
import { suggestionChips } from "@/data/mockSongs";

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-3 mt-6"
    >
      {suggestionChips.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.05 }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion)}
          className="chip-glass group"
        >
          <span className="group-hover:text-aurora-blue transition-colors duration-300">
            {suggestion}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
