"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlignLeft } from "iconoir-react";
import { LyricLine } from "@/types";

interface LyricsPanelProps {
  lyrics: LyricLine[];
  currentTime: number;
  isLoading?: boolean;
  songTitle?: string;
  songArtist?: string;
  onBack?: () => void;
  isKaraokeMode?: boolean;
}

export default function LyricsPanel({
  lyrics,
  currentTime,
  isLoading = false,
  songTitle,
  songArtist,
  onBack,
  isKaraokeMode = false,
}: LyricsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const [syncOffset, setSyncOffset] = useState(0);

  // Apply sync offset to currentTime
  const adjustedTime = currentTime + syncOffset;

  // Find current line index using adjusted time
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    if (!nextLine) return adjustedTime >= line.time;
    return adjustedTime >= line.time && adjustedTime < nextLine.time;
  });

  // Auto-scroll to active line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;

      const containerHeight = container.clientHeight;
      const lineTop = activeLine.offsetTop;
      const lineHeight = activeLine.clientHeight;

      const scrollTo = lineTop - containerHeight / 2 + lineHeight / 2;

      container.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }
  }, [currentLineIndex]);

  return (
    <div
      className="h-full max-h-full overflow-hidden flex flex-col bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08]"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <AlignLeft className="w-4 h-4 text-blue-400" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            {songTitle ? (
              <>
                <h3 className="text-[14px] font-semibold text-white truncate">
                  {songTitle}
                </h3>
                {songArtist && (
                  <p className="text-[12px] text-white/50 truncate">{songArtist}</p>
                )}
              </>
            ) : (
              <h3 className="text-[15px] font-semibold text-white">
                Lời Bài Hát
              </h3>
            )}
          </div>
        </div>

        {/* Sync controls */}
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          <button
            onClick={() => setSyncOffset((prev) => prev - 0.5)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-[12px] text-white/50 hover:text-white/70 transition-colors flex items-center justify-center"
          >
            −
          </button>
          <span className="text-[11px] text-white/40 min-w-[36px] text-center">
            {syncOffset !== 0 ? `${syncOffset > 0 ? "+" : ""}${syncOffset}s` : "sync"}
          </span>
          <button
            onClick={() => setSyncOffset((prev) => prev + 0.5)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-[12px] text-white/50 hover:text-white/70 transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto no-scrollbar px-5 py-6"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
        }}
      >
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-white/10 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {lyrics.map((line, index) => {
              const isActive = index === currentLineIndex;
              const isPast = index < currentLineIndex;

              // Karaoke mode: highlight active, dim others
              // Normal mode: all lines same style
              if (isKaraokeMode) {
                const distance = Math.abs(index - currentLineIndex);
                let opacity = 0.4;
                if (isActive) opacity = 1;
                else if (distance === 1) opacity = 0.6;
                else if (distance === 2) opacity = 0.5;

                return (
                  <motion.div
                    key={index}
                    ref={isActive ? activeLineRef : null}
                    animate={{ opacity, scale: isActive ? 1.02 : 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span
                      className={`
                        block leading-relaxed transition-all duration-300
                        ${isActive
                          ? "text-[20px] font-bold text-white"
                          : "text-[15px] font-normal text-white/70"
                        }
                      `}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                );
              }

              // Normal mode - all lyrics same style, no highlighting
              return (
                <div key={index}>
                  <span className="block text-[15px] font-normal text-white/80 leading-relaxed">
                    {line.text}
                  </span>
                </div>
              );
            })}
            <div className="h-20" />
          </div>
        )}
      </div>
    </div>
  );
}
