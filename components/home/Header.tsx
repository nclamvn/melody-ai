"use client";

import { motion } from "framer-motion";
import { Wifi } from "iconoir-react";
import MelodyLogo from "@/components/icons/MelodyLogo";

interface HeaderProps {
  isDemoMode?: boolean;
}

export default function Header({ isDemoMode = true }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="liquid-glass px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <MelodyLogo size={40} />
            <span className="text-lg font-semibold text-primary">
              Melody AI
            </span>
          </div>

          {/* Status Badge */}
          {isDemoMode ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20">
              <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
              <span className="text-xs font-medium text-aurora-cyan">
                Demo Mode
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <Wifi className="w-3.5 h-3.5 text-success" />
              <span className="text-xs font-medium text-success">
                Live
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
