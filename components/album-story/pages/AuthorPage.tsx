"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AuthorPageContent } from "@/types/albumStory";
import GlassCard from "../GlassCard";

interface AuthorPageProps {
  content: AuthorPageContent;
}

export default function AuthorPage({ content }: AuthorPageProps) {
  return (
    <GlassCard>
      <div className="w-full h-full flex flex-col p-6 overflow-hidden">
        {/* Header with Author Info */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          {/* Author Image */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
            {content.image ? (
              <Image
                src={content.image}
                alt={content.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">{content.name}</h2>
            <div className="flex items-center gap-2 text-sm text-white/50">
              {content.birthYear && <span>{content.birthYear}</span>}
              {content.nationality && (
                <>
                  <span>•</span>
                  <span>{content.nationality}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-5">
          {/* Bio */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-white/70 text-sm leading-relaxed">{content.bio}</p>
          </motion.div>

          {/* Genres */}
          {content.genres && content.genres.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {content.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/70 border border-white/10"
                >
                  {genre}
                </span>
              ))}
            </motion.div>
          )}

          {/* Famous Songs */}
          {content.famousSongs && content.famousSongs.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-sm font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Các ca khúc nổi tiếng
              </h3>
              <div className="space-y-2">
                {content.famousSongs.map((song, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="text-indigo-400">♪</span>
                    <span>{song}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Awards */}
          {content.awards && content.awards.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20"
            >
              <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Giải thưởng
              </h3>
              <div className="space-y-2">
                {content.awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="text-yellow-400">🏆</span>
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Timeline */}
          {content.timeline && content.timeline.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-semibold text-white/60 mb-3">Hành trình</h3>
              <div className="relative pl-4 border-l border-white/20 space-y-4">
                {content.timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-indigo-500" />
                    <p className="text-xs text-indigo-400 mb-1">{event.year}</p>
                    <p className="text-sm text-white/70">{event.event}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
