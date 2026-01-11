"use client";

import { motion } from "framer-motion";
import { StoriesPageContent } from "@/types/albumStory";
import GlassCard from "../GlassCard";

interface StoriesPageProps {
  content: StoriesPageContent;
}

export default function StoriesPage({ content }: StoriesPageProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "anecdote":
        return {
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          ),
          label: "Giai thoại",
          gradient: "from-blue-500/20 to-indigo-500/20",
          borderColor: "border-blue-500/30",
          textColor: "text-blue-400",
        };
      case "cultural":
        return {
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: "Văn hóa",
          gradient: "from-purple-500/20 to-pink-500/20",
          borderColor: "border-purple-500/30",
          textColor: "text-purple-400",
        };
      case "meme":
        return {
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: "Meme",
          gradient: "from-yellow-500/20 to-orange-500/20",
          borderColor: "border-yellow-500/30",
          textColor: "text-yellow-400",
        };
      case "trivia":
        return {
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          label: "Trivia",
          gradient: "from-green-500/20 to-teal-500/20",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
        };
      default:
        return {
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: "Info",
          gradient: "from-gray-500/20 to-slate-500/20",
          borderColor: "border-gray-500/30",
          textColor: "text-gray-400",
        };
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/30 to-pink-500/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Câu Chuyện Xung Quanh</h2>
            <p className="text-xs text-white/50">Những điều thú vị về bài hát</p>
          </div>
        </motion.div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {content.stories.map((story, index) => {
            const config = getTypeConfig(story.type);

            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                className={`p-4 rounded-xl bg-gradient-to-r ${config.gradient} border ${config.borderColor}`}
              >
                {/* Story Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={config.textColor}>{config.icon}</span>
                  <span className={`text-xs font-medium ${config.textColor}`}>
                    {config.label}
                  </span>
                </div>

                {/* Story Title */}
                <h3 className="font-semibold text-white mb-2">{story.title}</h3>

                {/* Story Content */}
                <p className="text-sm text-white/70 leading-relaxed">
                  {story.content}
                </p>

                {/* Source */}
                {story.source && (
                  <p className="mt-3 text-xs text-white/40 italic">
                    Nguồn: {story.source}
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
