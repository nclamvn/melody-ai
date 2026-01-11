"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CoverPageContent } from "@/types/albumStory";
import GlassCard from "../GlassCard";

interface CoverPageProps {
  content: CoverPageContent;
}

export default function CoverPage({ content }: CoverPageProps) {
  return (
    <GlassCard className="p-0">
      <div className="relative w-full h-full flex flex-col">
        {/* Album Art Background - More transparent for cosmic effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <Image
            src={content.albumArt}
            alt={content.title}
            fill
            className="object-cover blur-3xl scale-125 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
          {/* Album Cover */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255,255,255,0.1)",
            }}
          >
            <Image
              src={content.albumArt}
              alt={content.title}
              fill
              className="object-cover"
            />
            {/* Vinyl record effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
          </motion.div>

          {/* Song Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {content.title}
            </h1>
            <p className="text-lg text-white/70 mb-4">{content.artist}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/50">
              {content.album && (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  {content.album}
                </span>
              )}
              {content.year && (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  {content.year}
                </span>
              )}
              {content.genre && (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  {content.genre}
                </span>
              )}
              {content.duration && (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  {content.duration}
                </span>
              )}
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs"
          >
            Vuốt để khám phá thêm →
          </motion.div>
        </div>
      </div>
    </GlassCard>
  );
}
