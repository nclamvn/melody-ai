"use client";

import { motion } from "framer-motion";
import { CompositionPageContent } from "@/types/albumStory";
import GlassCard from "../GlassCard";

interface CompositionPageProps {
  content: CompositionPageContent;
}

export default function CompositionPage({ content }: CompositionPageProps) {
  return (
    <GlassCard>
      <div className="w-full h-full flex flex-col p-6 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Câu Chuyện Sáng Tác</h2>
            <p className="text-xs text-white/50">Bối cảnh ra đời</p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          {/* Main Story */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-amber-500/50 to-orange-500/50" />
            <p className="pl-4 text-white/80 leading-relaxed">{content.story}</p>
          </motion.div>

          {/* Inspiration */}
          {content.inspiration && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Cảm hứng
              </h3>
              <p className="text-white/70 text-sm">{content.inspiration}</p>
            </motion.div>
          )}

          {/* Meta info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {content.createdAt && (
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40">Thời gian</p>
                <p className="text-sm text-white/80">{content.createdAt}</p>
              </div>
            )}
            {content.location && (
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40">Địa điểm</p>
                <p className="text-sm text-white/80">{content.location}</p>
              </div>
            )}
          </motion.div>

          {/* Fun Facts */}
          {content.funFacts && content.funFacts.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-white/60 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Bạn có biết?
              </h3>
              {content.funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent"
                >
                  <span className="text-amber-400 mt-0.5">•</span>
                  <p className="text-sm text-white/70">{fact}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
