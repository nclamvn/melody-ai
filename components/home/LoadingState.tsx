"use client";

import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div className="space-y-4">
      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-glass-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-aurora-blue border-t-transparent rounded-full"
          />
          <span className="text-callout text-secondary">
            Đang tìm kiếm với AI...
          </span>
        </div>
      </motion.div>

      {/* Skeleton Cards */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="liquid-glass p-4"
        >
          <div className="flex items-center gap-4">
            {/* Cover Skeleton */}
            <div className="w-16 h-16 rounded-xl bg-glass-frost animate-pulse" />

            {/* Text Skeletons */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-glass-frost rounded animate-pulse" />
              <div className="h-3 w-24 bg-glass-frost rounded animate-pulse" />
              <div className="h-3 w-48 bg-glass-frost rounded animate-pulse" />
            </div>

            {/* Badge Skeleton */}
            <div className="w-14 h-7 bg-glass-frost rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
