"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-8"
    >
      <h1 className="text-display-lg font-bold mb-4 text-balance">
        <span className="aurora-text aurora-text-glow">
          Tìm bài hát từ
        </span>
        <br />
        <span className="text-primary">
          trí nhớ của bạn
        </span>
      </h1>

      <p className="text-body-lg text-secondary max-w-md mx-auto">
        Nhập tên bài hát, đoạn lời bạn nhớ, hoặc mô tả nội dung —
        AI sẽ tìm giúp bạn
      </p>
    </motion.div>
  );
}
