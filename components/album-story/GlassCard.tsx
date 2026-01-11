"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  isActive = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative w-full h-full rounded-3xl overflow-hidden
        ${className}
      `}
      style={{
        background: `linear-gradient(
          135deg,
          rgba(15, 15, 30, 0.85) 0%,
          rgba(10, 10, 25, 0.9) 50%,
          rgba(15, 15, 30, 0.85) 100%
        )`,
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.6),
          0 0 60px rgba(139, 92, 246, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Glass highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.05) 0%,
            transparent 50%,
            rgba(59, 130, 246, 0.03) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
