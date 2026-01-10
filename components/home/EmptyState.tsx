"use client";

import { motion } from "framer-motion";
import { MusicNote, Shuffle } from "iconoir-react";

interface EmptyStateProps {
  onRandomSuggestion?: () => void;
}

export default function EmptyState({ onRandomSuggestion }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-aurora-blue/20 to-aurora-violet/20 flex items-center justify-center"
      >
        <MusicNote className="w-10 h-10 text-aurora-blue" strokeWidth={1.5} />
      </motion.div>

      <h3 className="text-title-2 font-semibold text-primary mb-2">
        Không tìm thấy kết quả
      </h3>
      <p className="text-body text-secondary mb-6 max-w-sm mx-auto">
        Thử mô tả chi tiết hơn về bài hát hoặc sử dụng gợi ý ngẫu nhiên
      </p>

      {onRandomSuggestion && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRandomSuggestion}
          className="btn-aurora inline-flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Gợi ý ngẫu nhiên
        </motion.button>
      )}
    </motion.div>
  );
}
