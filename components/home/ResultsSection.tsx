"use client";

import { motion, AnimatePresence } from "framer-motion";
import SongCard from "./SongCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { Song } from "@/types";

interface ResultsSectionProps {
  results: Song[];
  isLoading: boolean;
  hasSearched: boolean;
  onRandomSuggestion?: () => void;
}

export default function ResultsSection({
  results,
  isLoading,
  hasSearched,
  onRandomSuggestion,
}: ResultsSectionProps) {
  if (!hasSearched && !isLoading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingState />
          </motion.div>
        ) : results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-callout text-secondary">
                Tìm thấy <span className="text-primary font-medium">{results.length}</span> bài hát
              </h2>
            </div>

            {/* Results List */}
            <div className="space-y-3 stagger-children">
              {results.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState onRandomSuggestion={onRandomSuggestion} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
