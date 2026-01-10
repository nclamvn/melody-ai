"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LyricLine } from "@/types";

interface LyricsDisplayProps {
  lyrics: LyricLine[];
  currentTime: number;
  isKaraokeMode?: boolean;
  isFullWidth?: boolean;
}

export default function LyricsDisplay({
  lyrics,
  currentTime,
  isKaraokeMode = false,
  isFullWidth = true,
}: LyricsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Find current line index
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    if (!nextLine) return currentTime >= line.time;
    return currentTime >= line.time && currentTime < nextLine.time;
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

  // Karaoke Mode - Full screen, large text, centered
  if (isKaraokeMode) {
    return (
      <div
        ref={containerRef}
        className="h-full overflow-y-auto no-scrollbar px-4 py-32"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          {lyrics.map((line, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;
            const distance = Math.abs(index - currentLineIndex);

            let opacity = 0.25;
            if (isActive) opacity = 1;
            else if (distance === 1) opacity = 0.5;
            else if (distance === 2) opacity = 0.35;

            return (
              <motion.div
                key={index}
                ref={isActive ? activeLineRef : null}
                animate={{
                  opacity,
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="transition-all duration-300"
              >
                {isActive ? (
                  <span
                    className="text-[32px] sm:text-[40px] font-semibold aurora-text inline-block"
                    style={{
                      textShadow: "0 0 60px rgba(91, 159, 255, 0.8), 0 0 120px rgba(157, 122, 255, 0.6)",
                    }}
                  >
                    {line.text}
                  </span>
                ) : (
                  <span className={`text-[24px] sm:text-[28px] font-normal ${isPast ? "text-white/30" : "text-white/50"}`}>
                    {line.text}
                  </span>
                )}
              </motion.div>
            );
          })}
          <div className="h-40" />
        </div>
      </div>
    );
  }

  // Normal Mode - Apple Music style lyrics
  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto no-scrollbar relative"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 60%, transparent 100%)",
      }}
    >
      <div className="pt-8 pb-64 px-8">
        <div className={`space-y-5 ${isFullWidth ? "max-w-2xl mx-auto" : "max-w-lg"}`}>
          {lyrics.map((line, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;
            const distance = Math.abs(index - currentLineIndex);

            // Apple-style opacity: active is bright, nearby lines visible, far lines faded
            let opacity = 0.25;
            if (isActive) opacity = 1;
            else if (distance === 1) opacity = 0.45;
            else if (distance === 2) opacity = 0.35;

            return (
              <motion.div
                key={index}
                ref={isActive ? activeLineRef : null}
                animate={{
                  opacity,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-left"
              >
                <span
                  className={`
                    block leading-[1.6]
                    ${isActive
                      ? "text-[22px] font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      : isPast
                        ? "text-[19px] font-medium text-white/35"
                        : "text-[19px] font-medium text-white/50"
                    }
                  `}
                >
                  {line.text}
                </span>
              </motion.div>
            );
          })}
          <div className="h-60" />
        </div>
      </div>
    </div>
  );
}
