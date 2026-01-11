"use client";

import { motion } from "framer-motion";
import { LyricsPageContent } from "@/types/albumStory";
import GlassCard from "../GlassCard";

interface LyricsPageProps {
  content: LyricsPageContent;
  currentTime?: number;
}

export default function LyricsPage({ content, currentTime = 0 }: LyricsPageProps) {
  // Find current line based on time
  const currentLineIndex = content.lines.findIndex((line, index) => {
    const nextLine = content.lines[index + 1];
    if (!nextLine) return currentTime >= line.time;
    return currentTime >= line.time && currentTime < nextLine.time;
  });

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case "happy": return "from-yellow-500/20 to-orange-500/20";
      case "sad": return "from-blue-500/20 to-indigo-500/20";
      case "romantic": return "from-pink-500/20 to-rose-500/20";
      case "energetic": return "from-red-500/20 to-orange-500/20";
      case "calm": return "from-green-500/20 to-teal-500/20";
      default: return "from-purple-500/20 to-blue-500/20";
    }
  };

  return (
    <GlassCard>
      <div className="w-full h-full flex flex-col p-6 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Lời Bài Hát</h2>
            {content.hasTranslation && (
              <p className="text-xs text-white/50">Có phiên dịch</p>
            )}
          </div>
        </motion.div>

        {/* Lyrics */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {content.lines.map((line, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;

            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative p-3 rounded-xl transition-all duration-300
                  ${isActive ? `bg-gradient-to-r ${getEmotionColor(line.emotion)}` : ""}
                `}
              >
                <p
                  className={`
                    text-base leading-relaxed transition-all duration-300
                    ${isActive ? "text-white font-semibold" : isPast ? "text-white/40" : "text-white/70"}
                  `}
                >
                  {line.text}
                </p>
                {line.translation && (
                  <p
                    className={`
                      text-sm mt-1 italic transition-all duration-300
                      ${isActive ? "text-white/70" : "text-white/30"}
                    `}
                  >
                    {line.translation}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
