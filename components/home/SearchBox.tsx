"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "iconoir-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBox({ onSearch, isLoading = false }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        className={`
          relative liquid-glass-elevated overflow-hidden
          transition-all duration-300
          ${isFocused ? "shadow-glow-blue" : ""}
        `}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Shimmer Effect on Hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          whileHover={{ opacity: 1, backgroundPosition: ["200% center", "-200% center"] }}
          transition={{ duration: 1.5 }}
        />

        <div className="flex items-center gap-4 px-6 py-4 relative z-10">
          {/* Search Icon */}
          <Search
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-aurora-blue" : "text-muted"
            }`}
            strokeWidth={2}
          />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tên bài hát, đoạn lời nhớ, hoặc mô tả..."
            className="flex-1 bg-transparent text-body-lg text-primary placeholder:text-secondary outline-none"
            disabled={isLoading}
          />

          {/* Submit Button */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 rounded-full bg-aurora-blue/20 flex items-center justify-center"
              >
                <div className="w-5 h-5 border-2 border-aurora-blue border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="button"
                onClick={handleSubmit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={!query.trim()}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${query.trim()
                    ? "bg-gradient-to-r from-aurora-blue to-aurora-violet shadow-glow-blue cursor-pointer"
                    : "bg-glass-frost cursor-not-allowed"
                  }
                `}
              >
                <ArrowRight
                  className={`w-5 h-5 ${query.trim() ? "text-white" : "text-muted"}`}
                  strokeWidth={2}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 1 : 0 }}
        className="flex justify-center mt-3"
      >
        <div className="flex items-center gap-2 text-caption text-muted">
          <kbd className="px-2 py-1 rounded bg-glass-white border border-glass-border text-xs">
            Enter
          </kbd>
          <span>để tìm kiếm</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
