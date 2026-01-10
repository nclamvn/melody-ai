"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuroraBackground from "@/components/background/AuroraBackground";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import SearchBox from "@/components/home/SearchBox";
import SuggestionChips from "@/components/home/SuggestionChips";
import ResultsSection from "@/components/home/ResultsSection";
import { useSearch } from "@/hooks/useSearch";
import { suggestionChips } from "@/data/mockSongs";

export default function HomePage() {
  const { results, isLoading, hasSearched, search } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      search(query);
    },
    [search]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      setSearchQuery(suggestion);
      search(suggestion);
    },
    [search]
  );

  const handleRandomSuggestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * suggestionChips.length);
    const randomSuggestion = suggestionChips[randomIndex];
    setSearchQuery(randomSuggestion);
    search(randomSuggestion);
  }, [search]);

  return (
    <main className="relative min-h-screen">
      {/* Aurora Background */}
      <AuroraBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header isDemoMode={true} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12">
          <motion.div
            className="w-full max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero */}
            <HeroSection />

            {/* Search */}
            <SearchBox onSearch={handleSearch} isLoading={isLoading} />

            {/* Suggestions (hide when has results) */}
            <AnimatePresence>
              {!hasSearched && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SuggestionChips onSelect={handleSuggestionSelect} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <ResultsSection
              results={results}
              isLoading={isLoading}
              hasSearched={hasSearched}
              onRandomSuggestion={handleRandomSuggestion}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
